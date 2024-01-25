import * as THREE from "three";
import Transform from "../Components/Transform.js";
import { CheckType } from "../Utils/Utils.js";

export default class GameObject {
    constructor(mesh) {
        this.Mesh = mesh;
        this.Transform = new Transform(this);
    }

    /*
    // [[ Object Component Method ]]
    AddComponent(comp) {
        if(comp.constructor === Transform)  throw new TypeError("[ Object - AddComponent(comp) ] Cannot Add Transform Component To Object!");
        CheckType(comp, Component);
        this[comp.constructor] = comp;
    }

    GetComponent(type) { 
        if(this[type] === undefined)    throw new ReferenceError("[ Object - GetComponent(type) ] There is no type to get");
        return this[type];
    }
    */

    // [[ Object Activation Method ]]
    #activation = true;
    SetActivate(act) {
        CheckType(act, Boolean);

        if(act === true)    this.Start();
        this.#activation = act;
    }

    IsActivated() { return this.#activation; }

    // [[ Object LiftCycle Event Method ]]
    Awake() { }
    Start() { }
    Update() { }
    FixedUpdate() { }
    LateUpdate() { }


    // [[ Object LifeCycle for Engine ]]
    EngineAwake() {
        this.Awake();
        this.Transform.GetChildren().forEach((child) => child.gameObject.EngineAwake());
    }
    EngineStart() {
        if(this.IsActivated() === false)    return;
        this.Start();
        this.Transform.GetChildren().forEach((child) => child.gameObject.EngineStart());
    }
    EngineUpdate() {
        if(this.IsActivated() === false)    return;
        this.Update();
        this.Transform.GetChildren().forEach((child) => child.gameObject.EngineUpdate());
    }
    EngineFixedUpdate() {
        if(this.IsActivated() === false)    return;
        this.FixedUpdate();
        this.Transform.GetChildren().forEach((child) => child.gameObject.EngineFixedUpdate());
    }
    EngineLateUpdate() {
        if(this.IsActivated() === false)    return;
        this.LateUpdate();
        this.Transform.GetChildren().forEach((child) => child.gameObject.EngineLateUpdate());
    }
}


