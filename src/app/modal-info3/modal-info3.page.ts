import { Component, Input, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ModalController } from '@ionic/angular';
import { Product } from '../interfaces/interface'

@Component({
  selector: 'app-modal-info3',
  templateUrl: './modal-info3.page.html',
  styleUrls: ['./modal-info3.page.scss'],
})
export class ModalInfo3Page implements OnInit {

  @Input() titulo: string
  companies: any[]=[];
  prodFil: Product[]=[];
  producto: Product;
  productos: Product[]=[];
  misProductos: Product[]=[];
  target_company_id: number;
  idP: number[] = [];
  idMp: number[] = [];

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
      console.log(this.productos);

      this.productos.forEach(producto => {
        if(!this.idP.includes(producto['article_id'])){
          this.idP.push(producto['article_id'])
        }
      })

      var result = this.idP.filter(id => this.idMp.includes(id));

      console.log(result);

      // this.prodFil = [];

      for(let i = 0; i < this.productos.length; i++) {
        for(let j = 0; j < result.length; j++) {
          if(this.productos[i]['article_id'] == result[j]){
            this.prodFil.push(this.productos[i]);
          }
        }}

      console.log(this.prodFil);

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

  habilitarCant(event){
    this.producto.isChecked = event.currentTarget.checked;

    if(this.producto.isChecked == true){
      // this.cant = 1;
      this.producto.cant = 1;
    }

    console.log(this.producto.isChecked);
  }

  sumarCant(){
    // this.cant++;
    this.producto.cant++;
  }

  restCant(){
    if(this.producto.cant > 1){
      // this.cant--;
      this.producto.cant--;
    }
  }

}
