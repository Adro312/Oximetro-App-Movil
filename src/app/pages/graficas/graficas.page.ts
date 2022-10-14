import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.page.html',
  styleUrls: ['./graficas.page.scss'],
})
export class GraficasPage implements OnInit {

  @ViewChild('barTemp') public barTemp: ElementRef;
  @ViewChild('barOxi') public barOxi: ElementRef;
  @ViewChild('barBpm') public barBpm: ElementRef;
  barChartTemp: any;
  barChartOxi: any;
  barChartBpm: any;
  myChart: any;

  showSplash = false;
  message = '';
  tip = '';

  constructor() { }

  ngOnInit() {
    $('#GraficaTemp').hide();
    $('#GraficaOxi').hide();
    $('#GraficaBpm').hide();
  }

  ionViewWillEnter() {
    // Aqui se mostrara el loader y se ocultara provisionalmente hasta que se haga la peticion a la base de datos
    this.showSplash = true;
    this.message = 'Cargando gráficas...';
    this.tip = 'El hueso más pequeño es el estribo, situado en el oído medio. Es un poco más grande que un grano de arroz.';
    $('#container').hide();
    $('#header').hide();

    // Despues de 5 segundos el loader se ocultara
    setTimeout(() => {
      this.showSplash = false;
      $('#container').show();
      $('#header').show();
    }, 5000);

    this.showTemp();

  }

  graficaTemperatura() {
    const canvas = document.getElementById('barTemp');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    if (this.myChart) {
      this.myChart.destroy();
    }
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Lu','Ma','Mi','Ju','Vi','Sa','Do'],
        datasets: [{
          label: '',
          data: [30, 36, 35, 31, 37, 33, 32],
          backgroundColor: [
            'rgb(0, 172, 200, 0.2)',
            'rgb(149, 214, 0, 0.2)',
            'rgb(179, 79, 197, 0.2)',
            'rgb(255, 131, 0, 0.2)',
            'rgb(71, 96, 115, 0.2)',
            'rgb(189, 187, 188, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            '#00ACC8',
            '#95D600',
            '#B34FC5',
            '#FF8300',
            '#476073',
            '#BDBBBC',
            '#ff6384',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Temperatura',
            font: {
              size: 20,
              weight: 'bold'
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
  }

  graficaOxigeno() {
    const canvas = document.getElementById('barOxi');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    if (this.myChart) {
      this.myChart.destroy();
    }
      this.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Lu','Ma','Mi','Ju','Vi','Sa','Do'],
          datasets: [{
            label: '',
          data: [100, 92, 94, 95, 93, 91, 98],
            backgroundColor: [
              'rgb(0, 172, 200, 0.2)',
              'rgb(149, 214, 0, 0.2)',
              'rgb(179, 79, 197, 0.2)',
              'rgb(255, 131, 0, 0.2)',
              'rgb(71, 96, 115, 0.2)',
              'rgb(189, 187, 188, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              '#00ACC8',
              '#95D600',
              '#B34FC5',
              '#FF8300',
              '#476073',
              '#BDBBBC',
              '#ff6384',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Nivel de Oxígeno',
              font: {
                size: 20,
                weight: 'bold'
              }
            },
            legend: {
              display: false
            }
          }
        }
      });
  }

  graficaBpm() {
    const canvas = document.getElementById('barBpm');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    if (this.myChart) {
      this.myChart.destroy();
    }
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Lu','Ma','Mi','Ju','Vi','Sa','Do'],
        datasets: [{
          label: '',
          data: [70, 84, 92, 60, 110, 79, 100],
          backgroundColor: [
            'rgb(0, 172, 200, 0.2)',
            'rgb(149, 214, 0, 0.2)',
            'rgb(179, 79, 197, 0.2)',
            'rgb(255, 131, 0, 0.2)',
            'rgb(71, 96, 115, 0.2)',
            'rgb(189, 187, 188, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            '#00ACC8',
            '#95D600',
            '#B34FC5',
            '#FF8300',
            '#476073',
            '#BDBBBC',
            '#ff6384',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Ritmo Cardiaco',
            font: {
              size: 20,
              weight: 'bold'
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
  }

  help() {
    Swal.fire({
      title: 'Información',
      text: `
        En esta sección se muestran las gráficas 
        de los datos obtenidos de los sensores.
      `,
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }

  screenShoot() {
    Swal.fire({
      title: 'Screenshot',
      text: `
        Boton para tomar ss, favor de buscar
        una libreria que lo haga :).
      `,
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }

  showTemp() {
    $('#GraficaTemp').show();
    $('#GraficaOxi').hide();
    $('#GraficaBpm').hide();
    this.graficaTemperatura();
  }
  showOxigen() {
    $('#GraficaTemp').hide();
    $('#GraficaOxi').show();
    $('#GraficaBpm').hide();
    this.graficaOxigeno();
  }
  showBpm() {
    $('#GraficaTemp').hide();
    $('#GraficaOxi').hide();
    $('#GraficaBpm').show();
    this.graficaBpm();
  }

}
