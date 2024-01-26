import * as THREE from "three";
import * as CANNON from "cannon-es";

export default class World {
    static clock;
    static deltaTime;
    static worldList;
    static {
        World.clock = new THREE.Clock(true);
        World.deltaTime = World.clock.getDelta();
        World.worldList = {};
    }

    constructor(name) {
        this.name = name;
        this.isPlay = false;
        this.objectList = [];
        this.targetOption = undefined;
        World.worldList[name] = this;

        this.scene = new THREE.Scene();

        this.light = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(this.light);

        this.camera = new THREE.PerspectiveCamera({
            fov: 75,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 1000
        });
        this.scene.add(this.camera);

        const canvas = document.querySelector("#game-canvas");
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });

        this.physicsWorld = new CANNON.World({
            gravity: new CANNON.Vec3(0, -9.8, 0)
        });

        window.addEventListener('resize', this.ResizeWorld);
    }

    // Set Target
    
    SetCameraTarget({ target, distance, height }) { 
        this.targetOption = {
            target: target,
            distance: distance,
            height: height
        }; 
    }

    // Move camera to target
    FollowTarget() {
        if(this.targetOption === undefined)   return;

        const targetPosition = this.targetOption.target.Position();
        
        this.camera.position.x = targetPosition.x;
        this.camera.position.y = targetPosition.y + this.targetOption.height;
        this.camera.position.z = targetPosition.z + this.targetOption.distance;

        this.camera.lookAt(new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z));
    }

    ResizeWorld() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Add Object to world
     * @param {*} object - GameObject to be added
     */
    Add(obj) {
        if(obj.physics !== undefined)   this.physicsWorld.addBody(obj.physics);
        this.scene.add(obj.mesh); 
        this.objectList.push(obj);
    }

    /**
     * Update Routine
     */
    Update() {
        // Update deltaTime
        World.deltaTime = World.clock.getDelta();

        // Update Physics World
        const CANNON_STEP_TIME = (World.deltaTime < 0.01)? 1/120 : 1/60;
        this.physicsWorld.step(CANNON_STEP_TIME, World.deltaTime, 3);

        // Play Objects routine
        this.objectList.forEach((obj) => {
            if(obj.active === false)    return;
            obj.Update();
        });
        
        // Synchronize Object mesh - rigidbody position
        this.objectList.forEach((obj) => {
            if(obj.physics === undefined)   return;

            const pos = obj.physics.position;
            obj.mesh.position.set(pos.x, pos.y, pos.z);
        });

        // Play Camera routine
        this.FollowTarget();

        // Render
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Start World Simulator
     */
    Start() {
        const world = World.worldList[this.name];
        this.isPlay = true;

        function draw() {
            console.log(world);

            if(world.isPlay === false)  return;
            world.Update();
            world.renderer.setAnimationLoop(draw);
        }

        draw();
    }

    Stop() { this.isPlay = false; }
}