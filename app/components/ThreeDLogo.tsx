"use client";

// ThreeDLogo component
import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Extrude, Center } from '@react-three/drei';
import * as THREE from 'three';
import { SVGLoader } from 'three-stdlib';

const SVG_XML = `
<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1200 896">
  <path d="M475,202.05v250.73c0,63.47,65.91,101.82,124.06,95.1,18.38-2.13,23.73-12.68,46.18-4.7,15.84,5.64,48.69,35.89,58.14,50.08,17.45,26.19-14.19,44.42-33.78,55.64-103.07,59.05-233.33,20.06-300.36-73.59-91.59-127.95-38.85-314.08,105.77-373.27Z"/>
  <path d="M552.73,337.7v-152.42c82.03-4.54,160.23,35.12,207.01,101.64,50.66,72.05,58.84,161.06,24.94,242.34-6.99,16.76-15.73,38.06-38.12,31.47-14.64-4.31-57.06-45.93-63.02-60.43-8.78-21.35,0-27.99,1.77-47.55,6.69-73.72-60.58-132.34-132.58-115.05Z"/>
  <path d="M866.18,627.84c42.18,42.19-16.29,110.34-63.5,71.88-50.31-40.98,16.65-118.73,63.5-71.88Z"/>
</svg>
`;

// Halftone dithering shader with improved lighting
const halftoneShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform vec3 lightPosition1;
    uniform vec3 lightPosition2;
    uniform vec3 ambientColor;
    uniform float ambientIntensity;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    
    void main() {
      // Multiple light sources
      vec3 lightDir1 = normalize(lightPosition1 - vWorldPosition);
      vec3 lightDir2 = normalize(lightPosition2 - vWorldPosition);
      
      // Diffuse lighting from both lights
      float diff1 = max(dot(vNormal, lightDir1), 0.0);
      float diff2 = max(dot(vNormal, lightDir2), 0.0);
      
      // Specular highlights (Blinn-Phong)
      vec3 viewDir = normalize(vViewPosition);
      vec3 halfDir1 = normalize(lightDir1 + viewDir);
      vec3 halfDir2 = normalize(lightDir2 + viewDir);
      
      float specPower = 48.0; // Increased shininess for more pronounced highlights
      float spec1 = pow(max(dot(vNormal, halfDir1), 0.0), specPower) * 0.8; // Increased intensity
      float spec2 = pow(max(dot(vNormal, halfDir2), 0.0), specPower) * 0.5;
      float specular = spec1 + spec2;
      
      // Rim lighting for depth
      float rim = 1.0 - max(dot(vNormal, viewDir), 0.0);
      rim = pow(rim, 3.0) * 0.3;
      
      // Combine lighting
      float intensity = ambientIntensity + (diff1 * 0.5) + (diff2 * 0.3) + rim + specular;
      intensity = clamp(intensity, 0.0, 1.0);
      
      // Halftone pattern based on screen position
      vec2 screenPos = gl_FragCoord.xy;
      float scale = 4.0; // Size of halftone dots
      
      // Add rotation-based offset to make pattern stick to surface
      vec2 surfaceUV = vWorldPosition.xy * 0.5;
      vec2 patternPos = screenPos + surfaceUV * 2.0;
      
      vec2 nearest = floor(patternPos / scale) * scale;
      vec2 delta = patternPos - nearest - scale * 0.5;
      float dist = length(delta);
      
      // Threshold based on intensity with smoother transition
      float radius = scale * 0.5 * intensity;
      float halftone = smoothstep(radius + 1.0, radius - 1.0, dist);
      
      if (halftone < 0.5) discard;
      
      // Apply color with intensity and add specular highlights
      vec3 finalColor = mix(color * intensity, color, ambientIntensity * 0.3);
      // Boost specular areas to white for shiny effect - increased blend
      finalColor = mix(finalColor, vec3(1.0), specular * 0.8);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

function LogoModel() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shapes = useMemo(() => {
    const loader = new SVGLoader();
    const svgData = loader.parse(SVG_XML);
    return svgData.paths.flatMap(path => path.toShapes(true));
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Continuous Y-axis rotation
      groupRef.current.rotation.y += delta * 0.3;
      
      // Subtle X-axis wobble (max 8 degrees)
      groupRef.current.rotation.x = Math.PI + 0.087 + Math.sin(state.clock.elapsedTime * 0.2) * (Math.PI / 180) * 8;
      
      // Subtle Z-axis tilt (max 5 degrees)
      groupRef.current.rotation.z = 0.087 + Math.cos(state.clock.elapsedTime * 0.15) * (Math.PI / 180) * 5;
    }
    if (materialRef.current) {
      // Animate lights slightly for dynamic feel
      const time = state.clock.elapsedTime;
      materialRef.current.uniforms.lightPosition1.value.set(
        Math.cos(time * 0.2) * 400, // Slower light animation
        300 + Math.sin(time * 0.15) * 100,
        300
      );
      materialRef.current.uniforms.lightPosition2.value.set(
        -300,
        -200,
        300 + Math.sin(time * 0.25) * 100
      );
    }
  });

  const extrudeSettings = {
    depth: 60,
    bevelEnabled: true,
    bevelThickness: 4,
    bevelSize: 4,
    bevelSegments: 8,
    curveSegments: 32 // Smoother curves
  };

  const uniforms = useMemo(() => ({
    color: { value: new THREE.Color("#ef4444") },
    lightPosition1: { value: new THREE.Vector3(400, 300, 300) },
    lightPosition2: { value: new THREE.Vector3(-300, -200, 300) },
    ambientColor: { value: new THREE.Color("#ff7533") },
    ambientIntensity: { value: 0.4 }
  }), []);

  return (
    <group ref={groupRef} rotation={[Math.PI + 0.087, 0, 0.087]} scale={0.1} position={[0, 7, 0]}>
      <Center>
        {shapes.map((shape, i) => (
          <Extrude key={i} args={[shape, extrudeSettings]}>
            <shaderMaterial
              ref={materialRef}
              vertexShader={halftoneShader.vertexShader}
              fragmentShader={halftoneShader.fragmentShader}
              uniforms={uniforms}
              side={THREE.DoubleSide}
              depthWrite={true}
              depthTest={true}
            />
          </Extrude>
        ))}
      </Center>
    </group>
  );
}

export default function ThreeDLogo() {
  return (
    <Canvas 
      shadows 
      camera={{ position: [0, -20, 120], fov: 45, near: 0.1, far: 2000 }} 
      dpr={[1, 1]} 
      gl={{ antialias: false, alpha: true }}
      frameloop="always"
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={0.1} />
      <LogoModel />
    </Canvas>
  );
}
