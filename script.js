import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScore = document.getElementById("player-score")
const computerScore = document.getElementById("computer-score")

let lastTime;

function update(time) {
    if(lastTime != null) {
        const delta = time - lastTime;

        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        // playerPaddle.update(delta, ball.y)
        computerPaddle.update(delta, ball.y)

        if(isLose()) {
            handleLose();
        }

        const hue = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--hue")
        )
        document.documentElement.style.setProperty("--hue", hue + delta*0.01)
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect();
    if (rect.left <= 0) {
        computerScore.textContent = parseInt(computerScore.textContent)+1;
    }
    else {
        playerScore.textContent = parseInt(playerScore.textContent)+1;     
    }
    ball.reset();
    playerPaddle.reset();
    computerPaddle.reset();
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

window.requestAnimationFrame(update);