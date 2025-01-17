import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { Url } from 'url';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importer MatSnackBar

@Component({
  selector: 'app-compaines',
  standalone: false,
  
  templateUrl: './compaines.component.html',
  styleUrl: './compaines.component.css'
})
export class CompainesComponent {
  companyName: string = 'Exemple Entreprise';
  slogan: string = 'Innovation pour un avenir meilleur';
  mission: string = 'Fournir des solutions technologiques avancées';
  chiffreAffaires: string = '10M €';
  nombreEmployes: number = 150;

  temoignages: string[] = [
    '"Un service exceptionnel et des produits de haute qualité." - Client XYZ',
    '"L\'entreprise offre une réelle valeur ajoutée grâce à ses innovations." - Client ABC',
    '"Des résultats impressionnants grâce à leur expertise." - Client DEF',
  ];

  produitsOuServices: string[] = [
    'Produit ou Service 1',
    'Produit ou Service 2',
    'Produit ou Service 3',
  ];

  caracteristiquesUniques: string[] = [
    'Expertise technique approfondie',
    'Service client exceptionnel',
    'Innovations constantes',
  ];

  domainesExpertise: string[] = [
    'Développement logiciel avancé',
    'Intelligence artificielle et apprentissage automatique',
    'Solutions cloud et SaaS',
  ];

  updateMission(newMission: string): void {
    this.mission = newMission;
  }

  onEditCompany(): void {
    console.log('Édition des informations de l\'entreprise');
  }
}