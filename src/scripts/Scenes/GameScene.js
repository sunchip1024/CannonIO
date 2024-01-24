import PlayerController from "../Controllers/PlayerController.js";
import Player from "../Objects/Player.js";
import * as THREE from "three";

export default function GameStart() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,                                     // 시야각 (수평면에서부터의 높이각)
        window.innerWidth / window.innerHeight, // 종횡비 (가로 / 세로 비)
        0.1,                                    // near
        1000                                    // far
    );

    // camera의 position (Unity의 Transform과 유사, but readonly 속성)
    camera.position.x = 0;
    camera.position.y = 1;
    camera.position.z = 5;
    // 오브젝트를 Scene에 넣기 위해서는 Add 필요
    scene.add(camera);

    const canvas = document.querySelector("#game-div");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const PIXEL_RATIO = window.devicePixelRatio > 1 ? 2 : 1;
    renderer.setPixelRatio(PIXEL_RATIO);

    window.addEventListener('resize', function() {
        // 카메라 종횡비 속성 변경
        camera.aspect = window.innerWidth / window.innerHeight;
        // 카메라 설정 업데이트
        camera.updateProjectionMatrix();
        // 렌더러 설정 변경
        renderer.setSize(window.innerWidth, window.innerHeight);
        // 리렌더링 진행
        renderer.render(scene, camera);
    });

    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshBasicMaterial({color: "green"})
    const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
    const player = new Player(playerMesh, true);
    const playerController = new PlayerController(player);

    scene.add(playerMesh);

    function draw() {
        playerController.HandleInput();
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(draw);
}