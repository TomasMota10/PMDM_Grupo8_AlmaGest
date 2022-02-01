import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ModalController } from '@ionic/angular';
import { ModalInfo3Page } from '../modal-info3/modal-info3.page'

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  aux: any[]=[];
  pedidos: any[] = [];

  constructor(private restService: RestService, private modalCtrl: ModalController) { }

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

  async addPedidos(){
    const modal = await this.modalCtrl.create({
      component: ModalInfo3Page,
      componentProps: {
        titulo: 'Iniciar Pedido'
      }
    });
    await modal.present();
  }
}
