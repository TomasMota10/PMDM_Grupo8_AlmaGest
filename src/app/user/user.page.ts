import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  productos: any;
  limite=50;

  // @ViewChild('lista',{static:true}) lista: IonList;
  
  constructor(private restService : RestService) { }

  ngOnInit() {
  }

  listaProduct(){
    this.restService.obtenerProductosEmpresa()
    .then(producto => {
      this.productos = producto.data;
    })
  }

  borrarProduct(id: number){

  }
}
