import * as THREE from "three";
import * as CANNON from "cannon-es";
import * as Engine from "../ThreeEngine/ThreeEngine";

export default class Plane extends Engine.GameObject {
    constructor(world, color = "gray") {
        const planeMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshBasicMaterial({color: color})
        );

        const planeBody = new CANNON.Body({
            mess: 0,
            position: new CANNON.Vec3(0, 0, 0),
            shape: new CANNON.Plane(),
            material: new CANNON.Material("iron")
        });

        super(world, planeMesh, planeBody);
    }

    Start() { }

    Update() { }
}