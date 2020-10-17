/** Compoente logico de TS para la página heroe
 * {decodev}
 */

// imports de los modulos necesarios para el funcionamiento correcto del componente
import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
// declaración y exportación del componente HeroeComponent
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();
  nuevo:boolean = true;

  constructor(
    private heroeService: HeroesService,
    private router: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {

    const id = this.router.snapshot.paramMap.get('id');

    if( id !== 'nuevo' ){

      this.nuevo = false;

      this.heroeService.getHeroe( id )
          .subscribe( ( response:HeroeModel ) => {
            this.heroe = response;
            this.heroe.id = id;
          })
    }


  }

  guardar( form:NgForm ) {

    if( form.invalid ){
      console.log("Formulario no valido");
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>

    if( this.heroe.id ){
      peticion = this.heroeService.actualizarHeroe( this.heroe );
    } else {
      peticion = this.heroeService.crearHeroe( this.heroe );
    }

    peticion.subscribe(response => {

      console.log(response);

      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success',
        timer: 2000
      }).then(() => {
          this._router.navigateByUrl('/heroes');
        }
      )
    })
  }


}
