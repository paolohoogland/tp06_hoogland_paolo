import { Component } from '@angular/core';
import { FormulaireCarteComponent } from "../formulaire-carte/formulaire-carte.component";
import { AfficheCarteComponent } from '../affiche-carte/affiche-carte.component';

@Component({
  selector: 'app-cartes',
  imports: [FormulaireCarteComponent, AfficheCarteComponent],
  templateUrl: './cartes.component.html',
  styleUrl: './cartes.component.css'
})
export class CartesComponent {

}
