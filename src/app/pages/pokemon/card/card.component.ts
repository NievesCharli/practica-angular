import { Component, Input, input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Pokemon, Pokemons } from '../interfaces/pokemons';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [NgIf, NgFor,ModalComponent,NgStyle],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges {

  @Input() public pokemonsAll:Pokemons | undefined;
  @ViewChild(ModalComponent) public modal!: ModalComponent;
  imageLoaded: boolean = false;
  selectedPokemon!: Pokemon;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemonsAll']){

      this.imageLoaded = false;
   
    }
  }

  openModal(pokemon:Pokemon): void {

    if(this.modal){

      this.modal.open(pokemon);
    }
  }

  getColorForType(type: string | undefined): string {
    const typeColors: {[key: string]: string} = {
      fire: '#FDDFDF',
      grass: '#DEFDE0',
      electric: '#FCF7DE',
      water: '#DEF3FD',
      ground: '#f4e7da',
      rock: '#d5d5d4',
      fairy: '#fceaff',
      poison: '#98d7a5',
      bug: '#f8d5a3',
      dragon: '#97b3e6',
      psychic: '#eaeda1',
      flying: '#F5F5F5',
      fighting: '#E6E0D4',
      normal: '#F5F5F5',
    };
    if (!type) return 'white';
    return typeColors[type] || 'white';
  }
  getBorderColorForType(type: string | undefined): string {
    const borderColors: { [key: string]: string } = {
      fire: '#f08030',
      grass: '#78c850',
      electric: '#f8d030',
      water: '#6890f0',
      ground: '#e0c068',
      rock: '#b8a038',
      fairy: '#ee99ac',
      poison: '#a040a0',
      bug: '#a8b820',
      dragon: '#7038f8',
      psychic: '#f85888',
      flying: '#a890f0',
      fighting: '#c03028',
      normal: '#a8a878'
    };
    if (!type) return 'black';
    return borderColors[type] || 'black';
  }
  

}
