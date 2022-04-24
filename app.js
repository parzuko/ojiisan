const canvas = document.querySelector("canvas");
const loadingImage = document.querySelector(".loadingImage");
const winScreen = document.querySelector(".winImage");
const c = canvas.getContext("2d");

// setTimeout(() => {
//     loadingImage.style.display = "none";
// }, 1000);

function fadeInImage(el) {
    el.style.opacity = 0;
    var tick = function () {
        el.style.opacity = +el.style.opacity + 0.01;
        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
                setTimeout(tick, 16);
        }
    };
    tick();
}

function fadeOutImage(el) {
    el.style.opacity = 1;
    var tick = function () {
        el.style.opacity -= 0.003;
        if (+el.style.opacity < 1 && +el.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
                setTimeout(tick, 16);
        }
    };
    tick();
}

fadeOutImage(loadingImage);

setTimeout(() => {
    loadingImage.style.display = "none";
}, 3000);

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

const boundaries = [];
const offset = {
    x: -735,
    y: -650,
};

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                })
            );
    });
});

const battleZones = [];

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                })
            );
    });
});

const image = new Image();
image.src = "assets/island.png";

const foregroundImage = new Image();
foregroundImage.src = "assets/foregroundObjects.png";

const playerDownImage = new Image();
playerDownImage.src = "assets/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "assets/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "assets/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "assets/playerRight.png";

const sensieImage = new Image();
sensieImage.src = "assets/sensei.png";

const treeRedImage = new Image();
treeRedImage.src = "assets/treeRed.png";

const treeBlueImage = new Image();
treeBlueImage.src = "assets/treeBlue.png";

const chaiImage = new Image();
chaiImage.src = "assets/chai.png";

const swordImage = new Image();
swordImage.src = "assets/asta.png";

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 10,
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    },
});

// Adding assets on screen

const senseiPositionFixed = {
    x: canvas.width / 2 - 450,
    y: canvas.height / 2 - 90,
};

const sensei = new Sprite({
    position: senseiPositionFixed,
    image: sensieImage,
});

boundaries.push(
    new Boundary({
        position: {
            x: canvas.width / 2 - 450,
            y: canvas.height / 2 - 90,
        },
    })
);

const treeRed = new Sprite({
    image: treeRedImage,
    position: {
        x: canvas.width / 2 + 1200,
        y: canvas.height / 2 - 70,
    },
});

boundaries.push(
    new Boundary({
        position: {
            x: canvas.width / 2 + 1200,
            y: canvas.height / 2 - 70,
        },
    })
);

const treeBlue = new Sprite({
    image: treeBlueImage,
    position: {
        x: canvas.width / 2 + 1100,
        y: canvas.height / 2 - 70,
    },
});

boundaries.push(
    new Boundary({
        position: {
            x: canvas.width / 2 + 1100,
            y: canvas.height / 2 - 70,
        },
    })
);

const chai = new Sprite({
    image: chaiImage,
    position: {
        x: canvas.width / 2 + 800,
        y: canvas.height / 2 - 200,
    },
});


const sword = new Sprite({
    image: swordImage,
    position: {
        x: canvas.width / 2 + 650,
        y: canvas.height / 2 + 350,
    },
});

boundaries.push(
    new Boundary({
        position: {
            x: canvas.width / 2 + 650,
            y: canvas.height / 2 + 350,
        },
    })
);

// Finish assets adding

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: image,
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImage,
});

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};

// fixed items
const movables = [
    background,
    ...boundaries,
    foreground,
    sensei,
    treeRed,
    treeBlue,
    sword,
    chai,
    ...battleZones,
];

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
}

const battle = {
    initiated: false,
};

function animate() {
    const animationId = window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    });
    battleZones.forEach(battleZone => {
        battleZone.draw();
    });
    player.draw();

    // Other stuff
    sensei.draw();
    treeRed.draw();
    treeBlue.draw();
    chai.draw();
    sword.draw();
    // Finish
    foreground.draw();

    let moving = true;
    player.animate = false;

    if (battle.initiated) return;

    let i = 0;
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        const dialogue = document.querySelector("#dialogueBox");

        // interact with sensei
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: sensei,
            })
        ) {
            document.querySelector("#userInterface").style.display = "block";
            dialogue.style.display = "block";
            const convo = [
                "Hey! Welcome back old friend, we've been waiting for you.",
                "Wait a second, you're not my friend Arnold. You sure do look like him, but your hair, it's a very different color.",
                "The resemblance, no it can not be! This can only mean one thing! You, you are from the ...",
                "You must leave immediately, and whatever you do; do not explore the grassy fields! DO NOT.",
                "I better seal away that Sword, before it may fall into the wrong hands. Leave, run away now! I must go too!",
            ];
            dialogue.innerHTML = convo[0];
            dialogue.addEventListener("click", () => {
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: sensei,
                    })
                ) {
                    dialogue.innerHTML = convo[i++ % convo.length];
                    if (i > convo.length) {
                        dialogue.innerHTML = "";

                        const stayButton = document.createElement("div");
                        stayButton.innerHTML = "Stay ?";
                        stayButton.classList = "optionButton";
                        stayButton.addEventListener("click", () => {
                            sensei.remove();
                            gsap.to(player.position, {
                                x: player.position.x + 100,
                                y: player.position.y + 50,
                            });
                            document.querySelector(
                                "#userInterface"
                            ).style.display = "none";
                        });

                        const leaveButton = document.createElement("div");
                        leaveButton.innerHTML = "Leave ?";
                        leaveButton.classList = "optionButton";
                        leaveButton.addEventListener("click", () => {
                            document.querySelector(
                                "#userInterface"
                            ).style.display = "none";
                            winScreen.style.display = "block";
                            fadeInImage(winScreen);
                        });

                        dialogue.appendChild(stayButton);
                        dialogue.appendChild(leaveButton);
                    }
                }
            });
        } else if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: sword,
            })
        ) {
            document.querySelector("#userInterface").style.display = "block";
            dialogue.style.display = "block";

            dialogue.innerHTML =
                "This is the Sword of Elders Past. Use it wisely. It can eventually belong to you. Or does it already? Go into the barren land and grass and complete your destiny!";

            dialogue.addEventListener("click", () => {
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: sword,
                    })
                ) {
                    player.hasSword = true;
                    sword.remove();
                }
            });
        } else if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: chai,
            })
        ) {
            document.querySelector("#userInterface").style.display = "block";
            dialogue.style.display = "block";

            dialogue.innerHTML =
                "Hmm, this tea. Is this the same tea I had at home? Yes, it seems to have come here with me! But is it still the same? The properties are the same, but its location it has changed, so is it still the same?";
        } else if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: treeBlue,
            }) ||
            rectangularCollision({
                rectangle1: player,
                rectangle2: treeRed,
            })
        ) {
            document.querySelector("#userInterface").style.display = "block";
            dialogue.style.display = "block";

            dialogue.innerHTML =
            "Hmm, these trees. They are both trees. They both have the same fruit too! But are they the same tree? Jeez, that is a very metaphysical question.";
        } else {
            document.querySelector("#userInterface").style.display = "none";
        }
    }

    // activate a battle
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i];
            const overlappingArea =
                (Math.min(
                    player.position.x + player.width,
                    battleZone.position.x + battleZone.width
                ) -
                    Math.max(player.position.x, battleZone.position.x)) *
                (Math.min(
                    player.position.y + player.height,
                    battleZone.position.y + battleZone.height
                ) -
                    Math.max(player.position.y, battleZone.position.y));
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone,
                }) &&
                overlappingArea > (player.width * player.height) / 2 &&
                Math.random() < 0.01 &&
                player.hasSword
            ) {
                // deactivate current animation loop
                window.cancelAnimationFrame(animationId);

                audio.Map.stop();
                audio.initBattle.play();
                audio.battle.play();

                battle.initiated = true;
                gsap.to("#overlappingDiv", {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to("#overlappingDiv", {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                // activate a new animation loop
                                initBattle();
                                animateBattle();
                                gsap.to("#overlappingDiv", {
                                    opacity: 0,
                                    duration: 0.4,
                                });
                            },
                        });
                    },
                });
                break;
            }
        }
    }

    if (keys.w.pressed && lastKey === "w") {
        player.animate = true;
        player.image = player.sprites.up;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach(movable => {
                movable.position.y += 3;
            });
    } else if (keys.a.pressed && lastKey === "a") {
        player.animate = true;
        player.image = player.sprites.left;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach(movable => {
                movable.position.x += 3;
            });
    } else if (keys.s.pressed && lastKey === "s") {
        player.animate = true;
        player.image = player.sprites.down;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach(movable => {
                movable.position.y -= 3;
            });
    } else if (keys.d.pressed && lastKey === "d") {
        player.animate = true;
        player.image = player.sprites.right;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y,
                        },
                    },
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach(movable => {
                movable.position.x -= 3;
            });
    }
}
// animate()

let lastKey = "";
window.addEventListener("keydown", e => {
    switch (e.key) {
        case "w":
            keys.w.pressed = true;
            lastKey = "w";
            break;
        case "a":
            keys.a.pressed = true;
            lastKey = "a";
            break;

        case "s":
            keys.s.pressed = true;
            lastKey = "s";
            break;

        case "d":
            keys.d.pressed = true;
            lastKey = "d";
            break;
    }
});

window.addEventListener("keyup", e => {
    switch (e.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
    }
});

let clicked = false;
addEventListener("click", () => {
    if (!clicked) {
        audio.Map.play();
        clicked = true;
    }
});
