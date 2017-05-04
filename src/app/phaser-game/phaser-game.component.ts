/// <reference path="../../../typings/globals/phaser/index.d.ts"/>

import { Component, OnInit, HostListener } from '@angular/core';
import { PhaserService } from '../phaser.service';
import { DeviceRecoginzer } from '../device-recognizer';

@Component({
  selector: 'app-phaser-game',
  templateUrl: './phaser-game.component.html',
  providers: [PhaserService],
  styleUrls: ['./phaser-game.component.css']
})
export class PhaserGameComponent implements OnInit {

  game: Phaser.Game;
  tadpole1: Phaser.Sprite;
  octopus: Phaser.Sprite;
  tween: Phaser.Tween;
  cursors: Phaser.CursorKeys;
  stars: Phaser.Group;
  score: number;
  song: Phaser.Sound;
  pointer: Phaser.Pointer;
  isMobile: boolean;

  constructor(private phaserService: PhaserService) {
    this.score = 0;
    this.isMobile = DeviceRecoginzer.isMobile();
  }

  // @HostListener('window:resize') resize(): void {
  //  this.resizeGame();
  // };

  ngOnInit(): void {
    const stages = this.buildStages();
    this.createGame(stages);
  }

  buildStages() {
    return {
      preload: this.preload.bind(this),
      create: this.create.bind(this),
      update: this.update.bind(this)
    };
  }

  preload() {
    this.game.load.spritesheet('tadpole1', '../../assets/sprites/tadpole1.png', 200, 57);
    this.game.load.spritesheet('tadpole2', '../../assets/sprites/tadpole2.png', 200, 57);
    this.game.load.spritesheet('tadpole3', '../../assets/sprites/tadpole3.png', 200, 75);
    this.game.load.spritesheet('tadpole4', '../../assets/sprites/tadpole4.png', 250, 75);
    this.game.load.spritesheet('octopus', '../../assets/sprites/octopus.png', 300, 261);
    this.game.load.image('star', '../../assets/sprites/haliplidae.png');
    this.game.stage.setBackgroundColor('#d5c89e');
    this.game.load.audio('tadpoleAudio', '../../assets/audio/tadpole.mp3');
  }

  resizeGame() {
    this.game.height = this.setHeight();
    this.game.width = this.setWidth();
  }

  create() {
    this.pointer = this.game.input.addPointer();
    this.createSong();
    this.createOctopus();
    this.createTadpole();
    this.initStars();
    this.createInputs();
  }

  createSong(): void {
    this.song = this.game.add.audio('tadpoleAudio', 5, true);
    this.song.play();
  }

  createInputs(): void {
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.input.onDown.add(() => {
      if (this.tadpole1.position.x > this.getInputX()) {
        this.tadpole1.animations.play('left');
      } else {
        this.tadpole1.animations.play('right');
      }
      this.game.add.tween(this.tadpole1).to( { x: this.getInputX(), y: this.getInputY() }, 250, Phaser.Easing.Linear.None, true);
    });
  }

  createOctopus(): void {
    this.octopus = this.game.add.sprite(0, window.innerHeight - this.game.world.centerY, 'octopus', 0);
    this.game.physics.arcade.enable(this.octopus);
    this.octopus.body.collideWorldBounds = true;
    this.octopus.body.immovable = true;
    console.log(window.innerWidth);
    console.log(Math.fround( ( window.innerWidth / 10 ) * .005 ));
    this.octopus.scale.x = this.scale('x', .5, 10, .005);
    this.octopus.scale.y = this.scale('y', .5, 10, .005);
  }

  scale(axis: 'x' | 'y', min: number, windowDivisor: number, windowScale: number ): number {
    const windowAxis = axis === 'x' ? window.innerWidth : window.innerHeight;
    return Math.min( Math.fround( ( windowAxis / windowDivisor ) * windowScale ) );
  }

  createTadpole(): void {
    this.tadpole1 = this.game.add.sprite(this.game.world.centerX - 95, this.game.world.centerY + 100, 'tadpole1', 0 );
    this.game.physics.arcade.enable(this.tadpole1);
    this.tadpole1.body.collideWorldBounds = true;
    this.tadpole1.body.bounce.y = 0.2;
    this.tadpole1.body.gravity.y = 300;
    this.tadpole1.animations.add('right', [0]);
    this.tadpole1.animations.add('left', [1]);
    this.tween = this.game.add.tween(this.tadpole1);
    this.tadpole1.scale.x = this.scale('x', 1, 10, .005);
    this.tadpole1.scale.y = this.scale('y', 1, 10, .005);
  }

  initStars(): void {
    this.stars = this.game.add.group();
    this.stars.enableBody = true;
    this.createStars(150);
  }

  createStars(maxGravity: number) {
    for (let i = 0; i < 100; i++) {
      const x = this.randomizeWithinRange(this.game.width, i);
      const y = 0;
      const star = this.stars.create( x, y, 'star');
      star.body.gravity.y = this.randomizeWithinRange(maxGravity, 1);
      star.body.collideWorldBounds = true;
      star.body.velocity.x = this.randomizeWithinRange(100, 1);
      star.body.velocity.max = 200;
      star.body.bounce.setTo(1, 1);
      star.scale.x = this.scale('x', 1, 10, .005);
      star.scale.y = this.scale('y', 1, 10, .005);
    }
  }

  randomizeWithinRange(max: number, x: number) {
    return  ( Math.random() * max * x ) % max;
  }

  getInputX(): number {
    return this.isMobile ? this.game.input.pointer1.screenX : this.game.input.mousePointer.screenX;
  }
  getInputY(): number {
    return this.isMobile ? this.game.input.pointer1.screenY : this.game.input.mousePointer.screenY;
  }

  createGame(stages) {
    this.game = this.phaserService.createGame(this.setWidth(), this.setHeight(), 'gameCanvas', stages);
  }

  update() {
    this.game.physics.arcade.collide(this.tadpole1, this.octopus);
    this.game.physics.arcade.collide(this.octopus, this.stars);
    this.game.physics.arcade.collide(this.stars);

    if (Math.floor(this.score / 100) === 1) {
      this.tadpole1.loadTexture('tadpole2', this.tadpole1.frame, false );
      this.game.physics.arcade.accelerateToObject(this.octopus, this.tadpole1, 133);
    } else if (Math.floor(this.score / 100) === 2) {
      this.tadpole1.loadTexture('tadpole3', this.tadpole1.frame, false);
      this.game.physics.arcade.accelerateToObject(this.octopus, this.tadpole1, 166);
    } else if (Math.floor(this.score / 100) === 3) {
      this.tadpole1.loadTexture('tadpole4', this.tadpole1.frame, false);
      this.game.physics.arcade.accelerateToObject(this.octopus, this.tadpole1, 200);
    } else {
      this.game.physics.arcade.accelerateToObject(this.octopus, this.tadpole1, 100);
    }

    this.game.physics.arcade.overlap( this.tadpole1, this.stars, this.collectStar.bind(this) );
    this.tadpole1.body.velocity.x = 0;
    if (this.cursors.left.isDown) {
      this.tadpole1.body.velocity.x = -150;
      this.tadpole1.animations.play('left');
    } else if (this.cursors.right.isDown ) {
      this.tadpole1.body.velocity.x = 150;
      this.tadpole1.animations.play('right');
    }
    if (this.cursors.up.isDown && this.tadpole1.body.velocity.y > -10) {
      this.tadpole1.body.velocity.y = -450;
    }

    if (this.cursors.down.isDown) {
      this.tadpole1.body.gravity.y = 1200;
    } else {
      this.tadpole1.body.gravity.y = 50;
    }

    if ( this.stars.countLiving() === 0 ) {
      this.createStars(200);
    }

  }

  collectStar(tadpole, star) {
    star.kill();
    this.score += 1;
  }

  setWidth() {
    return window.innerWidth;
  }

  setHeight() {
    return window.innerHeight;
  }

}
