import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { createBackground } from './logic/createBackground';
import { createBall } from './logic/createBall';
import { setupInteractions } from './logic/setupInteractions';

export const BallAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new PIXI.Application();

    const init = async () => {
      await app.init({
        resizeTo: window,
        backgroundColor: 0x000000,
        antialias: true,
      });

      containerRef.current?.appendChild(app.canvas);
      const { width, height } = app.screen;

      const background = createBackground(width, height);
      const { ballContainer, ball, message, aura } = createBall(width, height);

      background.mask = ball;

      app.stage.addChild(background);
      app.stage.addChild(ballContainer);

      ballContainer.eventMode = 'static';
      ballContainer.hitArea = new PIXI.Circle(0, 0, 80);

      setupInteractions(app, ballContainer, message);

      ballContainer.on(
        'pointerdown',
        () => {
          aura.visible = false;
        },
        { once: true },
      );

      let velocityY = 0;
      let velocityX = 0;
      const gravity = 0.5;
      const bounce = 0.6;
      const friction = 0.98;
      const ballRadius = 80;

      let isPhysicsActive = false;

      app.stage.on('pointerup', () => {
        isPhysicsActive = true;
      });
      app.stage.on('pointerupoutside', () => {
        isPhysicsActive = true;
      });

      ballContainer.on('pointerdown', () => {
        isPhysicsActive = false;
        velocityY = 0;
        velocityX = 0;
      });

      app.ticker.add(() => {
        aura.alpha = message.visible
          ? 0.4 + Math.abs(Math.sin(Date.now() * 0.003) * 0.6)
          : 1;

        if (!isPhysicsActive) {
          return;
        }

        velocityY += gravity;
        velocityX *= friction;

        ballContainer.x += velocityX;
        ballContainer.y += velocityY;


        if (ballContainer.y + ballRadius > height) {
          ballContainer.y = height - ballRadius;
          velocityY *= -bounce;

          if (Math.abs(velocityY) < 1) {
            velocityY = 0;
            isPhysicsActive = false;
          }
        }

        if (ballContainer.y - ballRadius < 0) {
          ballContainer.y = ballRadius;
          velocityY *= -bounce;
        }

        if (ballContainer.x + ballRadius > width) {
          ballContainer.x = width - ballRadius;
          velocityX *= -bounce;
        }

        if (ballContainer.x - ballRadius < 0) {
          ballContainer.x = ballRadius;
          velocityX *= -bounce;
        }
      });

      app.ticker.add(() => {
        aura.alpha = message.visible
          ? 0.4 + Math.abs(Math.sin(Date.now() * 0.003) * 0.6)
          : 1;
      });
    };

    init();

    return () => {
      app.destroy(true, { children: true });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', touchAction: 'none' }}
    />
  );
};
