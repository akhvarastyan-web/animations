import * as PIXI from 'pixi.js';

export const createBackground = (width: number, height: number) => {
  const container = new PIXI.Container();

  const bg = new PIXI.Graphics();

  bg.rect(0, 0, width, height);
  bg.fill(0xffffff);
  container.addChild(bg);

  const centerX = width / 2;
  const centerY = height / 2;

  const colorSources = [
    // Верхній край
    { x: width * 0.2, y: 0, color: [255, 0, 0] },
    { x: width * 0.4, y: 0, color: [255, 127, 0] },
    { x: width * 0.6, y: 0, color: [255, 255, 0] },
    { x: width * 0.8, y: 0, color: [127, 255, 0] },
    // Правий край
    { x: width, y: height * 0.2, color: [0, 255, 0] },
    { x: width, y: height * 0.4, color: [0, 255, 127] },
    { x: width, y: height * 0.6, color: [0, 255, 255] },
    { x: width, y: height * 0.8, color: [0, 127, 255] },
    // Нижній край
    { x: width * 0.8, y: height, color: [0, 0, 255] },
    { x: width * 0.6, y: height, color: [127, 0, 255] },
    { x: width * 0.4, y: height, color: [255, 0, 255] },
    { x: width * 0.2, y: height, color: [255, 0, 127] },
    // Лівий край
    { x: 0, y: height * 0.8, color: [255, 0, 64] },
    { x: 0, y: height * 0.6, color: [200, 100, 0] },
    { x: 0, y: height * 0.4, color: [150, 0, 200] },
    { x: 0, y: height * 0.2, color: [255, 50, 0] },
  ];

  colorSources.forEach(({ x, y, color: [r, g, b] }) => {
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

    const grad = ctx.createRadialGradient(x, y, 0, x, y, dist);

    grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
    grad.addColorStop(0.05, `rgba(${r},${g},${b},0.9)`);
    grad.addColorStop(0.15, `rgba(${r},${g},${b},0.6)`);
    grad.addColorStop(0.3, `rgba(${r},${g},${b},0.3)`);
    grad.addColorStop(0.5, `rgba(${r},${g},${b},0.1)`);
    grad.addColorStop(0.7, `rgba(${r},${g},${b},0)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    const texture = PIXI.Texture.from(canvas);
    const sprite = new PIXI.Sprite(texture);

    container.addChild(sprite);
  });

  return container;
};
