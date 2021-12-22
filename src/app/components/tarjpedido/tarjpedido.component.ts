import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tarjpedido',
  templateUrl: './tarjpedido.component.html',
  styleUrls: ['./tarjpedido.component.scss'],
})
export class TarjpedidoComponent implements OnInit {

  @Input() pedido: any;
  
  constructor() { }

  ngOnInit() {}

}
