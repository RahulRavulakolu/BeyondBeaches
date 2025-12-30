import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Mountain3D = () => {
  const terrainRef = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (terrainRef.current) {
      terrainRef.current.rotation.y = time * 0.05
    }
  })

  // Create realistic mountain terrain using heightmap
  const terrainGeometry = useMemo(() => {
    const width = 100
    const height = 100
    const geometry = new THREE.PlaneGeometry(20, 20, width - 1, height - 1)
    
    const vertices = geometry.attributes.position.array
    
    // Generate realistic mountain terrain using multiple noise layers
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]
      
      // Create mountain peaks using sine waves and noise
      const distance = Math.sqrt(x * x + y * y)
      const peak1 = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 3
      const peak2 = Math.sin(x * 0.3 + 2) * Math.cos(y * 0.3) * 2.5
      const peak3 = Math.sin(x * 0.7 - 1) * Math.cos(y * 0.4) * 2
      
      // Add ridges and valleys
      const ridge = Math.abs(Math.sin(x * 0.8)) * Math.abs(Math.cos(y * 0.6)) * 1.5
      
      // Combine for realistic terrain
      let elevation = peak1 + peak2 + peak3 + ridge
      
      // Add some randomness for natural look
      elevation += (Math.random() - 0.5) * 0.3
      
      // Smooth falloff at edges
      const edgeFalloff = Math.max(0, 1 - distance / 10)
      elevation *= edgeFalloff
      
      vertices[i + 2] = elevation
    }
    
    geometry.computeVertexNormals()
    return geometry
  }, [])

  // Create texture for mountains
  const mountainTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    
    // Create gradient for mountain colors
    const gradient = ctx.createLinearGradient(0, 0, 0, 512)
    gradient.addColorStop(0, '#FFFFFF')    // Snow at top
    gradient.addColorStop(0.3, '#E8E8E8')  // Light snow
    gradient.addColorStop(0.5, '#8B7355')  // Rocky brown
    gradient.addColorStop(0.7, '#5C4033')  // Dark rock
    gradient.addColorStop(1, '#2F4F2F')    // Forest green at base
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 512, 512)
    
    // Add some texture noise
    const imageData = ctx.getImageData(0, 0, 512, 512)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 30
      imageData.data[i] += noise
      imageData.data[i + 1] += noise
      imageData.data[i + 2] += noise
    }
    ctx.putImageData(imageData, 0, 0)
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
  }, [])

  return (
    <group>
      {/* Realistic Mountain Terrain */}
      <mesh
        ref={terrainRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, 0]}
        geometry={terrainGeometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={mountainTexture}
          roughness={0.9}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ground plane */}
      <mesh position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#2F4F2F"
          roughness={0.95}
        />
      </mesh>

      {/* Enhanced Lighting for realism */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[-20, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <hemisphereLight
        skyColor="#87CEEB"
        groundColor="#2F4F2F"
        intensity={0.6}
      />
      <pointLight position={[10, 15, 10]} intensity={0.4} color="#FFE4B5" />
      <pointLight position={[-10, 10, -10]} intensity={0.3} color="#B0C4DE" />
    </group>
  )
}

export default Mountain3D
