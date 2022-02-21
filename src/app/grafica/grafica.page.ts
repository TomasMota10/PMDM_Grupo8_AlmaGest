import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.page.html',
  styleUrls: ['./grafica.page.scss'],
})
export class GraficaPage implements OnInit {

  prodE: any;
  pedidos: any[];
  numPedido: number[] = [];
  meses: number = 6;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.prodE = this.restService.prodE;

    this.restService.obtenerDatosPedidoEmpresa().then(data => {
      this.pedidos = data['data'];
      console.log(this.pedidos);

      for(let i = 0; i < this.meses; i++){
        this.obtenerPedidosMes(i, 1);
      }

      this.barChartData = [
        {data: [this.numPedido[5], this.numPedido[4], this.numPedido[3],this.numPedido[2], this.numPedido[1], this.numPedido[0]], label: 'Cantidad'},
      ];
    })
  }

  productos(event){

    this.restService.obtenerDatosPedidoEmpresa().then(data => {
      this.pedidos = data['data'];

      for(let i = 0; i < this.meses; i++){
        this.obtenerPedidosMes(i, event.detail.value);
      }

      console.log(event.detail.value);

      this.barChartData = [
        {data: [this.numPedido[5], this.numPedido[4], this.numPedido[3],this.numPedido[2], this.numPedido[1], this.numPedido[0]], label: 'Cantidad'},
      ];

      console.log(this.numPedido);
      
    })
  }

  obtenerPedidosMes(mes: number, id: number){

    this.numPedido[mes] = 0;

    var inicioM = new Date(new Date().getFullYear(), new Date().getMonth() - mes ,1);
    var finM = new Date(new Date().getFullYear(), new Date().getMonth() - mes + 1, 0);

    this.pedidos.filter(pedido => {
        pedido.order_lines.filter(order_line => {
          if(new Date(order_line.issue_date) > inicioM && new Date(order_line.issue_date) < finM){
            order_line.articles_line.forEach(article => {
              if(article.article_id == id){
                console.log(article);
                this.numPedido[mes] += article.num_articles;
              }
            })
          }
        })
    })
    
    // console.log(this.vecesComprado);

  }

}
