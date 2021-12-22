import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

 
  pedidos: any[] = [];

  constructor(private restService: RestService) { }

  ngOnInit() {

    this.restService.obtenerPedidos()
    .then(data => {
      this.pedidos.push(...data['data']);

  })
  }

  
}
