import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from '../services/rest.service';
@Component({
  selector: 'app-modal-info2',
  templateUrl: './modal-info2.page.html',
  styleUrls: ['./modal-info2.page.scss'],
})
export class ModalInfo2Page implements OnInit {

  @Input() productos: []
  prod: any[]=[]
  articulo: any[]=[]
  constructor(private restservice: RestService, private modalctrl: ModalController, private alertctrl: AlertController) { }

  ngOnInit() {
    this.restservice.obtenerArticulos().then(data => {this.prod=data['data']})
  }

  async addproductos(articulo: any){
    const alert=await this.alertctrl.create({
      header: "Establecer Precio",
      inputs: [{
        name:'precio',
        type:'number',
        placeholder:'precio'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },
    {
      text: 'Aceptar',
      handler: (data)=>{
        this.restservice.insertarProductos(articulo.id, data.precio, articulo.family_id) 
        this.modalctrl.dismiss()
        console.log(articulo)}
    }]
    });
    await alert.present();
  }

  cancelar(){
    this.modalctrl.dismiss();
  }

}
