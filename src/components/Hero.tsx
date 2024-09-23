"use client";
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';

const Hero = () => {

	function Box(props : ThreeElements['mesh'])
	{
		const ref = useRef<THREE.Mesh>(null!);
		const randomDelta = 0.01 * ((Math.random() * 2) + 1);

			useFrame((visible, delta ) => {
				if (ref.current.position.y < 9.0)
				{
					console.log(ref.current.position.y);
					ref.current.translateY(randomDelta);
				}
				else
				{
					ref.current.position.x = props.xStarting - ((Math.random() * 2));
					ref.current.position.y = -10;
					ref.current.scale.setScalar(Math.random() + 0.5);
				}
		}, 0)
		return (
			<mesh {...props}
				ref={ref}
				scale={Math.random() + 0.5}
				position={[ props.xStarting, 10 - (Math.random() * 20), 1]}

			>
				<sphereGeometry />
				<meshPhysicalMaterial color='#72B2F2'
				emissive={'#72B2F2'}
				clearcoat={1}
				clearcoatRoughness={0}
				transparent={true}
				opacity={0.5}
				iridescence={1}
				specularColor={0.5}/>
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

	//Mesh
	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshLambertMaterial({color: '#468585', emissive: '#468585'});
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	//light
	const light = new THREE.DirectionalLight(0x9cdba6, 10);
	light.position.set(1, 1, 1);
	scene.add(light);

	return (
		<div className='w-[100vw] h-[100vh]'>
			<Canvas camera={camera} className='w-full h-full'>
			<directionalLight xStarting={0} color={'#ffffff'} position={[0 ,0, 20]} intensity={1}/>
				<Box xStarting={-10 + Math.random() * 4}/>
				<Box xStarting={-5 + Math.random() * 4}/>
				<Box xStarting={0 + Math.random() * 4}/>
				<Box xStarting={5 + Math.random() * 4}/>
				<Box xStarting={10 + Math.random() * 4}/>
			</Canvas>
		</div>
  )
}

export default Hero