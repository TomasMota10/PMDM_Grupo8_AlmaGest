import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ViewChild } from '@angular/core';
import { IonList, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.page.html',
  styleUrls: ['./administration.page.scss'],
})
export class AdministrationPage implements OnInit {

  usuarios : any

  //Referencia 
  @ViewChild('lista',{static:true}) lista: IonList;

  constructor(private restService : RestService, private route: Router, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    
    if(this.restService.token != undefined){

      this.restService.obtenerUsuarios()
    .then(usuario => {
      this.usuarios = usuario.data;
    });

    }
    else{
      this.route.navigate(['/login']);
    }

  }

  activar(id: number) {
    this.restService.activarUsuario(id);
    this.lista.closeSlidingItems();
  }

  desactivar(id: number) {
    this.restService.desactivarUsuario(id);
    this.lista.closeSlidingItems();
  }

  async editar(user) {
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: {
        user
      }
    });
    await modal.present();
    
    const { data } = await modal.onDidDismiss();
    console.log(data);
    this.restService.editarUsuario(data.id, data.firstname, data.secondname, data.email, data.password, data.company_id);
    this.lista.closeSlidingItems();
  }

  eliminar(id: number) {
    this.restService.eliminarUsuario(id)
    this.lista.closeSlidingItems();
  }

}
