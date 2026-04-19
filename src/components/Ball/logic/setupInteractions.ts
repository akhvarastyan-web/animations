import * as PIXI from 'pixi.js';

 export const setupInteractions = (
  app: PIXI.Application,
  ballContainer: PIXI.Container,
  message: PIXI.Text
) => {
  let isDragging = false;

  const stage = app.stage;
  const ball = ballContainer;
  const msg = message;

  ball.eventMode = 'static';

  ball.on('pointerdown', () => {
    isDragging = true;
    msg.visible = false;
  });

  stage.eventMode = 'static';
  stage.hitArea = app.screen;

  stage.on('pointermove', event => {
    if (isDragging) {
      ball.position.copyFrom(event.global);
    }
  });

  const endDrag = () => {
    isDragging = false;
  };

  stage.on('pointerup', endDrag);
  stage.on('pointerupoutside', endDrag);
};
