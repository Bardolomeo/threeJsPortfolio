"use client";
import { Environment, Image, MeshReflectorMaterial, Texture } from '@react-three/drei';
import { Canvas, ThreeElements, useFrame, useLoader } from '@react-three/fiber';
import React, { useRef } from 'react'
import * as THREE from 'three';

let startingX = -10

const Hero = () => {

	function Box(props : ThreeElements['mesh'])
	{
		const ref = useRef<THREE.Mesh>(null!);
		const randomDelta = 0.01 * ((Math.random() * 1.5) + 1);
		const randomStartingX = startingX + (Math.random() * 4);
		startingX += 5;

		useFrame(() => {
				if (ref.current.position.y < 9.0)
				{
					console.log(ref.current.position.y);
					ref.current.translateY(randomDelta);
				}
				else
				{
					ref.current.position.x = randomStartingX - ((Math.random() * 2));
					ref.current.position.y = -10;
					ref.current.scale.setScalar(Math.random() + 0.5);
				}
		}, 0)
		
		return (
			<mesh {...props}
				ref={ref}
				scale={Math.random() + 0.5}
				position={[ randomStartingX, 10 - (Math.random() * 20), 0]}

			>
				<sphereGeometry />
				<MeshReflectorMaterial
    				blur={[0, 0]}
    				resolution={520}
    				mixBlur={1}
    				mixStrength={50}
    				roughness={1}
    				depthScale={1.2}
    				minDepthThreshold={0.4}
    				maxDepthThreshold={1.4}
    				metalness={0}
					mirror={0}
        		/>
				{/* <meshPhysicalMaterial color='#72B2F2'
				emissive={'#000000'}
				clearcoat={1}
				clearcoatRoughness={0}
				transparent={true}
				opacity={1}
				/> */}
			</mesh>
		)
	}

	//adding a scene
	const scene = new THREE.Scene();
	scene.background = new THREE.Color('#F0F0F0');

	//camera
	let camera;
	if (typeof window !== "undefined")
	{
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 10;
		camera.position.x = 0;
		camera.position.y = 0;
	}

	//light
	const boxRef = new Array(5);

	boxRef[0] = useRef<THREE.Mesh>(null!);
	boxRef[1] = useRef<THREE.Mesh>(null!);
	boxRef[2] = useRef<THREE.Mesh>(null!);
	boxRef[3] = useRef<THREE.Mesh>(null!);

	const light = new THREE.DirectionalLight(0x9cdba6, 10);
	light.position.set(1, 1, 1);
	const dirLight = useRef<THREE.DirectionalLight>(null);

	const colorMap = useLoader(THREE.TextureLoader, 'ShadowTheHedgehogSA2.png')

	return (
		<div className='w-[100vw] h-[100vh]'>
			<Canvas camera={camera} className='w-full h-full' >
				<directionalLight color={0xffffff} intensity={5} position={[0,0,20]}/>
				<fog attach="fog" args={['#191920', 0, 15]} />
				<color attach="background" args={['#191920']} />
				<Box ref={boxRef[0]} />
				<Box ref={boxRef[1]}/>
				<Box ref={boxRef[2]}/>
				<Box ref={boxRef[3]}/>
				<Box />
				<mesh position={[0, 0, 0]} rotation={[0,10,0,'XYZ']} scale={5.0}>
					<boxGeometry />
					<meshStandardMaterial map={colorMap}/>
				</mesh>
			</Canvas>
		</div>
  )
}

export default Hero