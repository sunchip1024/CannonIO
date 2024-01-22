import BasicController from "./BasicController.js";

export default class CannonController extends BasicController {
    constructor(player) { super(player); }

    OnArrowLeftKeyDown(player) { throw new Error("Not Implementation Error"); }
    OnArrowRightKeyDown(player) { throw new Error("Not Implementation Error"); }
    OnArrowUpKeyDown(player) { throw new Error("Not Implementation Error"); }
    OnArrowDownKeyDown(player) { throw new Error("Not Implementation Error"); }
    OnShiftLeftKeyDown(player) { throw new Error("Not Implementation Error"); }
    OnControlLeftKeyDown(player) { throw new Error("Not Implementation Error"); }
    OnKeyZDown(player) { throw new Error("Not Implementation Error"); }
}