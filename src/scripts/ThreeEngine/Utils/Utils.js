export function CheckType(obj, type) {
    let proto = obj;
    while(proto !== null) {
        if(proto.constructor === type)  return;
        proto = Object.getPrototypeOf(proto);
    }
    
    throw new TypeError("[ " + obj + " ] Type Error!");
}