import React from "react";
import { useThree } from "@react-three/fiber";
import { Text, MeshDistortMaterial } from "@react-three/drei";

export function CustomText({
  text = "",
  color = "#FFFFFF",
  position = [0, 0, 0],
  scale = 13,
  basic = false,
}) {
  const { width: w } = useThree((state) => state.viewport);

  return (
    <Text
      fontSize={1}
      font="fonts/Fujiwara A Black Italic.ttf"
      anchorX="center"
      anchorY="middle"
      lineHeight={1}
      letterSpacing={-0.06}
      position={position}
      // scale={scale}
      scale={w / scale}
    >
      {text}
      {basic ? (
        <meshBasicMaterial attach="material" color={color} />
      ) : (
        <MeshDistortMaterial distort={0.3} color={color} toneMapped={false} />
      )}
    </Text>
  );
}

export default CustomText;
