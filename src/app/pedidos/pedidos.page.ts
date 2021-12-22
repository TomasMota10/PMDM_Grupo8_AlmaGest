import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  aux: any[]=[];
  pedidos: any[] = [];

  constructor(private restService: RestService) { }

  ngOnInit() {

    this.restService.obtenerPedidos()
    .then(data => {
      this.aux.push(...data['data']);

      this.aux.forEach(data => {
        if(data.target_company_name == this.restService.company){
         this.pedidos.push(data);
        }
  })
  });
  }
}
