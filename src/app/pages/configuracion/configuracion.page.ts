import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage {

  constructor() {}

  editarNombre() {
    Swal.fire({
      title: 'Editar Usuario',
      input: 'text',
      inputPlaceholder: 'Ingresa tu nombre de usuario',
      icon: 'warning',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }
  ajustarHora() {
    Swal.fire({
      title: 'Ajustar Hora',
      input: 'text',
      inputPlaceholder: '00 - 23',
      icon: 'question',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }
  privacidad() {
    Swal.fire({
      title: 'Politica de Privacidad',
      text: 'Tus datos son privados y no serán compartidos con nadie.',
      icon: 'success',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }
  trabajaNosotros() {
    Swal.fire({
      title: 'Trabaja con Nosotros',
      text: 'Si quieres trabajar con nosotros, envíanos un correo a: [deinev@gmail.com]',
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    });
  }
  borrarDatos() {
    Swal.fire({
      title: 'Borrar Datos',
      text: '¿Estás seguro de que quieres borrar tus datos?',
      showDenyButton: true,
      confirmButtonText: `Borrar`,
      denyButtonText: `Cancelar`,
      icon: 'info',
      confirmButtonColor: '#2dd36f',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Borrado',
          text: 'Tus datos han sido borrados',
          icon: 'success',
          confirmButtonColor: '#2dd36f',
          heightAuto: false
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Operación cancelada',
          text: 'Tus datos no han sido borrados',
          icon: 'error',
          confirmButtonColor: '#2dd36f',
          heightAuto: false
        });
      }
    });
  }

}
