import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
  
  aux: any[] = [];
  pedidos: any[] = [];

  constructor(private restService: RestService) { }

  ngOnInit() {

    this.restService.obtenerPedidos()
    .then(data => {
      this.aux.push(...data['data']);

    // this.pedidos.forEach(data => {
    //   if(data.target_company_name==this.restService.company){
    //     this.pedidos.push(data);
    // }
    // })
  })
  }

  loadData(event) {

    setTimeout(() => {
      if (this.pedidos.length > 2) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }

      event.target.complete();
     }, 2000);
   }
}
