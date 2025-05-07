import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  constructor(private router: Router) {}

  goTo(route: string) {
    // Añadimos un pequeño retraso para las transiciones suaves (opcional)
    setTimeout(() => {
      this.router.navigate([route]);
    }, 300); // 300ms de retraso para dar una sensación de transición suave
  }
}
