export class BasicController {
    constructor(player) {
        if(this.constructor === BasicController) { throw new Error("Must Abstract Class is inherited Sub Class!"); }

        this.controller = player;

        this.keys = [];
        this.keys["ArrowUp"] = new KeyInput("ArrowUp");
        this.keys["ArrowDown"] = new KeyInput("ArrowDown");
        this.keys["ArrowLeft"] = new KeyInput("ArrowLeft");
        this.keys["ArrowRight"] = new KeyInput("ArrowRight");
        this.keys["ShiftLeft"] = new KeyInput("ShiftLeft");
        this.keys["ControlLeft"] = new KeyInput("ControlLeft");
        this.keys["KeyZ"] = new KeyInput("KeyZ");
    }

    HandleInput() { throw new Error("Not Implementation Error"); }
}

export class KeyInput {
    #isPressed = false;

    constructor(code) {
        window.addEventListener("keydown", (e) => {
            if(e.code !== code)             return;
            if(this.#isPressed === true)    return;
            this.#isPressed = true;
        });

        window.addEventListener("keyup", (e) => {
            if(e.code != code)              return;
            if(this.#isPressed === false)   return;
            this.#isPressed = false;
        });
    }

    IsPressed() { return this.#isPressed; }
}