import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalInfo2Page } from '../modal-info2/modal-info2.page';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  productos: any[] =[];
  limite=50;

  // @ViewChild('lista',{static:true}) lista: IonList;
  
  constructor(private restService : RestService, private modalCtrl : ModalController) { }

  ngOnInit() {
    this.restService.obtenerProductosEmpresa()
    .then(data => {
      this.productos = data['data'];
    })
  }

  borrarProduct(id: number){

  }

  async addProduct() {
    const modal = await this.modalCtrl.create({
      component: ModalInfo2Page,
      componentProps:{
        productos: this.productos
      }
    });
    this.ngOnInit();
    return await modal.present();
    
  }
}
