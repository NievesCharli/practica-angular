import { isPlatformBrowser, NgFor, NgIf, NgStyle, TitleCasePipe } from "@angular/common";
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from "@angular/core";
import { Personaje } from "../interfaces/dbzs";


@Component({


    selector: 'dbz-modal',
    standalone: true,
    imports: [NgFor,TitleCasePipe,NgIf,NgStyle],
    templateUrl: './modal.component.html',
    styles:``
})

export class ModalComponent {
    @Input() public personaje: Personaje = {
      id: 0,
      name: '',
      ki: '',
      maxKi: '',
      race: '',
      gender: '',
      description: '',
      image: '',
      affiliation: '',
      deletedAt: null,
      originPlanet: {
        id: 0,
        name: '',
        isDestroyed: false,
        description: '',
        image: '',
        deletedAt: null,
      },
      transformations: []
    };
  
    private bootstrapModal: any;
    @ViewChild('modalElement') public modalElement!: ElementRef;
  
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
    ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.initializeModal();
      }
    }
  
    initializeModal(): void {
      import('bootstrap').then((bootstrap) => {
        this.bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement);
      });
    }
  
    open(personaje: Personaje): void {
      this.personaje = personaje;
  
      if (isPlatformBrowser(this.platformId)) {
        if (this.bootstrapModal) {
          this.bootstrapModal.show();
        } else {
          this.initializeModal();
          setTimeout(() => {
            this.bootstrapModal.show();
          }, 0);
        }
      }
    }
  
    close(): void {
      this.bootstrapModal.hide();
    }
    getColorForRace(race: string): string {
      const raceColors: { [key: string]: string } = {
        'saiyan': 'linear-gradient(135deg, #ff4e50, #f9d423)', // Color de fondo para los Saiyan
        'namekian': '#04c66e', // Color de fondo para los Namekianos
        'human': '#e0eafc', // Color de fondo para los Humanos
        'unknown': '#bdc3c7' // Color de fondo para razas desconocidas
      };
    
      // Asegura que el color para la raza sea válido, utilizando 'unknown' si la raza no está definida
      return raceColors[race?.toLowerCase() || 'unknown'] || '#bdc3c7'; // Valor por defecto
    }
    
  }
  
