import { Injectable } from '@angular/core';

@Injectable()
export class PhaserService {
  phaser;
  constructor() {
    this.phaser = window['Phaser'];
  }

  createGame(width, height, selector){
    return new this.phaser.Game(width, height, this.phaser.AUTO, selector);
  }

}
