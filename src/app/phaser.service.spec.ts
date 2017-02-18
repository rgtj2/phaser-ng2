/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PhaserService } from './phaser.service';

describe('PhaserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhaserService]
    });
  });

  it('should ...', inject([PhaserService], (service: PhaserService) => {
    expect(service).toBeTruthy();
  }));
});
