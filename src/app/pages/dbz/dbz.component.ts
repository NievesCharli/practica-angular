import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Personajes, Item } from './interfaces/dbzs';
import { DbzService } from './services/dbz.service';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-dbz',
  standalone: true,
  imports: [CardComponent, PaginacionComponent, SearchComponent],
  templateUrl: './dbz.component.html',
  styleUrl: './dbz.component.css',
})
export class DbzComponent implements OnInit {
  personajes: Personajes | undefined;
  todosLosPersonajes: Item[] = [];

  constructor(private _srvDbz: DbzService) {}

  ngOnInit(): void {
    this._srvDbz.getPersonajes().subscribe((personajesAll) => {
      personajesAll.items.forEach((personaje) => {
        this._srvDbz.getpersonaje(personaje.id).subscribe((personajeData) => {
          personaje.data = personajeData;
          this._srvDbz.nextURL = personajesAll.links.next;
          this._srvDbz.previousURL = personajesAll.links.previous;
        });
      });
      this.personajes = personajesAll;
      this.cargarTodosLosPersonajes();
   
    });
  }

  setNewPersonajes(personajesNews: Personajes): void {
    this.personajes = personajesNews;
  }
  cargarTodosLosPersonajes(): void {
    this.todosLosPersonajes = [];

    const cargarPagina = (url: string) => {
      this._srvDbz.getPersonajes(url).subscribe((personajesPage) => {
        this.todosLosPersonajes.push(...personajesPage.items);

        if (personajesPage.links.next) {
          cargarPagina(personajesPage.links.next); // llamada recursiva
        } else {
          console.log(
            'Todos los personajes cargados:',
            this.todosLosPersonajes.length
          );
        }
      });
    };

    cargarPagina(this._srvDbz.apiURLBase); // ← usa la URL base
  }

  searchPersonaje(termino: string): void {
    if (!termino) {
      this.ngOnInit();
      return;
    }

    // Si es número, busca por ID en la API
    if (!isNaN(Number(termino))) {
      this._srvDbz.getpersonaje(Number(termino)).subscribe((personajeData) => {
        this.personajes = {
          items: [
            {
              id: personajeData.id,
              name: personajeData.name,
              ki: personajeData.ki,
              maxKi: personajeData.maxKi,
              race: personajeData.race,
              gender: personajeData.gender,
              description: personajeData.description,
              image: personajeData.image,
              affiliation: personajeData.affiliation,
              deletedAt: personajeData.deletedAt,
              data: personajeData,
            },
          ],
          meta: {
            totalItems: 1,
            itemCount: 1,
            itemsPerPage: 1,
            totalPages: 1,
            currentPage: 1,
          },
          links: {
            first: '',
            previous: '',
            next: '',
            last: '',
          },
        };
        this._srvDbz.nextURL = null;
        this._srvDbz.previousURL = null;
      });
    } else {
      // Buscar por nombre (ignora mayúsculas/minúsculas)
      const personajeLocal = this.todosLosPersonajes.find((p) =>
        p.name.toLowerCase().includes(termino.toLowerCase().trim())
      );

      if (personajeLocal) {
        this._srvDbz
          .getpersonaje(personajeLocal.id)
          .subscribe((personajeData) => {
            this.personajes = {
              items: [
                {
                  id: personajeData.id,
                  name: personajeData.name,
                  ki: personajeData.ki,
                  maxKi: personajeData.maxKi,
                  race: personajeData.race,
                  gender: personajeData.gender,
                  description: personajeData.description,
                  image: personajeData.image,
                  affiliation: personajeData.affiliation,
                  deletedAt: personajeData.deletedAt,
                  data: personajeData,
                },
              ],
              meta: {
                totalItems: 1,
                itemCount: 1,
                itemsPerPage: 1,
                totalPages: 1,
                currentPage: 1,
              },
              links: {
                first: '',
                previous: '',
                next: '',
                last: '',
              },
            };
            this._srvDbz.nextURL = null;
            this._srvDbz.previousURL = null;
          });
      } else {
        // Si no se encuentra el personaje
        this.personajes = {
          items: [],
          meta: {
            totalItems: 0,
            itemCount: 0,
            itemsPerPage: 0,
            totalPages: 0,
            currentPage: 1,
          },
          links: {
            first: '',
            previous: '',
            next: '',
            last: '',
          },
        };
      }
    }
  }
}
