import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Personajes } from './interfaces/dbzs';
import { DbzService } from './services/dbz.service';
import { PaginacionComponent } from './paginacion/paginacion.component';

@Component({
  selector: 'app-dbz',
  standalone: true,
  imports: [CardComponent,PaginacionComponent],
  templateUrl: './dbz.component.html',
  styleUrl: './dbz.component.css'
})
export class DbzComponent  implements OnInit{

  personajes: Personajes | undefined;

  constructor(

    private _srvDbz:DbzService


  ) {}

  ngOnInit(): void {
    this._srvDbz.getPersonajes().subscribe((personajesAll) => {
      personajesAll.items.forEach((personaje)=>{

        this._srvDbz.getpersonaje(personaje.id).subscribe((personajeData)=>{
          personajeData = personajeData;
          this._srvDbz.nextURL = personajesAll.links.next;
          this._srvDbz.previousURL = personajesAll.links.previous;
        });
      });
      this.personajes = personajesAll;
     
    });
  }


setNewPersonajes(personajesNews:Personajes):void{
  this.personajes = personajesNews;
}

  }




