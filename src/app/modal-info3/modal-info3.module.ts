import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfo3PageRoutingModule } from './modal-info3-routing.module';

import { ModalInfo3Page } from './modal-info3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfo3PageRoutingModule
  ],
  declarations: [ModalInfo3Page]
})
export class ModalInfo3PageModule {}
