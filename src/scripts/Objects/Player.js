import PlayerController from "../Controllers/PlayerController";
import CannonController from "../Controllers/CannonController";
import THREE from "three";

export default class Player {
    constructor(pos, rot) {
        if(typeof pos !== THREE.Vector3)        throw new Error("[ Player - Constructor(pos, rot) ] pos parameter is must Vector3!");
        if(typeof rot !== THREE.Quaternion)     throw new Error("[ Player - Constructor(pos, rot) ] rot parameter is must Quaternion!");
    }
}