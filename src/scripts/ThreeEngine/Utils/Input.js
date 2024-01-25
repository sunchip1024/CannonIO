export default class Input {
    constructor() { throw new SyntaxError("[ Input Class ] Static Class cannot make instance!"); }

    static #keys = [];
    static #keyStates = [];

    static {
        window.addEventListener("keydown", (e) => { Input.#keys[e.code] = true; });

        window.addEventListener("keypress", (e) => { Input.#keyStates[e.code] = "keypress"; });

        window.addEventListener("keyup", (e) => { Input.#keys[e.code] = false; });
    }

    static AddGetKeyDownEvent(code, callback) {
        window.addEventListener("keydown", (e) => {
            if(e.code === code)
                callback();
        });
    }

    static GetButton(code) { return (Input.#keys[code] === undefined)? false : Input.#keys[code]; }

    static GetHorizontal() {
        let h = 0;
        if(Input.GetButton("ArrowLeft"))    h += 1;
        if(Input.GetButton("ArrowRight"))   h -= 1;
        return h;
    }

    static GetVertical() {
        let v = 0;
        if(Input.GetButton("ArrowUp"))    v += 1;
        if(Input.GetButton("ArrowDown"))   v -= 1;
        return v;
    }
}