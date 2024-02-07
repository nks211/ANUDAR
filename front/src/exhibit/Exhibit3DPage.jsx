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
        camera.position.y = 3;
        camera.position.z = 5;
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
                controls.moveForward(0.07);
            }
            if(keyController.keys['KeyS'] || keyController.keys['ArrowDown']) {
                controls.moveForward(-0.07);
            }
            if(keyController.keys['KeyA'] || keyController.keys['ArrowLeft']) {
                controls.moveRight(-0.07);
            }
            if(keyController.keys['KeyD'] || keyController.keys['ArrowRight']) {
                controls.moveRight(0.07);
            }
        }

        // CanvasTexture
        // const texCanvas = document.createElement('canvas');
        // const texContext = texCanvas.getContext('2d');
        // texCanvas.width = 1500;
        // texCanvas.height = 500;
        // const CanvasTexture = new THREE.CanvasTexture(texCanvas);

        // Mesh
        const textureLoader = new THREE.TextureLoader(loadingManager);
        
        // 바닥 텍스쳐
        const floorBaseColorTex = textureLoader.load('../../asset/texture/floor/Marble_Carrara_002_COLOR.jpg');
        const floorNormalTex = textureLoader.load('../../asset/texture/floor/Marble_Carrara_002_NORM.jpg');
        const floorRoughnessTex = textureLoader.load('../../asset/texture/floor/Marble_Carrara_002_ROUGH.jpg');

        // 바닥
        const floorGroup = new THREE.Group();

        // 바닥 생성
        const floorLength = 10;
        const floorWidth = 10;
        const floorGeometry = new THREE.PlaneGeometry(floorWidth, floorLength, 10, 10);
        const floorMaterial = new THREE.MeshStandardMaterial({ 
            side: THREE.DoubleSide,
            map : floorBaseColorTex,
            normalMap: floorNormalTex,
            roughnessMap: floorRoughnessTex,
            roughness: 0.3
        });

        const floors = [];
        const floorNumX = 4;
        const floorNumZ = 6;
        for(let i=0;i<floorNumX*floorNumZ;i++){
            floors[i] = new THREE.Mesh(floorGeometry, floorMaterial);
            floors[i].rotation.x = Math.PI / 2; // 바닥을 수평으로 만들기
            floors[i].position.x = i%floorNumX *floorWidth;
            floors[i].position.z = Math.floor(i/floorNumX) *floorLength;
            floorGroup.add(floors[i]);
        }

        // 바닥 위치
        // 바닥 개수 및 크기에 따른 중앙 이동
        floorGroup.position.x = -floorWidth/2*(floorNumX-1);
        floorGroup.position.z = -floorLength/2*(floorNumZ-1);
        scene.add(floorGroup);

        // 벽 텍스쳐
        const wallBaseColorTex = textureLoader.load('../../asset/texture/wall/Quartz_003_basecolor.jpg');
        const wallNormalTex = textureLoader.load('../../asset/texture/wall/Quartz_003_normal.jpg');
        const wallRoughnessTex = textureLoader.load('../../asset/texture/wall/Quartz_003_roughness.jpg');

        const wallHeight = 6; // 벽 높이

        // 입구 벽 생성
        const EntranceWallGeometry = new THREE.BoxGeometry(10, wallHeight, 0.5);
        const EntranceWallMaterial = new THREE.MeshStandardMaterial({
            map : wallBaseColorTex,
            normalMap: wallNormalTex,
            roughnessMap: wallRoughnessTex,
            roughness: 0.3,
            // map: CanvasTexture
        });

        // 왼쪽 입구
        const leftEntrance = new THREE.Mesh(EntranceWallGeometry, EntranceWallMaterial);
        leftEntrance.position.x = -8;
        leftEntrance.position.y = wallHeight/2; // 바닥 위에 벽 위치
        leftEntrance.position.z = -1;
        scene.add(leftEntrance);

        // 전시회 사진
        const exhibitGeometry = new THREE.BoxGeometry(3, 3, 0.05);
        const exhibitTexture = textureLoader.load('../../asset/exhibit2.jpg');
        const exhibitMaterials = [];
        for (let i = 0; i < 6; i++) {
            if (i === 4)
                exhibitMaterials.push(new THREE.MeshStandardMaterial({map: exhibitTexture}));
            else
                exhibitMaterials.push(new THREE.MeshStandardMaterial({color: 'white'}));
        }

        const exhibitFront = new THREE.Mesh(exhibitGeometry, exhibitMaterials);
        exhibitFront.position.x = -5.5;
        exhibitFront.position.y = wallHeight/2 + 0.5;
        exhibitFront.position.z = -1 + 0.25;

        const exhibitBack = new THREE.Mesh(exhibitGeometry, exhibitMaterials);
        exhibitBack.rotation.y = Math.PI;
        exhibitBack.position.x = -5.5;
        exhibitBack.position.y = wallHeight/2 + 0.5;
        exhibitBack.position.z = -1 - 0.25;

        scene.add(exhibitFront, exhibitBack);

        // 오른쪽 입구
        const rightEntrance = new THREE.Mesh(EntranceWallGeometry, EntranceWallMaterial);
        rightEntrance.position.x = 8;
        rightEntrance.position.y = wallHeight/2; // 바닥 위에 벽 위치
        rightEntrance.position.z = -1;
        scene.add(rightEntrance);

        // 작가 사진
        const authorGeometry = new THREE.BoxGeometry(3, 3, 0.05);
        const authorTexture = textureLoader.load('../../asset/artist1.png');
        const authorMaterials = [];
        for (let i = 0; i < 6; i++) {
            if (i === 4)
                authorMaterials.push(new THREE.MeshStandardMaterial({map: authorTexture}));
            else
                authorMaterials.push(new THREE.MeshStandardMaterial({color: 'white'}));
        }

        const authorFront = new THREE.Mesh(authorGeometry, authorMaterials);
        authorFront.position.x = 5.5;
        authorFront.position.y = wallHeight/2 + 0.5;
        authorFront.position.z = -1 + 0.25;
        scene.add(authorFront);

        const authorBack = new THREE.Mesh(authorGeometry, authorMaterials);
        authorBack.rotation.y = Math.PI;
        authorBack.position.x = 5.5;
        authorBack.position.y = wallHeight/2 + 0.5;
        authorBack.position.z = -1 - 0.25;
        scene.add(authorBack);


        // 전시 벽 생성
        const ExhibitWallGeometry = new THREE.BoxGeometry(13, wallHeight, 0.5);
        const ExhibitWallMaterial = new THREE.MeshStandardMaterial({
            map : wallBaseColorTex,
            normalMap: wallNormalTex,
            roughnessMap: wallRoughnessTex,
            roughness: 0.3,
            // map: CanvasTexture
        });

        // 작품
        // 한 벽의 작품 개수
        const wallPerWorkNum = 4;
        const workGap = 3; // 작품 간격
        const workGeometry = new THREE.BoxGeometry(2, 2, 0.05);

        // 중앙 전시
        const centerGroup = new THREE.Group();

        // 중앙 벽
        const centerWall = new THREE.Mesh(ExhibitWallGeometry, ExhibitWallMaterial);

        // 작품 텍스쳐
        const workTextures = [
            textureLoader.load('../../asset/work0.jpg'),
            textureLoader.load('../../asset/work1.jpg'),
            textureLoader.load('../../asset/work2.jpg'),
            textureLoader.load('../../asset/work3.jpg'),
            textureLoader.load('../../asset/work4.jpg'),
            textureLoader.load('../../asset/work5.jpg'),
            textureLoader.load('../../asset/work6.jpg'),
            textureLoader.load('../../asset/work7.jpg'),
            textureLoader.load('../../asset/work8.jpg'),
            textureLoader.load('../../asset/work9.jpg')
        ]
        const workTexturesNum = workTextures.length;

        // 중앙 앞 작품 생성
        const centerFrontNum = 1;
        const centerFrontWorksNum = centerFrontNum*wallPerWorkNum<workTexturesNum?4:workTexturesNum%4;
        const frontCenterWorks = []; // 작품
        for(let i=0;i<centerFrontWorksNum;i++){
            const workIdx = (centerFrontNum-1)*wallPerWorkNum + i;
            const workMaterials = [];
            for (let j = 0; j < 6; j++) {
                if (j === 4)
                    workMaterials.push(new THREE.MeshStandardMaterial({map: workTextures[workIdx]}));
                else
                    workMaterials.push(new THREE.MeshStandardMaterial({color: 'white'}));
            }
            frontCenterWorks[i] = new THREE.Mesh(workGeometry, workMaterials);
            frontCenterWorks[i].position.x = i * workGap - workGap * (centerFrontWorksNum -1) / 2;
            frontCenterWorks[i].position.y = 0.5;
            frontCenterWorks[i].position.z = 0.25;
            centerGroup.add(frontCenterWorks[i]);
        }

        // 중앙 뒤 작품 생성
        const centerBackNum = 2;
        const centerBackWorksNum = centerBackNum*wallPerWorkNum<workTexturesNum?4:workTexturesNum%4;
        const backCenterWorks = []; // 작품
        for(let i=0;i<centerBackWorksNum;i++){
            const workIdx = (centerBackNum-1)*wallPerWorkNum + i;
            const workMaterials = [];
            for (let j = 0; j < 6; j++) {
                if (j === 4)
                    workMaterials.push(new THREE.MeshStandardMaterial({map: workTextures[workIdx]}));
                else
                    workMaterials.push(new THREE.MeshStandardMaterial({color: 'white'}));
            }
            backCenterWorks[i] = new THREE.Mesh(workGeometry, workMaterials);
            backCenterWorks[i].rotation.y = Math.PI;
            backCenterWorks[i].position.x = i * workGap - workGap * (centerBackWorksNum-1) / 2;
            backCenterWorks[i].position.y = 0.5;
            backCenterWorks[i].position.z = -0.25;
            centerGroup.add(backCenterWorks[i]);
        }

        // 중앙 전시 위치
        const centerPos = [0, wallHeight/2, -12] // x, y, z;
        centerGroup.add(centerWall);
        centerGroup.position.y = centerPos[1]; // 바닥 위에 전시 위치
        centerGroup.position.z = centerPos[2];
        scene.add(centerGroup);

        // 양옆 전시 Geometry
        const ExhibitSideWallGeometry = new THREE.BoxGeometry(22.5, wallHeight, 0.5);
        const sideWorkGap = 5; // 작품 간격

        // 오른쪽 전시
        const rightGroup = new THREE.Group();

        // 오른쪽 벽
        const rightWall = new THREE.Mesh(ExhibitSideWallGeometry, ExhibitWallMaterial);

        // 오른쪽 앞 작품 생성
        const rightNum = 3;
        const rightWorksNum = rightNum*wallPerWorkNum<workTexturesNum?4:workTexturesNum%4;
        const rightWorks = []; // 작품
        for(let i=0;i<rightWorksNum;i++){
            const workIdx = (rightNum-1)*wallPerWorkNum + i;
            const workMaterials = [];
            for (let j = 0; j < 6; j++) {
                if (j === 4)
                    workMaterials.push(new THREE.MeshStandardMaterial({map: workTextures[workIdx]}));
                else
                    workMaterials.push(new THREE.MeshStandardMaterial({color: 'white'}));
            }
            rightWorks[i] = new THREE.Mesh(workGeometry, workMaterials);
            rightWorks[i].position.x = i * sideWorkGap - sideWorkGap * (rightWorksNum -1) / 2;
            rightWorks[i].position.y = 0.5;
            rightWorks[i].position.z = 0.25;
            rightGroup.add(rightWorks[i]);
        }

        // 오른쪽 전시 위치
        const rightPos = [13, wallHeight/2, -12] // x, y, z;
        rightGroup.add(rightWall);
        rightGroup.rotation.y = -Math.PI/2;
        rightGroup.position.x = rightPos[0];
        rightGroup.position.y = rightPos[1]; // 바닥 위에 전시 위치
        rightGroup.position.z = rightPos[2];
        scene.add(rightGroup);

        // 왼쪽 전시
        const leftGroup = new THREE.Group();

        // 왼쪽 벽
        const leftWall = new THREE.Mesh(ExhibitSideWallGeometry, ExhibitWallMaterial);

        // 왼쪽 앞 작품 생성
        const leftNum = 4;
        const leftWorksNum = leftNum*wallPerWorkNum<workTexturesNum?4:(workTexturesNum%4);
        const leftWorks = []; // 작품
        for(let i=0;i<leftWorksNum;i++){
            const workIdx = (rightNum-1)*wallPerWorkNum + i;
            const workMaterials = [];
            for (let j = 0; j < 6; j++) {
                if (j === 4)
                    workMaterials.push(new THREE.MeshStandardMaterial({map: workTextures[workIdx]}));
                else
                    workMaterials.push(new THREE.MeshStandardMaterial({color: 'white'}));
            }
            leftWorks[i] = new THREE.Mesh(workGeometry, workMaterials);
            leftWorks[i].position.x = i * sideWorkGap - sideWorkGap * (leftWorksNum -1) / 2;
            leftWorks[i].position.y = 0.5;
            leftWorks[i].position.z = 0.25;
            leftGroup.add(leftWorks[i]);
        }

        // 왼쪽 전시 위치
        const leftPos = [-13, wallHeight/2, -12] // x, y, z;
        leftGroup.add(leftWall);
        leftGroup.rotation.y = Math.PI/2;
        leftGroup.position.x = leftPos[0];
        leftGroup.position.y = leftPos[1]; // 바닥 위에 전시 위치
        leftGroup.position.z = leftPos[2];
        scene.add(leftGroup);

        // 그리기
        const clock = new THREE.Clock();

        function draw() {
            const delta = clock.getDelta();

            // 글자 폰트 코드
            // texContext.fillStyle = 'white';
            // texContext.fillRect(0, 0, 1500, 500);
            // texContext.fillStyle = 'black';
            // texContext.font = 'bold 20px sans-serif';
            // texContext.fillText('작품A', 500, 20);

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
