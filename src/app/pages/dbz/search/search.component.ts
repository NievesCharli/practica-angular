import { Component, EventEmitter, Output, output } from "@angular/core";



@Component({


    selector:'dbz-search',
    standalone:true,
    imports:[],
    
    template: `
    <div class="col-12">
    <div class="input-group mb-3">
    <input 
    #txtSearch
    type="text" 
    class="form-control" 
    placeholder="Escribe el nombre del personaje" 
    aria-label="Escribe el nombre del personaje" 
    aria-describedby="button-addon2"
    (keydown.enter)="searchPersonaje(txtSearch.value)"
    >
    <button 
    class="btn btn-outline-secondary" 
    type="button" 
    (click)="searchPersonaje(txtSearch.value)"
    id="button-addon2"
    >
    <i class="bi bi-search"></i>
    </button>
</div>
</div>
    `,
   
    styles:[``]

})
export class SearchComponent{

    @Output() public eventSearch = new EventEmitter<string>();
    searchPersonaje(termino:string|number):void{
        const termSearch = termino.toString().trim();
       // if(termino.toString().length==0){
         //   return;
        //}

        this.eventSearch.emit(termSearch);
        
    }

}