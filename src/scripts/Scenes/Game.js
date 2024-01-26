import Input from "../ThreeEngine/Utils/Input";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function execute() {
    // [[ Set Background ]]

    // Set Scene
    const scene = new THREE.Scene();

    // Set Light
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Set Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.y = 2.5;
    camera.position.z = -5;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // Set Renderer
    const canvas = document.querySelector("#game-canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    function setSize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    window.addEventListener("resize", setSize);

    // Set Rigidbody
    const cannonWorld = new CANNON.World();
    cannonWorld.gravity.set(0, -9.8, 0);

    const ironMaterial = new CANNON.Material("iron");
    const ironContactMaterial = new CANNON.ContactMaterial(
        ironMaterial, ironMaterial, { friction: 0, restitution: 0 } 
    );
    cannonWorld.addContactMaterial(ironContactMaterial);

    // [[ Add Mesh ]]

    // add floor object
    const floorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshBasicMaterial({color: "gray"})
    );
    floorMesh.position.y = -0.5;
    floorMesh.rotation.x = -Math.PI / 2;
    scene.add(floorMesh);

    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body({
        mass: 0, 
        position: new CANNON.Vec3(0, -0.5, 0),
        shape: floorShape,
        material: ironMaterial
    });
    floorBody.quaternion.setFromAxisAngle(CANNON.Vec3.UNIT_X, -Math.PI / 2);
    cannonWorld.addBody(floorBody);
    
    // add Player object
    let isCannonMode = false;
    let playerMesh = null;
    const loader = new GLTFLoader();
    loader.load(
        "./models/player.glb",
        (glb) => {
            playerMesh = glb.scene;
            scene.add(playerMesh);
        }
    );

    const boxShape = new CANNON.Box(new CANNON.Vec3(0.3, 0.5, 0.3));
    const boxBody = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 0, 0),
        shape: boxShape
    });
    cannonWorld.addBody(boxBody);

    // add Cannon objects
    const MAX_CANNON_LENGTH = 20;
    const NORMAL_CANNON_MATERIAL = new THREE.MeshBasicMaterial({color: "blue"});
    const CLOSEST_CANNON_MATERIAL = new THREE.MeshBasicMaterial({color: "red"});
    let cannonMeshes = [];
    for(let i=0; i < MAX_CANNON_LENGTH; i++) {
        const cannonMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 3),
            NORMAL_CANNON_MATERIAL
        );

        const firePos = new THREE.Object3D();
        firePos.position.copy(new THREE.Vector3(0, 0, -2));
        cannonMesh.add(firePos);

        cannonMesh.position.x = Math.random() * 70 - 35;
        cannonMesh.position.z = Math.random() * 70 - 35;

        cannonMeshes.push(cannonMesh);
        scene.add(cannonMesh);

        const cannonShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 1.5));
        const cannonBody = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(cannonMesh.position.x, 0, cannonMesh.position.z),
            shape: cannonShape
        });
        cannonWorld.addBody(cannonBody);
    }

    // create CannonBall
    const ballMeshes = [];
    const ballRigids = [];
    function CreateCannonBall(pos, direction) {
        const ballMesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.5),
            new THREE.MeshBasicMaterial({color: "orange"})
        );
        ballMesh.position.x = pos.x;
        ballMesh.position.y = pos.y;
        ballMesh.position.z = pos.z;
        scene.add(ballMesh);
        ballMeshes.push(ballMesh);

        const sphereShape = new CANNON.Sphere(0.5);
        const sphereBody = new CANNON.Body({
            mass: 10,
            position: new CANNON.Vec3(pos.x, pos.y, pos.z),
            shape: sphereShape,
            material: ironMaterial
        });
        cannonWorld.addBody(sphereBody);
        ballRigids.push(sphereBody);

        const FIRE_FORCE = 20000;
        sphereBody.applyForce(direction.unit().scale(FIRE_FORCE), sphereBody.position);
    }
    

    // [[ draw Objects ]]
    const clock = new THREE.Clock();

    let selectedCannon = null;
    let closestCannon = null;

    function setPlayerMode() {
        if(isCannonMode === false)
            isCannonMode = (selectedCannon !== null);
        else
            isCannonMode = false;
    }

    function fireCannon() {
        if(!playerMesh)     return;
        if(!selectedCannon) return;
        if(!isCannonMode)   return;

        let firePos = new THREE.Vector3();
        selectedCannon.children[0].getWorldPosition(firePos);
        console.log(selectedCannon.children[0].position === firePos);

        let startPos = selectedCannon.position;
        const direction = new CANNON.Vec3(firePos.x - startPos.x, firePos.y - startPos.y, firePos.z - startPos.z);

        CreateCannonBall(firePos, direction);
    }

    Input.AddGetKeyDownEvent("KeyZ", setPlayerMode);
    Input.AddGetKeyDownEvent("ShiftLeft", fireCannon);

    function draw() {
        const deltaTime = clock.getDelta();

        function updateWorld() {
            const CANNON_STEP_TIME = (deltaTime < 0.01)? 1/120 : 1/60;
            cannonWorld.step(CANNON_STEP_TIME, deltaTime, 3);
        }

        function updateCannonBall() {
            for(let i=0; i < ballMeshes.length; i++) {
                let rx = ballRigids[i].position.x;
                let ry = ballRigids[i].position.y;
                let rz = ballRigids[i].position.z;
                ballMeshes[i].position.copy(new THREE.Vector3(rx, ry, rz));
            }
        }

        function updatePlayer() {
            if(isCannonMode) {
                controlCannon();
            } else {
                movePlayer();
                findCloseCannon();
                selectCannon();
            }
        }

        // move player by key-Input
        function movePlayer() {
            if(!playerMesh) return;

            const MOVE_SPEED = 5;
            let moveDir = new THREE.Vector3(Input.GetHorizontal(), 0, Input.GetVertical());
            moveDir.normalize();
            if(moveDir.x === 0 && moveDir.z === 0)  return;

            let speed = new THREE.Vector3();
            speed.copy(moveDir);
            speed.multiplyScalar(MOVE_SPEED * deltaTime);
            playerMesh.position.x += speed.x;
            playerMesh.position.z += speed.z;

            playerMesh.rotation.y = Math.atan2(moveDir.x, moveDir.z);

            camera.position.x += speed.x;
            camera.position.z += speed.z;
            camera.lookAt(playerMesh.position);
            
            if(selectedCannon !== null) {
                selectedCannon.position.x += speed.x;
                selectedCannon.position.z += speed.z;
            }
        }

        // Control cannon
        function controlCannon() {
            if(!playerMesh || !selectedCannon)  return;

            const ROTATION_SPEED = 100;
            let rotDir = new THREE.Vector3(Input.GetVertical(), -Input.GetHorizontal(), 0);
            rotDir.normalize();
            rotDir.multiplyScalar(ROTATION_SPEED * deltaTime * THREE.MathUtils.DEG2RAD);

            selectedCannon.rotation.y += rotDir.y;

            let rotX = selectedCannon.rotation.x + rotDir.x;
            selectedCannon.rotation.x = Math.max(-Math.PI / 2, Math.min(0, rotX));

            console.log(selectedCannon.rotation.y);
        }

        // check closest cannonn
        function findCloseCannon() {
            if(playerMesh === null)     return;
            if(selectedCannon !== null)  return;

            const LIMIT_DISTANCE = 3;

            let resultCannon = null;
            let closestDist = (closestCannon === null)? LIMIT_DISTANCE : playerMesh.position.distanceTo(closestCannon.position);
            for(let i=0; i < MAX_CANNON_LENGTH; i++) {
                let dist = playerMesh.position.distanceTo(cannonMeshes[i].position);
                if(dist > LIMIT_DISTANCE)   continue;
                if(dist >= closestDist)     continue;
                resultCannon = cannonMeshes[i];
                closestDist = dist;
            }

            if(closestCannon !== null) {
                closestCannon.material = NORMAL_CANNON_MATERIAL;
            }
            
            if(resultCannon === null) {
                closestCannon = null;
            } else {
                resultCannon.material = CLOSEST_CANNON_MATERIAL;
                closestCannon = resultCannon;
            }
        }

        function selectCannon() {
            if(playerMesh === null) return;

            if(Input.GetButton("ShiftLeft")) {
                if(selectedCannon !== null)   return;
                if(closestCannon === null)  return;
                selectedCannon = closestCannon;
            } else {
                if(selectedCannon === null) return;
                selectedCannon = null;
            }
            
        }

        updateWorld();
        updateCannonBall();
        updatePlayer();

        renderer.render(scene, camera);
        renderer.setAnimationLoop(draw);
    }

    draw();
}