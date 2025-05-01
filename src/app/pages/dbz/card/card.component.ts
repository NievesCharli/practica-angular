import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { NgClass, NgFor, NgIf } from '@angular/common';
import { Item, Personajes } from '../interfaces/dbzs';
import { ModalComponent } from '../modal/modal.component';
import { Personaje } from '../interfaces/dbzs';

@Component({
  selector: 'dbz-card',
  standalone: true,
  imports: [NgIf, NgFor,ModalComponent, NgClass],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  implements OnChanges{



  @Input() public personajesAll: Personajes | undefined;
  @ViewChild(ModalComponent) modal!: ModalComponent;
  imageLoaded: boolean = false;
  SelectedPersonaje!: Personaje;


  ngOnChanges(changes: SimpleChanges): void {
  
    if(changes['personajesAll']){

      this.imageLoaded= false;
 
    }
  }

  openModal(personaje: Personaje): void {
    if (this.modal) {
      this.modal.open(personaje);
    }
  }

  getRaceClass(race: string | undefined): string {
    if (!race) {
      return 'unknown';
    }

    switch (race.toLowerCase()) {
      case 'saiyan':
        return 'saiyan';
      case 'namekian':
        return 'namekian';
      case 'human':
        return 'human';
      default:
        return 'unknown';
    }
  }
}
  

  
  


