export default class Demo {
    constructor() {
        this.name = "demo";
    }

    hello() {
        console.log("hello ", this.name);
    }
}

let demo = new Demo();

demo.hello();
