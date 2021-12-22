import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-listpedidos',
  templateUrl: './listpedidos.component.html',
  styleUrls: ['./listpedidos.component.scss'],
})
export class ListpedidosComponent implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
  
  @Input() pedidos: any[]=[];

  constructor() { }

  ngOnInit() {}

  loadData(event) {

    setTimeout(() => {
      if (this.pedidos.length > 2) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }

      event.target.complete();
     }, 2000);
   }
}
