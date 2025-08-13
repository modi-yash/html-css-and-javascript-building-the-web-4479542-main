// The script runs when everything is loaded.

class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dead = false;
    this.img = undefined;
  }
}
const images = {
  laserRedImg: undefined,
  laserRedShot: undefined,
  laserGreenShot: undefined,
  canvas: undefined,
  ctx: undefined,
  heroImg: undefined,
  heroImgLeft: undefined,
  heroImgRight: undefined,
  heroImgDamaged: undefined,
  lifeImg: undefined,
  monsterImg: undefined
};
function loadTexture(src_path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src_path;
    img.onload = () => {
      resolve(img);
    };
  });
}

window.onload = async () => {
  canvas = document.getElementById("game-canvas");
  // @ts-ignore
  ctx = canvas.getContext("2d");
  [
    images.heroImg,
    images.heroImgLeft,
    images.heroImgRight,
    images.heroImgDamaged,
    images.monsterImg,
    images.laserRedImg,
    images.laserRedShot,
    images.laserGreenShot,
    images.lifeImg
  ] = await Promise.all([
    loadTexture("spaceArt/png/player.png"),
    loadTexture("spaceArt/png/playerLeft.png"),
    loadTexture("spaceArt/png/playerRight.png"),
    loadTexture("spaceArt/png/playerDamaged.png"),
    loadTexture("spaceArt/png/enemyShip.png"),
    loadTexture("spaceArt/png/laserRed.png"),
    loadTexture("spaceArt/png/laserRedShot.png"),
    loadTexture("spaceArt/png/laserGreenShot.png"),
    loadTexture("spaceArt/png/life.png")
  ]);
  Object.values(images).forEach((image) => {
    console.log(image);
  });
}