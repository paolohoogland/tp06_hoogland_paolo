import { Component, Inject } from '@angular/core';
import { CarteService } from '../carte.service';
import { CodeMasquePipe } from '../code-masque.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-affiche-carte',
  standalone: true,
  imports: [CodeMasquePipe, CommonModule], // from parent
  templateUrl: './affiche-carte.component.html',
  styleUrls: ['./affiche-carte.component.css']
})
export class AfficheCarteComponent {
  cartes;

  constructor(private carteService: CarteService) {
    this.cartes = this.carteService.getListeCarte();
  }

  deleteCarte(id: number) {
    this.carteService.deleteCarte(id);
  }
}
