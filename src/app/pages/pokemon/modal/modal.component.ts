import { isPlatformBrowser, NgFor, NgIf, NgStyle, TitleCasePipe } from "@angular/common";
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from "@angular/core";
import { Pokemon } from "../interfaces/pokemons";


@Component({


    selector: 'pokemon-modal',
    standalone: true,
    imports: [NgFor,TitleCasePipe,NgIf,NgStyle],
    templateUrl: './modal.component.html',
    styles:``
})
export class ModalComponent{

    @Input() public pokemon: Pokemon = {

        name: '',
        height: 0,
        weight: 0,
        sprites: {
            front_default: ''
        },
    } as Pokemon;

    private bootstrapModal :any;
    @ViewChild('modalElement') public modalElement!: ElementRef;
    constructor(@Inject (PLATFORM_ID)private platformId: Object){}

    ngAfterViewInit(): void {
    if(isPlatformBrowser(this.platformId)){

        this.initializeModal();
    }
    }

    initializeModal(): void{

        import('bootstrap').then((bootstrap)=>{

            this.bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement)
        })
    }


    open(pokemon: Pokemon):void{

        this.pokemon = pokemon;
        if(isPlatformBrowser(this.platformId)){
            if(this.bootstrapModal){
                this.bootstrapModal.show();
            }else{

                this.initializeModal();
                setTimeout(() => {

                    this.bootstrapModal.show();

                    
                    
                }, 0);
            }
            

            

        }
    }
    close(): void{

        this.bootstrapModal.hide();
    }

    getColorForType(): string {
        const typeColors: { [key: string]: string } = {
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
        const typeName = this.pokemon.types?.[0]?.type?.name;
        if (!typeName) return 'white';
        return typeColors[typeName] || 'white';
    }
    

}