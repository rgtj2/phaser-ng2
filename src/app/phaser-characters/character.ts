/// <reference path="../../../typings/globals/phaser/index.d.ts"/>


export abstract class PhaserCharacter {
  constructor(public game: Phaser.Game) {}

  abstract preload(): void;
  abstract create(): void;
  abstract update(): void;
}
