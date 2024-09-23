import Bullet from "./Bullet.js";

export default class BulletController {
  bullets = [];
  timeTimeNextBulletAllowed = 0;

  constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
    this.canvas = canvas;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.bulletColor = bulletColor;
    this.soundEnabled = soundEnabled;

    this.shootSound = new Audio("sounds/shoot.wav");
    this.shootSound.volume = 0.1;
  }

  draw(context) {
    if (
      (this.bullets = this.bullets.filter(
        (bullet) =>
          bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
      ))
    )
      this.bullets.forEach((bullet) => bullet.draw(context));
    if (this.timeTimeNextBulletAllowed > 0) {
      this.timeTimeNextBulletAllowed--;
    }
  }

  collideWith(sprite) {
    const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite)
    );
    if (bulletThatHitSpriteIndex >= 0) {
      this.bullets.splice(bulletThatHitSpriteIndex, 1);
      return true;
    }
    return false;
  }

  shoot(x, y, velocity, timeTimeNextBulletAllowed = 0) {
    if (
      this.timeTimeNextBulletAllowed <= 0 &&
      this.bullets.length < this.maxBulletsAtATime
    ) {
      const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
      this.bullets.push(bullet);
      if (this.soundEnabled) {
        this.shootSound.currentTime = 0;
        this.shootSound.play();
      }
      this.timeTimeNextBulletAllowed = timeTimeNextBulletAllowed;
    }
  }

  clearBullets() {
    this.bullets = [];
  }
}
