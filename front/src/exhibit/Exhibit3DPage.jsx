import React, { useEffect } from 'react';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { KeyController } from './KeyController';

export default function Exhibit3DPage() {
    useEffect(() => {
        // 텍스처 이미지 로드
        const loadingManager = new THREE.LoadingManager();
        loadingManager.onLoad = () => {
            console.log('모든 텍스처가 성공적으로 로드되었습니다!');
            // 나머지 코드 진행하거나 렌더링을 시작할 수 있습니다.
        };
        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const cubeTexture = cubeTextureLoader
            .setPath('../../asset/texture/cubemap/')
            .load([
                // + - 순서
                'px.png', 'nx.png',
                'py.png', 'ny.png',
                'pz.png', 'nz.png'
            ]);

        loadingManager.onError = (error) => {
            console.error('텍스처 로딩 중 오류 발생:', error);
            // 필요한 대로 에러 처리를 수행하세요.
        };

        // Renderer
        const canvas = document.querySelector('#three-canvas');
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

        // Scene
        const scene = new THREE.Scene();
        scene.background = cubeTexture;

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.y = 1;
        camera.position.z = 4;
        scene.add(camera);

        // Light
        const ambientLight = new THREE.AmbientLight('white', 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight('white', 1);
        directionalLight.position.x = 1;
        directionalLight.position.z = 2;
        scene.add(directionalLight);

        // Controls
        const controls = new PointerLockControls(camera, renderer.domElement);

        controls.domElement.addEventListener('click', () => {
            if (!controls.isLocked) {
                controls.lock();
            } else {
                controls.unlock();
            }
        });
        controls.addEventListener('lock', () => {
            console.log('lock!');
        });
        controls.addEventListener('unlock', () => {
            console.log('unlock!');
        });
        // 키보드 컨트롤
        const keyController = new KeyController();

        function walk() {
            if(keyController.keys['KeyW'] || keyController.keys['ArrowUp']) {
                controls.moveForward(0.05);
            }
            if(keyController.keys['KeyS'] || keyController.keys['ArrowDown']) {
                controls.moveForward(-0.05);
            }
            if(keyController.keys['KeyA'] || keyController.keys['ArrowLeft']) {
                controls.moveRight(-0.05);
            }
            if(keyController.keys['KeyD'] || keyController.keys['ArrowRight']) {
                controls.moveRight(0.05);
            }
        }

        // Mesh
        const textureLoader = new THREE.TextureLoader(loadingManager);
        const matcapTex = textureLoader.load('../../asset/texture/matcap/green_metallic.jpg');

        // 바닥 생성
        const floorGeometry = new THREE.PlaneGeometry(20, 20, 20, 10);
        const floorMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTex, side: THREE.DoubleSide });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = Math.PI / 2; // 바닥을 수평으로 만들기
        scene.add(floor);

        // 벽 생성
        const wallGeometry = new THREE.BoxGeometry(15, 5, 0.5);
        const wallMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTex });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.y = 1; // 바닥 위에 벽 위치
        scene.add(wall);

        // 그림 생성
        const workTextures = [
            textureLoader.load('../../asset/work1.jpg'),
            textureLoader.load('../../asset/work2.jpg'),
            textureLoader.load('../../asset/work3.jpg'),
            textureLoader.load('../../asset/work4.jpg'),
            textureLoader.load('../../asset/work5.jpg')
        ]
        let i;
        let workMaterials = [];
        let works = [];
        const workGeometry = new THREE.BoxGeometry(2, 2, 0.05);
        for(i=0;i<workTextures.length;i++){
            workMaterials = [
                new THREE.MeshStandardMaterial({color: 'white'}),
                new THREE.MeshStandardMaterial({color: 'white'}),
                new THREE.MeshStandardMaterial({color: 'white'}),
                new THREE.MeshStandardMaterial({color: 'white'}),
                new THREE.MeshStandardMaterial({map: workTextures[i]}),
                new THREE.MeshStandardMaterial({color: 'white'})
            ];
            works[i] = new THREE.Mesh(workGeometry, workMaterials);
            works[i].position.x = i * 3 - 6;
            works[i].position.y = 1.75; // 벽위에 위치
            works[i].position.z = 0.25;
            scene.add(works[i]);
        }


        // 그리기
        const clock = new THREE.Clock();

        function draw() {
            const delta = clock.getDelta();

            walk();

            renderer.render(scene, camera);
            renderer.setAnimationLoop(draw);
        }

        function setSize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
        }

        draw();

        return () => {
            window.removeEventListener('resize', setSize);
            // 정리 코드 추가
        };
    }, []);

    return (
        <div>
            <canvas id="three-canvas"></canvas>
        </div>
    );
}
