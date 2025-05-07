import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { DbzComponent } from './pages/dbz/dbz.component';
import { ErrorComponent } from './pages/error/error.component';
import { RickymortyComponent } from './pages/rickymorty/rickymorty.component';

export const routes: Routes = [
{path:'',redirectTo:'home',pathMatch:'full'},
{path:'home',component:HomeComponent},
{path: 'pokemon', component: PokemonComponent},
{path:'rickymorty', component:RickymortyComponent},
{path: 'dbz', component: DbzComponent},
{path:'miapi',loadChildren:()=>import('./pages/miapi/miapi-routing.module').then(m=>m.MiapiRoutingModule)},
{path:'**', component: ErrorComponent}



];

