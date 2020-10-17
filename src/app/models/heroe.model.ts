/** Modelo para el Héroe
 * En esta clase o modelo, se crea un modelo de datos para los objetos,
 * que seran usados en toda la aplicación
 */

//  Se crea y exporta la clase HeroeModel()
export class HeroeModel {

    // Se crean los atributos que contiene el Modelo/Héroe
    id: string;
    nombre: string; 
    poder: string;
    vivo: boolean;

    /*Se crea el constructor de la clase y se inicializa la propiedad
    * vivo por defecto en false
    */ 
    constructor(){
        this.vivo = true;
    }


}