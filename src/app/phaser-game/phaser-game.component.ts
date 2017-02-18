import { Component, OnInit, HostListener } from '@angular/core';
import { PhaserService } from '../phaser.service';

@Component({
  selector: 'app-phaser-game',
  templateUrl: './phaser-game.component.html',
  providers: [PhaserService],
  styleUrls: ['./phaser-game.component.css'],
  host: {
    '(window:resize)': 'resizeGame($event)'
  }
})
export class PhaserGameComponent implements OnInit {

  game;

  constructor(private phaserService: PhaserService){}

  ngOnInit(){
    this.createGame();
  }

  createGame(){
    this.game = this.phaserService.createGame(this.setWidth(), this.setHeight(), 'gameCanvas');
  }

  resizeGame(){
    this.game.height = this.setHeight();
    this.game.width = this.setWidth();
  }

  setWidth() {
    return window.innerWidth - 20;
  }

  setHeight(){
    return window.innerHeight - 20;
  }

}
