let MAX_SPEED = 0.0007

export default class Paddle {
    constructor(paddElem) {
        this.paddElem = paddElem
        this.reset()
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddElem).getPropertyValue("--position"));
    }

    set position(value) {
        this.paddElem.style.setProperty("--position", value)
    }

    rect () {
        return this.paddElem.getBoundingClientRect()
    }

    reset() {
        this.position = 50;
        MAX_SPEED += 0.0007;
    }

    update(delta, ballHeight) {
        this.position += MAX_SPEED * delta * (ballHeight-this.position);
    }
}