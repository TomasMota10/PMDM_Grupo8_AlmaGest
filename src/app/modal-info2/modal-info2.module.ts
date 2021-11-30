import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfo2PageRoutingModule } from './modal-info2-routing.module';

import { ModalInfo2Page } from './modal-info2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfo2PageRoutingModule
  ],
  declarations: [ModalInfo2Page]
})
export class ModalInfo2PageModule {}
