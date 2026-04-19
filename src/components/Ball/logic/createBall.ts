import * as PIXI from 'pixi.js';

export const createBall = (width: number, height: number) => {
  const ballContainer = new PIXI.Container();

  const ball = new PIXI.Graphics();

  ball.circle(0, 0, 80);
  ball.fill(0xffffff);
  ballContainer.addChild(ball);

  const aura = new PIXI.Graphics();

  aura.circle(0, 0, 85);
  aura.stroke({ width: 2, color: 0xffffff, alpha: 0.5 });

  const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: '#ffffff',
    fontWeight: 'bold',
  });

  const message = new PIXI.Text({ text: 'TAKE THE BALL', style });

  message.anchor.set(0.5);
  message.y = -120;

  ballContainer.addChild(aura, message);

  ballContainer.x = width / 2;
  ballContainer.y = height / 2;

  return { ballContainer, ball, aura, message };
};
