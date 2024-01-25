import * as THREE from "three";
import Scene from "./Scene.js";
import * as Utils from "../Utils/Utils.js";

export default class Renderer {
    #scene
    #camera
    #renderer

    constructor(canvas) {
        this.#scene = undefined;
        this.#camera = undefined;

        this.#renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        this.#renderer.setSize(window.innerWidth, window.innerHeight);

        const PIXEL_RATIO = window.devicePixelRatio > 1 ? 2 : 1;
        this.#renderer.setPixelRatio(PIXEL_RATIO);

        window.addEventListener('resize', () => {
            if(this.#camera === undefined)   return;

            // 카메라 종횡비 속성 변경
            this.#camera.aspect = window.innerWidth / window.innerHeight;
            // 카메라 설정 업데이트
            this.#camera.updateProjectionMatrix();
            // 렌더러 설정 변경
            this.#renderer.setSize(window.innerWidth, window.innerHeight);
            // 리렌더링 진행
            this.#renderer.render(this.#scene.Scene(), this.#camera);
        });
    }

    Set(scene, camera) {
        Utils.CheckType(scene, Scene);
        Utils.CheckType(camera, THREE.Camera);
        this.#scene = scene;
        this.#camera = camera;
    }

    StartRenderLoop(callback) {
        if(this.#scene === undefined || this.#camera === undefined)     
            throw new Error("[ Renderer - Render() ] Must set playing scene and camera for rendering")

        const renderer = this.#renderer;
        const scene = this.#scene.Scene;
        const camera = this.#camera;

        function draw() {
            callback();
            renderer.render(scene, camera);
            renderer.setAnimationLoop(draw);
        }

        draw();
    }
}