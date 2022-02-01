import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { ModalInfo2Page } from '../modal-info2/modal-info2.page';
import { ModalInfo2PageModule } from '../modal-info2/modal-info2.module';

@NgModule({
  entryComponents: [
    ModalInfo2Page
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    ModalInfo2PageModule,
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
