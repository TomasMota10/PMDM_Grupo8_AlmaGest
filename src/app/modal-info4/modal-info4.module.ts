import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfo4PageRoutingModule } from './modal-info4-routing.module';

import { ModalInfo4Page } from './modal-info4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfo4PageRoutingModule
  ],
  declarations: [ModalInfo4Page]
})
export class ModalInfo4PageModule {}
