import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input() user
  


  constructor( private modalCtrl: ModalController, private restService : RestService) { }

  ngOnInit() {
  }

  guardar(){
    this.modalCtrl.dismiss({
      id: this.user.id,
      firstname: this.user.firstname,
      secondname: this.user.secondname,
      company_id: this.user.company_id,
      password: this.user.password,
      email: this.user.email
    })
  }
}
