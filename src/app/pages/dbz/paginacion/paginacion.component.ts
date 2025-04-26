import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { DbzService } from '../services/dbz.service';
import { Personajes } from '../interfaces/dbzs';


@Component({
  selector: 'dbz-paginacion',
  standalone: true,
  imports: [NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {

  @Output() public eventNewPersonajes = new EventEmitter<Personajes>();

constructor(

private _srvDbz: DbzService

){}

get nextURL(): string | null{
  return this._srvDbz.nextURL;
}

get previousURL(): string | null{
  return this._srvDbz.previousURL;
}

loadPersonajes(url:string){
  this._srvDbz.getPersonajes(url).subscribe((personajesAll) => {
    personajesAll.items.forEach((personaje)=>{
      this._srvDbz.getpersonaje(personaje.id).subscribe((personajeData)=>{
        personaje.data = personajeData;
        this._srvDbz.nextURL = personajesAll.links.next;
        this._srvDbz.previousURL = personajesAll.links.previous;
        this.eventNewPersonajes.emit(personajesAll);
      });
    });
  });
}

}
  
