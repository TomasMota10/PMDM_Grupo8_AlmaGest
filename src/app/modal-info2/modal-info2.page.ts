import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar, ModalController, ToastController } from '@ionic/angular';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-modal-info2',
  templateUrl: './modal-info2.page.html',
  styleUrls: ['./modal-info2.page.scss'],
})
export class ModalInfo2Page implements OnInit {

  @ViewChild('search', { static: false }) search: IonSearchbar;

  @Input() productos: []
  prod: any[]=[]
  articulos: any[]=[]

  constructor(private toastctrl: ToastController, private restservice: RestService, private modalctrl: ModalController, private alertctrl: AlertController) { }

  ngOnInit() {
   this.obtenerArticulos();
  }

  obtenerArticulos(){
    this.restservice.obtenerArticulos()
    .then(data => {
      this.prod=data['data']
      this.articulos=this.prod
      
    })
  }

  async addproductos(articulo: any){
    const alert=await this.alertctrl.create({
      header: "Establecer Precio",
      subHeader: "Precio entre "+articulo.price_min+" - "+articulo.price_max,
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
        if(data.price < articulo.price_min || data.price > articulo.price_max){
          this.toast(articulo.price_min, articulo.price_max)
        }else{
          this.restservice.insertarProductos(articulo.id, data.precio, articulo.family_id) 
          this.modalctrl.dismiss(this.productos)
        }
       }
    }]
    });
    await alert.present();
  }

  cancelar(){
    this.modalctrl.dismiss();
  }

  buscar(event){
    const text = event.target.value;

    if(text && text.trim() != '') {
      this.articulos = this.articulos.filter((articulo: any) => {
        return (articulo['description'].toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
    else{
     this.obtenerArticulos();
    }
  }

  async toast(price_min: any, price_max: any) {
    const toast = await this.toastctrl.create({
      message: 'Precio incorrecto. Debe estar entre ' + price_min + ' y ' + price_max + '€',
      duration: 1500
    });
    toast.present();
  }

}
