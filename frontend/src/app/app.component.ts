import { RouterOutlet } from '@angular/router';
import { BoutiqueComponent } from './boutique/boutique.component';
import { ApiService } from './api.service';

import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { TetiereComponent } from './tetiere/tetiere.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, TetiereComponent],
    providers: [ApiService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'TP6 - CFL';

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
  }
}