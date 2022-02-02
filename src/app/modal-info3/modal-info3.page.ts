import { Component, Input, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ModalController } from '@ionic/angular';
import { Product } from '../interfaces/interface'
import { ModalInfo4Page } from '../modal-info4/modal-info4.page';

@Component({
  selector: 'app-modal-info3',
  templateUrl: './modal-info3.page.html',
  styleUrls: ['./modal-info3.page.scss'],
})
export class ModalInfo3Page implements OnInit {

  @Input() titulo: string
  companies: any[]=[];
  prodFil: Product[]=[];
  productos: Product[]=[];
  misProductos: Product[]=[];
  target_company_id: number;
  idP: number[] = [];
  idMp: number[] = [];
  cant: number;
  pedido:any;
 

  constructor(private restservice: RestService, private modalctrl: ModalController) { }

  ngOnInit() {
    this.cargarCompanies();
    this.obtenerMisProd();
  }

  cargarCompanies(){
    this.restservice.obtenerCompanies().then(data => { 
      this.companies = data['data'];
      this.companies = this.companies.filter(companies =>companies['id'] != this.restservice.company_id);
      // console.log(this.companies);
    })
  }

  cancelar(){
    this.modalctrl.dismiss();
  }

  obtenerProdCompany(event){

    this.target_company_id = event.detail.value;

    this.restservice.obtenerProductosEmpresa(event.detail.value).then(data => {
      this.productos = data['data'];
      // console.log(this.productos);

      this.productos.forEach(producto => {
        if(!this.idP.includes(producto['article_id'])){
          this.idP.push(producto['article_id'])
        }
      })

      var result = this.idP.filter(id => this.idMp.includes(id));

      // console.log(result);

      this.prodFil = [];

      for(let i = 0; i < this.productos.length; i++) {
        for(let j = 0; j < result.length; j++) {
          if(this.productos[i]['article_id'] == result[j]){
            this.prodFil.push(this.productos[i]);
          }
        }}

      // console.log(this.prodFil);

    })

  }

  obtenerMisProd(){
    this.restservice.obtenerProductosEmpresa(this.restservice.company_id).then(data => {
      this.misProductos = data['data'];
      console.log(this.misProductos);

      this.misProductos.forEach(producto => {
        if(!this.idMp.includes(producto['article_id'])){
          this.idMp.push(producto['article_id']);
        }
      })

      
    })
  }

  habilitar(event, producto){
    producto.isChecked = event.currentTarget.checked;

    if(producto.isChecked == true){
      this.cant = 1;
      producto.cant = this.cant;
    }

    // console.log(this.producto.isChecked);
  }

  sumar(producto){
    if(this.cant < 40){
       this.cant++;
       producto.cant = this.cant;
    }
  }

  restar(producto){
    if(this.cant > 1){
      this.cant--;
      producto.cant = this.cant
    }
  }

  fechaActual(){
  
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(month < 10){
      var fecha=`${year}-0${month}-${day}`;
      return fecha;
    }else{
      var fecha=`${year}-${month}-${day}`;
      return fecha;
    }

  }
  async realizarPedido(){
    var prodAndCant = '';
    
    this.prodFil.forEach(producto => {
      if(producto.isChecked){
        prodAndCant += producto['article_id'] + ',' + producto.cant + ',';
      }
    })

    var numPed = Math.round(Math.random() * 1000000);
    var fechaActual =this.fechaActual();
    
    this.pedido = {
        num: numPed,
        issue_data: fechaActual,
        origin_company_id: this.restservice.company_id,
        target_company_id: this.target_company_id
    }

    this.restservice.insertarPedidos(this.pedido, prodAndCant);
    
    const modal = await this.modalctrl.create({
      component: ModalInfo4Page
    });
    await modal.present();
  

  }

 
}
