import * as THREE from "three";
import GameObject from "../Objects/GameObject.js";
import Component from "./Component.js";
import { CheckType } from "../Utils/Utils.js";

export default class Transform extends Component {
    constructor(gameObject) {
        CheckType(gameObject, GameObject);

        super();
        this.gameObject = gameObject;
        this.#Mesh = gameObject.Mesh;
        this.#uuid =  gameObject.Mesh.uuid;
    }

    // Position Getter / Setter
    #localPosition = new THREE.Vector3(0, 0, 0);
    GetLocalPosition() { return this.#localPosition; }
    GetWorldPosition() {
        if(this.#parent === null)   return this.#localPosition;

        let worldPosition = this.#parent.GetWorldPostion();
        worldPosition.add(this.#localPosition);
        return worldPosition;
    }
    SetLocalPosition(target) {
        CheckType(target, THREE.Vector3);

        this.#localPosition = target;
        this.#Mesh.position.x = target.x;
        this.#Mesh.position.y = target.y;
        this.#Mesh.position.z = target.z;
    }

    // Rotation Getter / Setter
    #localRotation = new THREE.Vector3(0, 0, 0);
    GetLocalRotation() { return this.#localRotation; }
    GetWorldRotation() {
        if(this.#parent === null)   return this.#localRotation;

        let worldRotation = this.#parent.GetWorldRotation();
        worldRotation.add(this.#localRotation);
        return worldRotation;
    }
    SetLocalRotation(target) {
        CheckType(target, THREE.Vector3);

        this.#localRotation = target;
        this.#Mesh.rotation.x = target.x * THREE.MathUtils.DEG2RAD;
        this.#Mesh.rotation.y = target.y * THREE.MathUtils.DEG2RAD;
        this.#Mesh.rotation.z = target.z * THREE.MathUtils.DEG2RAD;
    }

    // Scale Getter / Setter
    #localScale = new THREE.Vector3(1, 1, 1);
    GetLocalScale() { return this.#localScale; }
    GetWorldScale() {
        if(this.#parent === null)   return this.#localRotation;

        let worldRotation = this.#parent.GetWorldRotation();
        worldRotation.add(this.#localRotation);
        return worldRotation;
    }
    SetLocalScale(target) {
        CheckType(target, THREE.Vector3);

        this.#localScale = target;
        this.#Mesh.scale.x = target.x;
        this.#Mesh.scale.y = target.y;
        this.#Mesh.scale.z = target.z;
    }

    // Mesh Getter
    #Mesh;
    GetMesh() { return this.#Mesh; }

    // Parent Getter / Setter
    #parent = null;
    GetParent() { return this.#parent; }

    SetParent(parent) {
        CheckType(parent, Transform);

        this.#parent = parent;
        this.#Mesh.parent = parent.GetMesh();

        if(parent.Find(this.GetUUID()) === null)    parent.AddChild(this);
    }

    DetachParent() {
        if(this.#parent === null)   return;

        let target = this.#parent.Find(this.GetUUID());
        if(target !== null) {
            const idx = this.#parent.GetChildren().indexOf(target);
            if(idx > -1)
                this.#parent.GetChildren().splice(index, 1);
        }

        this.#parent = null;
        this.#Mesh.parent = null;
    }

    // Children Method
    #children = [];

    AddChild(child) {
        CheckType(child, Transform);
        this.#children[child.GetUUID()] = child;

        if(child.GetParent() !== this)  child.SetParent(this);
    }

    GetChild(index) {
        CheckType(index, Number);
        if(index < 0 || index >= this.#children.length)
            throw RangeError("[ Transform - GetChild(index) ] index is must ranged in length of children!");

        return this.#children[index];
    }

    GetChildren() { return this.#children; }

    Find(uuid) {
        CheckType(uuid, String);

        let target = null;
        this.#children.forEach((child) => {
            if(child.GetUUID() === uuid)
                target = child;
        });

        return target;
    }

    // [[ Movement Function ]]

    Translate(dist) {
        CheckType(dist, THREE.Vector3);

        let endPos = this.#localPosition;
        endPos.add(dist);
        this.SetLocalPosition(endPos);
    }

    Rotate(rot) {
        CheckType(dist, THREE.Vector3);

        let endRot = this.#localRotation;
        endRot.add(rot);
        this.SetLocalRotation(endRot);
    }


    // [[ Other ]]

    // Mesh UUID Getter
    #uuid;
    GetUUID() { return this.#uuid; }
}