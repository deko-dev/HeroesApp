/** Servicio para realizar las peticiones al Rest API de Firebase
 * {decodev}
 */

// imports de los modulos necesarios para el funcionamiento correcto del Servicio
import { Injectable } from '@angular/core'; // Decorador Injectable
import { HttpClient } from '@angular/common/http'; // Modulo para las peticiones HTTP
import { HeroeModel } from '../models/heroe.model'; // Modelo del Héroe
import { map, delay } from 'rxjs/operators';


// Declacion del decorador @Injectable
@Injectable({
  providedIn: 'root'
})
// declaración y exportación del servicio HeroesService
export class HeroesService {

  // Declaración de la variable privada para el url de Firebase
  private url = "https://crud-angular-firebase-b4866.firebaseio.com"

  // Constructor para la declaracion de la propiedades usadas
  constructor(
    private http: HttpClient // declaracion del Modulo HttpClient
  ) { }

  
  // Método para crear el Héroe( recibe comon parametro un heroe de tipo HeroeModel )
  crearHeroe( heroe: HeroeModel ){
    // Se retorna un HeroeModel con los datos del Heroe
      return this.http.post(`${this.url}/heroes.json`, heroe)
                .pipe(
                  // Se utiliza el método map del rxjs/operators para manipular la respuesta del servidor
                  map( (response:any) => {
                    heroe.id = response.name; // se establece la propieda response.name como el id del héroe
                    return heroe; // se retorna el Heroe que fue creado ( HeroeModel{...} )
                  })
                );
  }


  // Método para actualizar un Heroe, se necesita como Parametro un heroe de tipo HeroeModel
  actualizarHeroe( heroe: HeroeModel ) {
    
    /**Se declara una constante para trabajar los datos del Héroe que se obtiene como parametro
     * se realiza con el fin de no enviar el id como una propiedad mas al Rest API de Firebase
     * */ 
    const heroeTemp = {
      ...heroe
    };

    /*Se elimina por medio de la palabra reservada para los objetos (delete) 
    *  del objeto temporal heroeTemp, la propiedad id 
    */
    delete heroeTemp.id

    // Se retorna el resultado de la petición que seria un Observable
    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);

  }


  getHeroe( idH:string ) {
    return this.http.get(`${ this.url }/heroes/${ idH }.json`);
  }


  borrarHeroe( idH:string ){
    return this.http.delete(`${ this.url }/heroes/${ idH }.json`);
  }

  // Método para obtener todos los Héroes almacenados en nuestra Basde de Datos de Firebase
  getHeroes() {

    // Se retorna el resultado de la petición que seria un Observable
    return this.http.get(`${ this.url }/heroes.json`)
              .pipe( 
                // Se utiliza el método map del rxjs/operators para manipular la respuesta del servidor
                map( this.crearArreglo ),
                delay(1000)
              );
  }

  private crearArreglo( heroesObj: Object ) {

    const heroes: HeroeModel[] = [];

    if( heroesObj === null ) { return []; }

    Object.keys( heroesObj ).forEach( key => {

      const heroe: HeroeModel = heroesObj[key];

      heroe.id = key;

      heroes.push( heroe );

    })
  

    return heroes;
    
  }

}
