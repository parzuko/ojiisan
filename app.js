const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d");

const WIDTH = 1024;
const HEIGHT = 576;

const main = () => {
    setUpIsland();
};

const setUpIsland = () => {
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

    const islandImage = new Image();
    islandImage.src = "assets/island.png";
    islandImage.onload = () => canvasContext.drawImage(islandImage, -700, -500);
};

(async () => {
    main();
})();
