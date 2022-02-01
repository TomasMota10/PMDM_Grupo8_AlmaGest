import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosPageRoutingModule } from './pedidos-routing.module';

import { PedidosPage } from './pedidos.page';
import { ComponentsModule } from '../components/components.module';
import { ModalInfo3Page } from '../modal-info3/modal-info3.page';
import { ModalInfo3PageModule } from '../modal-info3/modal-info3.module'

@NgModule({
  entryComponents: [
    ModalInfo3Page
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosPageRoutingModule,
    ComponentsModule,
    ModalInfo3PageModule
  ],
  declarations: [PedidosPage]
})
export class PedidosPageModule {}
