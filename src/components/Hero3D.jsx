import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, Cone, Cylinder, Torus } from '@react-three/drei'
import * as THREE from 'three'

// Mountain Component
const Mountain = ({ position, scale = 1, color }) => {
  return (
    <Cone args={[1 * scale, 2 * scale, 4]} position={position} rotation={[0, Math.PI / 4, 0]}>
      <meshStandardMaterial
        color={color}
        roughness={0.8}
        metalness={0.2}
      />
    </Cone>
  )
}

// Tree Component
const Tree = ({ position }) => {
  return (
    <group position={position}>
      {/* Tree trunk */}
      <Cylinder args={[0.1, 0.15, 0.8, 8]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </Cylinder>
      {/* Tree foliage */}
      <Cone args={[0.4, 0.8, 8]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color="#228B22" roughness={0.7} />
      </Cone>
      <Cone args={[0.3, 0.6, 8]} position={[0, 1.6, 0]}>
        <meshStandardMaterial color="#32CD32" roughness={0.7} />
      </Cone>
    </group>
  )
}

// Cloud Component
const Cloud = ({ position }) => {
  return (
    <group position={position}>
      <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ffffff" opacity={0.8} transparent roughness={0.3} />
      </Sphere>
      <Sphere args={[0.35, 16, 16]} position={[0.3, 0, 0]}>
        <meshStandardMaterial color="#ffffff" opacity={0.8} transparent roughness={0.3} />
      </Sphere>
      <Sphere args={[0.25, 16, 16]} position={[-0.25, 0, 0]}>
        <meshStandardMaterial color="#ffffff" opacity={0.8} transparent roughness={0.3} />
      </Sphere>
    </group>
  )
}

// Sun Component
const Sun = ({ position }) => {
  return (
    <Sphere args={[0.6, 32, 32]} position={position}>
      <meshStandardMaterial
        color="#FDB813"
        emissive="#FDB813"
        emissiveIntensity={0.8}
        roughness={0.1}
      />
    </Sphere>
  )
}

const Hero3D = () => {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Sun */}
      <Float speed={0.5} rotationIntensity={0} floatIntensity={0.3}>
        <Sun position={[-4, 3, -3]} />
      </Float>

      {/* Mountains - Creating a scenic landscape */}
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
        <Mountain position={[-2, -1, -2]} scale={1.5} color="#4A5568" />
      </Float>
      
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.4}>
        <Mountain position={[1, -1.2, -3]} scale={1.8} color="#2D3748" />
      </Float>
      
      <Float speed={0.7} rotationIntensity={0.15} floatIntensity={0.45}>
        <Mountain position={[3.5, -1, -2.5]} scale={1.3} color="#4A5568" />
      </Float>

      {/* Snow-capped peaks */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Cone args={[0.4, 0.6, 4]} position={[-2, 1.8, -2]} rotation={[0, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
        </Cone>
      </Float>

      {/* Trees - Forest scene */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <Tree position={[-3.5, -0.5, 0]} />
      </Float>
      
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
        <Tree position={[-2.8, -0.3, 1]} />
      </Float>
      
      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Tree position={[2.5, -0.4, 0.5]} />
      </Float>

      {/* Clouds - Floating in the sky */}
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={1}>
        <Cloud position={[-3, 2, -1]} />
      </Float>
      
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.8}>
        <Cloud position={[2, 2.5, -2]} />
      </Float>
      
      <Float speed={0.7} rotationIntensity={0.1} floatIntensity={0.9}>
        <Cloud position={[0, 3, -3]} />
      </Float>

      {/* Waterfall effect - Blue cascading spheres */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <group position={[0, 1, -1]}>
          <Sphere args={[0.15, 16, 16]} position={[0, 0, 0]}>
            <meshStandardMaterial
              color="#00CED1"
              transparent
              opacity={0.7}
              emissive="#00CED1"
              emissiveIntensity={0.3}
            />
          </Sphere>
          <Sphere args={[0.12, 16, 16]} position={[0.1, -0.3, 0]}>
            <meshStandardMaterial
              color="#40E0D0"
              transparent
              opacity={0.6}
              emissive="#40E0D0"
              emissiveIntensity={0.2}
            />
          </Sphere>
          <Sphere args={[0.1, 16, 16]} position={[-0.1, -0.6, 0]}>
            <meshStandardMaterial
              color="#48D1CC"
              transparent
              opacity={0.5}
              emissive="#48D1CC"
              emissiveIntensity={0.2}
            />
          </Sphere>
        </group>
      </Float>

      {/* Travel elements - Compass/Navigation rings */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <Torus args={[0.8, 0.08, 16, 32]} position={[2, 0.5, 1]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#FF6B6B"
            roughness={0.2}
            metalness={0.8}
            emissive="#FF6B6B"
            emissiveIntensity={0.2}
          />
        </Torus>
      </Float>

      {/* Nature particles - Butterflies/Birds effect */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 4 + Math.random() * 2
        return (
          <Float
            key={i}
            speed={1.5 + Math.random() * 0.5}
            rotationIntensity={0.5}
            floatIntensity={1 + Math.random() * 0.5}
          >
            <Sphere
              args={[0.08, 12, 12]}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 2,
                Math.sin(angle) * radius
              ]}
            >
              <meshStandardMaterial
                color={
                  i % 3 === 0 ? '#FFD700' : // Golden
                  i % 3 === 1 ? '#87CEEB' : // Sky blue
                  '#98FB98' // Pale green
                }
                emissive={
                  i % 3 === 0 ? '#FFD700' :
                  i % 3 === 1 ? '#87CEEB' :
                  '#98FB98'
                }
                emissiveIntensity={0.4}
                transparent
                opacity={0.8}
              />
            </Sphere>
          </Float>
        )
      })}

      {/* Pleasant warm lighting */}
      <ambientLight intensity={0.6} color="#FFF8DC" />
      <directionalLight position={[-5, 5, 5]} intensity={1} color="#FFE4B5" />
      <pointLight position={[5, 3, 3]} intensity={0.8} color="#87CEEB" />
      <pointLight position={[-3, 2, -2]} intensity={0.5} color="#FFB6C1" />
    </group>
  )
}

export default Hero3D
