import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";

import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";

export function ManySphere() {
  const [sphereRefs] = useState(() => []);
  // we use this array to initialize the background spheres
  const initialPositions = [
    [-4, 20, -15],
    [-10, 12, -7],
    [-11, -12, -26],
    [-16, -6, -13],
    [12, -2, -6],
    [13, 4, -15],
    [14, -2, -26],
    [8, 10, -23],
  ];
  // smaller spheres movement
  useFrame(() => {
    // animate each sphere in the array
    sphereRefs.forEach((el) => {
      el.position.y += 0.02;
      if (el.position.y > 19) el.position.y = -18;
      el.rotation.x += 0.06;
      el.rotation.y += 0.06;
      el.rotation.z += 0.02;
    });
  });
  return (
    <>
      {initialPositions.map((pos, i) => (
        <Icosahedron
          args={[1, 4]}
          position={[pos[0], pos[1], pos[2]]}
          key={i}
          ref={(ref) => (sphereRefs[i] = ref)}
        >
          <MeshDistortMaterial
            color={"#010101"}
            roughness={0.1}
            metalness={1}
            bumpScale={0.005}
            clearcoat={0}
            clearcoatRoughness={1}
            radius={0.3}
            distort={0.4}
          />
          {/* <MeshTransmissionMaterial 
          thickness={0.65}
          roughness={0.05}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.031}
          backside={true}
        /> */}
        </Icosahedron>
      ))}
    </>
  );
}

export default ManySphere;
