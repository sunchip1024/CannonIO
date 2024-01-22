import THREE from "three";

let instance;
export default class SceneManager {
    static {
        this.InitializeScene();
        this.IntializeCamera();
        this.InitializeRenderer();
    }

    #InitializeScene() {
        this.scene = new Three.Scene();
    }

    #InitializeCamera() {
        this.camera = new Three.PerspectiveCamera(
            75,                                     // 시야각 (수평면에서부터의 높이각)
            window.innerWidth / window.innerHeight, // 종횡비 (가로 / 세로 비)
            0.1,                                    // near
            1000                                    // far
        );

        // camera의 position (Unity의 Transform과 유사, but readonly 속성)
        camera.position.x = 1;
        camera.position.y = 2;
        camera.position.z = 5;
        // 오브젝트를 Scene에 넣기 위해서는 Add 필요
        scene.add(camera);
    }

    #InitializeRenderer() {
        const canvas = document.querySelector("#game-div");

        this.renderer = new Three.WebGLRenderer({ canvas, antialias: true, alpha: true });
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
    }
}