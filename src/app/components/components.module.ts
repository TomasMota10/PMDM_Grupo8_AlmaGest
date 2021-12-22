import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjpedidoComponent } from './tarjpedido/tarjpedido.component';
import { IonicModule } from '@ionic/angular';
import { ListpedidosComponent } from './listpedidos/listpedidos.component';



@NgModule({
  declarations: [TarjpedidoComponent, ListpedidosComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    TarjpedidoComponent,
    ListpedidosComponent,
  ]
})
export class ComponentsModule { }
