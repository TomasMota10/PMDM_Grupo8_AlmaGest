import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfo3PageRoutingModule } from './modal-info3-routing.module';

import { ModalInfo3Page } from './modal-info3.page';
import { ModalInfo4Page } from '../modal-info4/modal-info4.page';
import { ModalInfo4PageModule } from '../modal-info4/modal-info4.module';

@NgModule({
  entryComponents: [
    ModalInfo4Page
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfo3PageRoutingModule,
    ModalInfo4PageModule
  ],
  declarations: [ModalInfo3Page]
})
export class ModalInfo3PageModule {}
