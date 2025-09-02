// FluidGradientCanvas.jsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { vertexShader, fluidShader, displayShader } from "./shaders.js";

const DEFAULT_CONFIG = {
  brushSize: 25.0,
  brushStrength: 0.5,
  distortionAmount: 2.5,
  fluidDecay: 0.98,
  trailLength: 0.8,
  stopDecay: 0.85,
  color1: "#b8fff7",
  color2: "#614d5eff",
  color3: "#010101",
  color4: "#bfd1d8ff",
  colorIntensity: 1.0,
  softness: 1.0,
};

function hexToRgbVec3(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return new THREE.Vector3(r, g, b);
}

export default function FluidGradientCanvas({
  className = "",
  style,
  config: configOverride = {},
  modelUrl = "/3d/logoOptiV3.glb", // <-- passe ici le chemin de ton GLB
  modelScale = 1, // <-- scale du modèle
  modelY = 0, // <-- position Y si besoin
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const config = { ...DEFAULT_CONFIG, ...configOverride };

    // -------- Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    // -------- Cameras
    // Ortho pour les quads plein écran (fluid + display)
    const orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    // Perspective pour la 3D
    const perspCamera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    perspCamera.position.set(0, 0, 4);

    // -------- Render targets (ping-pong fluid)
    const rtParams = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      depthBuffer: false,
      stencilBuffer: false,
    };
    let fluidTarget1 = new THREE.WebGLRenderTarget(
      mount.clientWidth,
      mount.clientHeight,
      rtParams
    );
    let fluidTarget2 = new THREE.WebGLRenderTarget(
      mount.clientWidth,
      mount.clientHeight,
      rtParams
    );
    let currentFluidTarget = fluidTarget1;
    let previousFluidTarget = fluidTarget2;

    // -------- Materials
    const fluidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(mount.clientWidth, mount.clientHeight),
        },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        iFrame: { value: 0 },
        iPreviousFrame: { value: null },
        uBrushSize: { value: config.brushSize },
        uBrushStrength: { value: config.brushStrength },
        uFluidDecay: { value: config.fluidDecay },
        uTrailLength: { value: config.trailLength },
        uStopDecay: { value: config.stopDecay },
      },
      vertexShader,
      fragmentShader: fluidShader,
    });

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(mount.clientWidth, mount.clientHeight),
        },
        iFluid: { value: null },
        uDistortionAmount: { value: config.distortionAmount },
        uColor1: { value: hexToRgbVec3(config.color1) },
        uColor2: { value: hexToRgbVec3(config.color2) },
        uColor3: { value: hexToRgbVec3(config.color3) },
        uColor4: { value: hexToRgbVec3(config.color4) },
        uColorIntensity: { value: config.colorIntensity },
        uSoftness: { value: config.softness },
      },
      vertexShader,
      fragmentShader: displayShader,
    });

    // -------- Scenes (quads plein écran)
    const quadGeo = new THREE.PlaneGeometry(2, 2);

    const fluidMesh = new THREE.Mesh(quadGeo, fluidMaterial);
    const fluidScene = new THREE.Scene();
    fluidScene.add(fluidMesh);

    const displayMesh = new THREE.Mesh(quadGeo, displayMaterial);
    const displayScene = new THREE.Scene();
    displayScene.add(displayMesh);

    // -------- Scene 3D pour le modèle
    const modelScene = new THREE.Scene();
    modelScene.background = null; // important pour overlay
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(2, 3, 4);
    modelScene.add(ambient, dir);

    let model = null;
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        model = gltf.scene;
        // Normalisation optionnelle (si les tailles varient beaucoup)
        model.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = false;
            o.receiveShadow = false;
          }
        });
        model.scale.setScalar(modelScale);
        model.position.set(0, modelY, 0);
        modelScene.add(model);
      },
      undefined,
      (err) => {
        console.error("Erreur chargement modèle:", err);
      }
    );

    // -------- Resize
    function onResize() {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);

      // update uniforms des passes
      fluidMaterial.uniforms.iResolution.value.set(w, h);
      displayMaterial.uniforms.iResolution.value.set(w, h);
      fluidTarget1.setSize(w, h);
      fluidTarget2.setSize(w, h);

      // update camera 3D
      perspCamera.aspect = w / h;
      perspCamera.updateProjectionMatrix();

      frameCount = 0;
    }
    window.addEventListener("resize", onResize);

    // -------- RAF
    let frameId = 0;
    let frameCount = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;

      // update uniforms
      fluidMaterial.uniforms.iTime.value = t;
      displayMaterial.uniforms.iTime.value = t;
      fluidMaterial.uniforms.iFrame.value = frameCount;

      // live update config
      fluidMaterial.uniforms.uBrushSize.value = config.brushSize;
      fluidMaterial.uniforms.uBrushStrength.value = config.brushStrength;
      fluidMaterial.uniforms.uFluidDecay.value = config.fluidDecay;
      fluidMaterial.uniforms.uTrailLength.value = config.trailLength;
      fluidMaterial.uniforms.uStopDecay.value = config.stopDecay;

      displayMaterial.uniforms.uDistortionAmount.value =
        config.distortionAmount;
      displayMaterial.uniforms.uColorIntensity.value = config.colorIntensity;
      displayMaterial.uniforms.uSoftness.value = config.softness;

      // Pass 1: fluid (ping-pong dans RT)
      fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
      renderer.setRenderTarget(currentFluidTarget);
      renderer.render(fluidScene, orthoCamera);

      // Pass 2: display (plein écran vers le canvas)
      renderer.setRenderTarget(null);
      renderer.clear(); // clear la frame
      renderer.render(displayScene, orthoCamera);

      // Pass 3: 3D model (overlay)
      renderer.autoClear = false; // ne pas effacer ce qui vient d'être dessiné
      if (model) {
        model.rotation.y += 0.01; // rotation douce
      }
      renderer.render(modelScene, perspCamera);
      renderer.autoClear = true;

      // swap RT
      const tmp = currentFluidTarget;
      currentFluidTarget = previousFluidTarget;
      previousFluidTarget = tmp;

      frameCount++;
    };

    animate();

    // -------- Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);

      mount.removeChild(renderer.domElement);

      quadGeo.dispose();
      fluidMaterial.dispose();
      displayMaterial.dispose();
      fluidTarget1.dispose();
      fluidTarget2.dispose();
      renderer.dispose();
    };
  }, [configOverride, modelUrl, modelScale, modelY]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
    />
  );
}
