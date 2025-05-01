import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personaje, Personajes } from '../interfaces/dbzs';

@Injectable({
  providedIn: 'root'
})
export class DbzService {

  public apiURLBase: string = 'https://dragonball-api.com/api/characters/';
  private next:string | null = null;
  private previous:string | null = null;

  constructor(

    private http: HttpClient
  ) { }


  getPersonajes(url:string = this.apiURLBase): Observable<Personajes>{

    return this.http.get<Personajes>(url);
  }

  getpersonaje(termino: string | number): Observable<Personaje>{

    return this.http.get<Personaje>(`${this.apiURLBase}${termino}`);
  }
 
  


  set nextURL(url:string | null){
    this.next = url;
  
  }

  set previousURL(url:string | null){
    this.previous = url;
  }
  get nextURL():string | null{
    return this.next;
  }
  get previousURL():string | null{
    return this.previous;
  }


}
