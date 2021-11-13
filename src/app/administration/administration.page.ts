import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ViewChild } from '@angular/core';
import { IonList, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.page.html',
  styleUrls: ['./administration.page.scss'],
})
export class AdministrationPage implements OnInit {

  usuarios : any

  //Referencia 
  @ViewChild('lista',{static:true}) lista: IonList;
  
  constructor(private restService : RestService, private route: Router, private modalCtrl: ModalController, private alertCtrl: AlertController) {

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
    this.ngOnInit();
    this.ngOnInit();
  }

  desactivar(id: number) {
    this.restService.desactivarUsuario(id);
    this.lista.closeSlidingItems();
    this.ngOnInit();
    this.ngOnInit();
  }

  async editar(user) {
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: {
        user
      }
    });
    await modal.present();
    
    const{data} = await modal.onDidDismiss();

    this.restService.editarUsuario(data.id, data.firstname, data.secondname, data.email, data.password, data.company_id);
    this.lista.closeSlidingItems();
    
  }

  async eliminar(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Delete User',
      message: '¿Estas seguro de eliminar al usuario?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',	
          cssClass: 'secondary',
          handler: () => {}
       },
       {
         text: 'OK',
         handler: () => {
          this.restService.eliminarUsuario(id)
          this.ngOnInit();
          this.ngOnInit();
         }
      }

      ]
    });

    await alert.present();

    this.lista.closeSlidingItems();
    
  }

}
