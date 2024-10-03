import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from "three"

const Component12 = () => {
    let timg = useTexture('../public/vite.svg')
    let cyl = useRef(null)
    useFrame ((state, delta) => {
        cyl.current.rotation.y += delta
    })

  return (
    // rotation={[0, 2.5, 0.7]}
    <group rotation={[0, 1.2, 0.5]}>
        <mesh ref={cyl}>
            
        <cylinderGeometry args={[1, 1, 1, 60, 60, true]}/>
        <meshStandardMaterial map={timg} transparent side={THREE.DoubleSide} />
    </mesh>
    </group>
  )
}

export default Component12