export default class Delay {
    constructor() {
        this.timer = 0;
    }

    start(callback, ms) {
        clearTimeout(this.timer);

        this.timer = setTimeout(callback, ms);
    }
}
