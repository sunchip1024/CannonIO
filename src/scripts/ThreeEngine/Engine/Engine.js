import * as THREE from "three";

export default class ThreeEngine {
    constructor() { throw new Error("[ ThreeEngine Class ] This class cannot make instance!"); }

    static scene = null;
    static camera = null;
    static renderer = null;

    static FixedDeltaTime = 20;    // unit : ms (milli second)

    // [[ LifeCycle Method ]]
    static #isPlay = false;
    static Play() {
        if(ThreeEngine.scene === null || ThreeEngine.camera === null || ThreeEngine.renderer === null)
            throw new Error("[ ThreeEngine - Play() ] Please Set scene / camera / renderer to play");

        ThreeEngine.renderer.Set(ThreeEngine.scene, ThreeEngine.camera);
        ThreeEngine.#isPlay = true;

        ThreeEngine.scene.Awake();
        ThreeEngine.scene.Start();

        ThreeEngine.renderer.StartRenderLoop(() => {
            ThreeEngine.scene.Update();
            ThreeEngine.scene.LateUpdate();
        });

        let fixedInterval = setInterval(() => {
            if(ThreeEngine.#isPlay === false)
                clearInterval(fixedInterval);
            else
                ThreeEngine.scene.FixedUpdate();
        }, ThreeEngine.FixedDeltaTime);
        
    }

    static Stop() {
        ThreeEngine.#isPlay = false;
    }
}