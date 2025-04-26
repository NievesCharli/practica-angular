import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { Personajes } from '../interfaces/dbzs';

@Component({
  selector: 'dbz-card',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent  implements OnChanges{



  @Input() public personajesAll: Personajes | undefined;
  imageLoaded: boolean = false;


  ngOnChanges(changes: SimpleChanges): void {
  
    if(changes['personajesAll']){
     //this.personajesAll = changes['personajesAll'].currentValue;
    }
  }
  }

  


