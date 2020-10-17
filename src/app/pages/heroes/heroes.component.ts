import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {


  heroes: HeroeModel[] = [];
  cargando = false;


  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
     
    this.cargando = true;

    this.heroesService.getHeroes()
        .subscribe( response => {
          this.heroes = response 
          this.cargando = false;
        });
  }


  borrarHeroe( heroe: HeroeModel, i:number ){

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ heroe.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then( response => {

      if( response.value ){
        
        this.heroes.splice(i, 1);

        this.heroesService.borrarHeroe( heroe.id )
            .subscribe();
        
        Swal.fire({
          title: heroe.nombre,
          text: 'Héroe borrado correctamente!!',
          icon: 'success',
          timer: 1500
        })
      }

    })
  }

}