import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdIcon, MdIconRegistry } from '@angular/material';
import { PhaserGameComponent } from './phaser-game/phaser-game.component';
import { DeviceRecoginzer } from './device-recognizer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [MdIconRegistry],
  entryComponents: [MdIcon]
})

export class AppComponent {
  private dialogConfirmed: boolean;

  constructor(private dialog: MdDialog, mdIconRegistry: MdIconRegistry) {
    mdIconRegistry.addSvgIconSetInNamespace('core', 'fonts/core-icon-set.svg');
    this.dialogConfirmed = false;
  }

  ngOnInit() {
    this.showModal();
  }

  public showModal() {
    const dialogRef = this.dialog.open(DialogResultExampleDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.dialogConfirmed = true;
    });
  }
}

@Component({
  selector: 'app-dialog-result-example-dialog',
  templateUrl: './modal.html',
})

export class DialogResultExampleDialogComponent {
  public isMobile = DeviceRecoginzer.isMobile();
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialogComponent>) {}
}
