import React, { useEffect } from 'react';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
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
        camera.position.z = 7;
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

        // 입구 벽 Geometry
        const EntranceWallGeometry = new THREE.BoxGeometry(10, wallHeight, 0.5);
        // 입구 벽 Material
        const EntranceMaterial = new THREE.MeshStandardMaterial({
            map : wallBaseColorTex,
            normalMap: wallNormalTex,
            roughnessMap: wallRoughnessTex,
            roughness: 0.3
        });

        //==전시회 글귀==//
        
        // 줄바꿈 함수
        function wrapText(text, maxLength) {
            let lines = [];
            let currentLine = '';
            let currentLength = 0;
        
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                currentLine += char;
                currentLength++;

                if(text[i]==='\n') {
                    lines.push(currentLine.trim());
                    currentLine = '';
                    currentLength = 0;
                }

                else if (currentLength >= maxLength && text.length - i > 3) {
                    if(text[i+1]==='.' || text[i+1]==='!' || text[i+1]==='?' || text[i+1]===',')
                        continue;
                    lines.push(currentLine.trim());
                    currentLine = '';
                    currentLength = 0;
                }
            }
        
            if (currentLine.length > 0) {
                lines.push(currentLine.trim());
            }
        
            return lines.join('\n');
        }

        // 폰트 로더
        const fontLoader = new FontLoader();
        // 한 줄 제한 길이
        const exhibitTitleMaxLength = 9;
        const exhibitDetailMaxLength = 22;

        const authorNameMaxLength = 9;
        const authorDetailMaxLength = 22;
        // 내용
        const exhibitTitle = '단군의 도자기 전시회';
        const exhibitDetail = '기원전 800년 전, 고조선의 단군이 만들어낸 101가지의 도자기 전시회 입니다! 이 도자기는 영국에서 시작되었으며, 약 3000년의 역사적 가치를 가지고 있는 유물로서 아주 큰 가치를 가지고 있습니다.';
        const authorName = '모네';
        const authorDetail = '작가 이력: \n- 엄청난 출신 \n- 엄청난 스펙 \n - 엄청난 작품들';
        
        // 줄바꿈 적용
        const exhibitTitleWrap = wrapText(exhibitTitle, exhibitTitleMaxLength);
        const exhibitDetailWrap = wrapText(exhibitDetail, exhibitDetailMaxLength);
        const authorNameWrap = wrapText(authorName, authorNameMaxLength);
        const authorDetailWrap = wrapText(authorDetail, authorDetailMaxLength);
        // 텍스트 그룹
        const exhibitTextGroup = new THREE.Group();
        const exhibitBackTextGroup = new THREE.Group();
        const authorTextGroup = new THREE.Group();
        const authorBackTextGroup = new THREE.Group();

        // 폰트 로드 및 메쉬 생성
        fontLoader.load('../../asset/fonts/SUIT Variable_Regular.json', function(font) {
            // 텍스트 geometry 파라미터
            const titleParam = {
                font: font,
                size: 0.2,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.01,
                bevelSegments: 5
            };
            const detailParam = {
                font: font,
                size: 0.1,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.005,
                bevelSegments: 5
            };

            // text geometry
            const exhibitTitleGeometry = new TextGeometry(exhibitTitleWrap, titleParam);
            const exhibitDetailGeometry = new TextGeometry(exhibitDetailWrap, detailParam);
            const authorNameGeometry = new TextGeometry(authorNameWrap, titleParam);
            const authorDetailGeometry = new TextGeometry(authorDetailWrap, detailParam);

            // text material
            const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

            // mesh
            const exhibitTitleMesh = new THREE.Mesh(exhibitTitleGeometry, textMaterial);
            const exhibitDetailMesh = new THREE.Mesh(exhibitDetailGeometry, textMaterial);
            const authorNameMesh = new THREE.Mesh(authorNameGeometry, textMaterial);
            const authorDetailMesh = new THREE.Mesh(authorDetailGeometry, textMaterial);

            const exhibitBackTitleMesh = new THREE.Mesh(exhibitTitleGeometry, textMaterial);
            const exhibitBackDetailMesh = new THREE.Mesh(exhibitDetailGeometry, textMaterial);
            const authorBackNameMesh = new THREE.Mesh(authorNameGeometry, textMaterial);
            const authorBackDetailMesh = new THREE.Mesh(authorDetailGeometry, textMaterial);

            // 위치 조정
            exhibitDetailMesh.position.y = -0.8;
            exhibitBackDetailMesh.position.y = -0.8;
            authorDetailMesh.position.y = -0.8;
            authorBackDetailMesh.position.y = -0.8;

            // 그룹 추가
            exhibitTextGroup.add(exhibitTitleMesh, exhibitDetailMesh);
            exhibitBackTextGroup.add(exhibitBackTitleMesh, exhibitBackDetailMesh);
            authorTextGroup.add(authorNameMesh, authorDetailMesh);
            authorBackTextGroup.add(authorBackNameMesh, authorBackDetailMesh);
        });
        // 그룹 위치
        exhibitTextGroup.position.x = -10;
        exhibitTextGroup.position.y = wallHeight/2 + 1.5;
        exhibitTextGroup.position.z = -1 + 0.15;

        exhibitBackTextGroup.rotation.y = Math.PI;
        exhibitBackTextGroup.position.x = -7.5;
        exhibitBackTextGroup.position.y = wallHeight/2 + 1.5;
        exhibitBackTextGroup.position.z = -1 -0.15;

        authorTextGroup.position.x = 7.5;
        authorTextGroup.position.y = wallHeight/2 + 1.5;
        authorTextGroup.position.z = -1 + 0.15;

        authorBackTextGroup.rotation.y = Math.PI;
        authorBackTextGroup.position.x = 10;
        authorBackTextGroup.position.y = wallHeight/2 + 1.5;
        authorBackTextGroup.position.z = -1 -0.15;

        // 씬 추가
        scene.add(exhibitTextGroup, exhibitBackTextGroup, authorTextGroup, authorBackTextGroup);

        // 왼쪽 입구
        const leftEntrance = new THREE.Mesh(EntranceWallGeometry, EntranceMaterial);
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
        const rightEntrance = new THREE.Mesh(EntranceWallGeometry, EntranceMaterial);
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
        const workTextures = [];
        const workTitles = [];
        const workTitleWraps = [];

        // 한 줄 제한 길이
        const workMaxLength = 7;

        // 작품 입력
        const workNum = 20; // 작품 수
        for(let i=0;i<workNum;i++){
            workTextures[i]=textureLoader.load(`../../asset/work${i}.jpg`)
            workTitles[i]=`작품${i}`;
            workTitleWraps[i] = wrapText(workTitles[i], workMaxLength);
        }
        const workGroups = []; // 작품 그룹
        for(let i=0;i<workNum;i++){
            workGroups[i] = new THREE.Group();
        }

        // 중앙 앞 작품 생성
        const centerFrontNum = 1;
        const centerFrontWorksNum = centerFrontNum*wallPerWorkNum<=workNum?4
            :(centerFrontNum*wallPerWorkNum-workNum>4?0:workNum%4);
        
        const frontCenterWorks = []; // 작품

        // 폰트 로드 및 메쉬 생성
        fontLoader.load('../../asset/fonts/SUIT Variable_Regular.json', function(font) {
            // 텍스트 geometry 파라미터
            const titleParam = {
                font: font,
                size: 0.1,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.005,
                bevelSegments: 5
            };

            // text material
            const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

            // text geometry & Mesh
            const workTitleGeometry = [];
            const workTitleMesh = [];

            for(let i=0;i<centerFrontWorksNum;i++){
                const workIdx = (centerFrontNum-1)*wallPerWorkNum + i;
                workTitleGeometry[i] = new TextGeometry(workTitleWraps[workIdx], titleParam);
                workTitleMesh[i] = new THREE.Mesh(workTitleGeometry[i], textMaterial);
                workTitleMesh[i].position.x = -1;
                workTitleMesh[i].position.y = -1.25;
                workTitleMesh[i].position.z = 0.15;
                workGroups[workIdx].add(workTitleMesh[i]);
            }
        });

        // 작품 배치
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
            frontCenterWorks[i].position.z = 0.25;
            workGroups[workIdx].add(frontCenterWorks[i]);
            workGroups[workIdx].position.x = i * workGap - workGap * (centerFrontWorksNum -1) / 2;
            workGroups[workIdx].position.y = 0.5
            centerGroup.add(workGroups[workIdx]);
        }

        // 중앙 뒤 작품 생성
        const centerBackNum = 5;
        const centerBackWorksNum = centerBackNum*wallPerWorkNum<=workNum?4
            :(centerBackNum*wallPerWorkNum-workNum>4?0:workNum%4);

        const backCenterWorks = []; // 작품
        
        // 폰트 로드 및 메쉬 생성
        fontLoader.load('../../asset/fonts/SUIT Variable_Regular.json', function(font) {
            // 텍스트 geometry 파라미터
            const titleParam = {
                font: font,
                size: 0.1,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.005,
                bevelSegments: 5
            };

            // text material
            const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

            // text geometry & Mesh
            const workTitleGeometry = [];
            const workTitleMesh = [];

            for(let i=0;i<centerBackWorksNum;i++){
                const workIdx = (centerBackNum-1)*wallPerWorkNum + i;
                workTitleGeometry[i] = new TextGeometry(workTitleWraps[workIdx], titleParam);
                workTitleMesh[i] = new THREE.Mesh(workTitleGeometry[i], textMaterial);
                workTitleMesh[i].rotation.y = Math.PI;
                workTitleMesh[i].position.x = 1;
                workTitleMesh[i].position.y = -1.25;
                workTitleMesh[i].position.z = -0.15;
                workGroups[workIdx].add(workTitleMesh[i]);
            }
        });

        // 작품 배치
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
            backCenterWorks[i].position.z = -0.25;
            workGroups[workIdx].add(backCenterWorks[i]);
            workGroups[workIdx].position.x = i * workGap - workGap * (centerBackWorksNum -1) / 2;
            workGroups[workIdx].position.y = 0.5
            centerGroup.add(workGroups[workIdx]);
        }

        // 중앙 전시 위치
        const centerPos = [0, wallHeight/2, -12] // x, y, z;
        centerGroup.add(centerWall);
        centerGroup.position.y = centerPos[1]; // 바닥 위에 전시 위치
        centerGroup.position.z = centerPos[2];
        scene.add(centerGroup);

        // 뒤편 전시
        const backGroup = new THREE.Group();

        // 뒤편 전시 Geometry
        const ExhibitBackWallGeometry = new THREE.BoxGeometry(26, wallHeight, 0.5);
        const backWorkGap = 5; // 작품 간격

        // 뒤편 벽
        const backWall = new THREE.Mesh(ExhibitBackWallGeometry, ExhibitWallMaterial);

        // 뒤편 작품 생성
        const backNum = 2;
        const backWorksNum = backNum*wallPerWorkNum<=workNum?4
            :(backNum*wallPerWorkNum-workNum>4?0:workNum%4);

        const backWorks = []; // 작품

        // 폰트 로드 및 메쉬 생성
        fontLoader.load('../../asset/fonts/SUIT Variable_Regular.json', function(font) {
            // 텍스트 geometry 파라미터
            const titleParam = {
                font: font,
                size: 0.1,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.005,
                bevelSegments: 5
            };

            // text material
            const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

            // text geometry & Mesh
            const workTitleGeometry = [];
            const workTitleMesh = [];

            for(let i=0;i<backWorksNum;i++){
                const workIdx = (backNum-1)*wallPerWorkNum + i;
                workTitleGeometry[i] = new TextGeometry(workTitleWraps[workIdx], titleParam);
                workTitleMesh[i] = new THREE.Mesh(workTitleGeometry[i], textMaterial);
                workTitleMesh[i].position.x = -1;
                workTitleMesh[i].position.y = -1.25;
                workTitleMesh[i].position.z = 0.15;
                workGroups[workIdx].add(workTitleMesh[i]);
            }
        });

        // 작품 배치
        for(let i=0;i<backWorksNum;i++){
            const workIdx = (backNum-1)*wallPerWorkNum + i;
            const workMaterials = [];
            for (let j = 0; j < 6; j++) {
                if (j === 4)
                    workMaterials.push(new THREE.MeshStandardMaterial({map: workTextures[workIdx]}));
                else
                    workMaterials.push(new THREE.MeshStandardMaterial({color: 'white'}));
            }
            backWorks[i] = new THREE.Mesh(workGeometry, workMaterials);
            backWorks[i].position.z = 0.25;
            workGroups[workIdx].add(backWorks[i]);
            workGroups[workIdx].position.x = i * backWorkGap - backWorkGap * (backWorksNum -1) / 2;
            workGroups[workIdx].position.y = 0.5
            backGroup.add(workGroups[workIdx]);
        }

        // 뒤편 전시 위치
        const backPos = [0, wallHeight/2, -23] // x, y, z;
        backGroup.add(backWall);
        backGroup.position.x = backPos[0];
        backGroup.position.y = backPos[1]; // 바닥 위에 전시 위치
        backGroup.position.z = backPos[2];
        scene.add(backGroup);

        // 양옆 전시 Geometry
        const ExhibitSideWallGeometry = new THREE.BoxGeometry(22.5, wallHeight, 0.5);
        const sideWorkGap = 5; // 작품 간격

        // 오른쪽 전시
        const rightGroup = new THREE.Group();

        // 오른쪽 벽
        const rightWall = new THREE.Mesh(ExhibitSideWallGeometry, ExhibitWallMaterial);

        // 오른쪽 앞 작품 생성
        const rightNum = 3;
        const rightWorksNum = rightNum*wallPerWorkNum<=workNum?4
            :(rightNum*wallPerWorkNum-workNum>4?0:workNum%4);

        const rightWorks = []; // 작품

        // 폰트 로드 및 메쉬 생성
        fontLoader.load('../../asset/fonts/SUIT Variable_Regular.json', function(font) {
            // 텍스트 geometry 파라미터
            const titleParam = {
                font: font,
                size: 0.1,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.005,
                bevelSegments: 5
            };

            // text material
            const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

            // text geometry & Mesh
            const workTitleGeometry = [];
            const workTitleMesh = [];

            for(let i=0;i<rightWorksNum;i++){
                const workIdx = (rightNum-1)*wallPerWorkNum + i;
                workTitleGeometry[i] = new TextGeometry(workTitleWraps[workIdx], titleParam);
                workTitleMesh[i] = new THREE.Mesh(workTitleGeometry[i], textMaterial);
                workTitleMesh[i].position.x = -1;
                workTitleMesh[i].position.y = -1.25;
                workTitleMesh[i].position.z = 0.15;
                workGroups[workIdx].add(workTitleMesh[i]);
            }
        });

        // 작품 배치
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
            rightWorks[i].position.z = 0.25;
            workGroups[workIdx].add(rightWorks[i]);
            workGroups[workIdx].position.x = i * sideWorkGap - sideWorkGap * (rightWorksNum -1) / 2;
            workGroups[workIdx].position.y = 0.5
            rightGroup.add(workGroups[workIdx]);
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
        const leftWorksNum = leftNum*wallPerWorkNum<=workNum?4
            :(leftNum*wallPerWorkNum-workNum>4?0:workNum%4);

        const leftWorks = []; // 작품

        // 폰트 로드 및 메쉬 생성
        fontLoader.load('../../asset/fonts/SUIT Variable_Regular.json', function(font) {
            // 텍스트 geometry 파라미터
            const titleParam = {
                font: font,
                size: 0.1,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.005,
                bevelSegments: 5
            };

            // text material
            const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

            // text geometry & Mesh
            const workTitleGeometry = [];
            const workTitleMesh = [];

            for(let i=0;i<leftWorksNum;i++){
                const workIdx = (leftNum-1)*wallPerWorkNum + i;
                workTitleGeometry[i] = new TextGeometry(workTitleWraps[workIdx], titleParam);
                workTitleMesh[i] = new THREE.Mesh(workTitleGeometry[i], textMaterial);
                workTitleMesh[i].position.x = -1;
                workTitleMesh[i].position.y = -1.25;
                workTitleMesh[i].position.z = 0.15;
                workGroups[workIdx].add(workTitleMesh[i]);
            }
        });

        // 작품 배치
        for(let i=0;i<leftWorksNum;i++){
            const workIdx = (leftNum-1)*wallPerWorkNum + i;
            const workMaterials = [];
            for (let j = 0; j < 6; j++) {
                if (j === 4)
                    workMaterials.push(new THREE.MeshStandardMaterial({map: workTextures[workIdx]}));
                else
                    workMaterials.push(new THREE.MeshStandardMaterial({color: 'white'}));
            }
            leftWorks[i] = new THREE.Mesh(workGeometry, workMaterials);
            leftWorks[i].position.z = 0.25;
            workGroups[workIdx].add(leftWorks[i]);
            workGroups[workIdx].position.x = i * sideWorkGap - sideWorkGap * (rightWorksNum -1) / 2;
            workGroups[workIdx].position.y = 0.5
            leftGroup.add(workGroups[workIdx]);
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
