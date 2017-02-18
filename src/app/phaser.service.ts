import { Injectable } from '@angular/core';

@Injectable()
export class PhaserService {
  Phaser;
  constructor() {
    this.Phaser = window['Phaser'];
  }

  createGame(width, height, selector){
    return new this.Phaser.Game(width, height, this.Phaser.AUTO, selector);
  }

}
