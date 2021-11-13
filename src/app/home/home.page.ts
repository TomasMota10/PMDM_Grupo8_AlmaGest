import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  token: any;
  usuarios: any;

  constructor(public restService: RestService) {
    
  }
  
  ngOninit(){

  }

}
