export default class BasicController {
    constructor(player) {
        if(this.constructor === BasicController) { throw new Error("Must Abstract Class is inherited Sub Class!"); }

        this.controller = player;
    }

    HandleInput(key) {
        if(typeof key === KeyboardEvent)    throw new Error("[ BasicController - HandleInput(key) ] parameter is not type of KeyboardEvent!");

        if(key.code === "ArrowLeft")            this.OnArrowLeftKeyDown(this.controller);
        else if(key.code === "ArrowRight")      this.OnArrowRightKeyDown(this.controller);
        else if(key.code === "ArrowUp")         this.OnArrowUpKeyDown(this.controller);
        else if(key.code === "ArrowDown")       this.OnArrowDownKeyDown(this.controller);
        else if(key.code === "ShiftLeft")       this.OnShiftLeftKeyDown(this.controller);
        else if(key.code === "ControlLeft")     this.OnControlLeftKeyDown(this.controller);
        else if(key.code === "KeyZ")            this.OnKeyZDown(this.controller);
    }

    OnArrowLeftKeyDown(player) { throw new Error("Not Implementation Error"); }
    OnArrowRightKeyDown(player) { throw new Error("Not Implementation Error"); }
    OnArrowUpKeyDown(player) { throw new Error("Not Implementation Error"); }
    OnArrowDownKeyDown(player) { throw new Error("Not Implementation Error"); }
    OnShiftLeftKeyDown(player) { throw new Error("Not Implementation Error"); }
    OnControlLeftKeyDown(player) { throw new Error("Not Implementation Error"); }
    OnKeyZDown(player) { throw new Error("Not Implementation Error"); }
}