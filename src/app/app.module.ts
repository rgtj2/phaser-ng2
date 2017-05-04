import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent, DialogResultExampleDialogComponent } from './app.component';
import { PhaserGameComponent } from './phaser-game/phaser-game.component';

//const appRoutes: Routes = [
  //{ path: 'heroes', component: PhaserGameComponent },
//];


@NgModule({
  declarations: [
    AppComponent,
    DialogResultExampleDialogComponent,
    PhaserGameComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule//,
    //RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [DialogResultExampleDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
