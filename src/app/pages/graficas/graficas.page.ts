import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.page.html',
  styleUrls: ['./graficas.page.scss'],
})
export class GraficasPage implements OnInit {

  @ViewChild('barCanvas') public barCanvas: ElementRef;
  barChart: any;

  constructor() { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.barChartMethod();
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',
      // data: {
      //   labels: ['Lu','Ma','Mi','Ju','Vi','Sa','Do'],
      //   datasets: [{
      //     barPercentage: 0.8,
      //     barThickness: 'flex',
      //     label: 'Temperatura',
      //     stack: 'Base',
      //     backgroundColor: '#00ACC8',
      //     data: [36, 35, 32, 37, 38, 39, 40],
      //   },
        // {
          // barPercentage: 0.8,
          // barThickness: 'flex',
          // label: 'Type 2',
          // stack: 'Sensitivity',
          // backgroundColor: '#2a93ce',
          // data: [5, 20,38,20,30],
        // }
      // ]
      // },
      data: {
        // labels: ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'],
        labels: ['Lu','Ma','Mi','Ju','Vi','Sa','Do'],
        datasets: [{
          label: 'Temperatura',
          data: [0, 36, 35, 32, 37, 38, 39, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
              beginAtZero: true
          }
        }
      }
    });
  }

}
