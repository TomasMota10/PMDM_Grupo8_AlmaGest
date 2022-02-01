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
  idP: any[]=[];
  idA: any[]=[];
  familias: any[]=[];

  constructor(private toastctrl: ToastController, private restservice: RestService, private modalctrl: ModalController, private alertctrl: AlertController) { }

  ngOnInit() {
   this.obtenerArticulos();
   this.cargarFamilias();
  }

  obtenerArticulos(){
    this.restservice.obtenerArticulos()
    .then(data => {
      this.prod=data['data']
      
      
      this.productos.forEach(producto => {
        if(!this.idP.includes(producto['article_id'])){
          this.idP.push(producto['article_id'])
        }
      })

      this.prod.forEach(articulo => {
        if(!this.idA.includes(articulo['id'])){
          this.idA.push(articulo['id']);
        }
      })

      var result = this.idA.filter(id => !this.idP.includes(id));
      
      for(let i = 0; i < this.prod.length; i++) {
        for(let j = 0; j < result.length; j++) {
          if(this.prod[i]['id'] == result[j]){
            this.articulos.push(this.prod[i])
          }
        }
      }
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
        data.precio=this.aplicarBenef(articulo,parseFloat(data.precio));
        if(data.precio < articulo.price_min || data.precio > articulo.price_max){
          this.presentToast(articulo.price_min, articulo.price_max)
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

  async presentToast(price_min: any, price_max: any) {
    const toast = await this.toastctrl.create({
      message: 'Precio incorrecto. Debe estar entre ' + price_min + ' y ' + price_max + '€',
      duration: 1500
    });
    toast.present();
  }

  cargarFamilias(){
    this.restservice.obtenerFamilias().then(data => {
      this.familias = data['data'];
      // console.log(this.familias);
    })
  }

  aplicarBenef(articulo: any, precio: number){
    var family = this.familias.find(f => f['id'] == articulo.family_id);
    precio = precio + (precio * (parseInt(family['profit_margin']) / 100));
    return precio;
  }
}
