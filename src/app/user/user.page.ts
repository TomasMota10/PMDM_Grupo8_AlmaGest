import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ModalController } from '@ionic/angular';
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

  @ViewChild('lista',{static:true}) lista: IonList;
  
  constructor(private restService : RestService, private modalCtrl : ModalController) { }

  ngOnInit() {
    this.restService.obtenerProductosEmpresa()
    .then(data => {
      this.productos = data['data'];
    })
  }

  borrarProduct(i: number, id: number){
    this.productos.splice(i, 1);
    this.restService.eliminarProducto(id);
    
  }

  async addProduct() {
    const modal = await this.modalCtrl.create({
      component: ModalInfo2Page,
      componentProps:{
        productos: this.productos
      }
    });
     
    modal.onDidDismiss().then((data) =>{
      this.ngOnInit();
    })
     await modal.present();
     
  }
}
