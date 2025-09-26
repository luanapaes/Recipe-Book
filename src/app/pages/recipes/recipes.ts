import { Component, inject } from '@angular/core';
import { Recipe } from '../../shared/interfaces/recipe';
import { MatDialog } from '@angular/material/dialog';
import { ViewerReceita } from '../../shared/components/viewer-receita/viewer-receita';

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css'
})
export class Recipes {
  readonly dialog = inject(MatDialog);

  recipesList: Recipe[] = [
    {
      id: 1,
      titulo: "Bolo",
      descricao: "Bolo de Chocolate",
      ingredientes: ["300g de Farinha", "4 ovos", "120g de manteiga"],
      instrucoes: ["Fogo médio", "Assar por 35min", "80°"],
      tempo_preparo_min: 30,
      createAt: new Date(2025-9-25),
      userId: 1,
      user: "Luana"
    }, 
    {
      id: 2,
      titulo: "Bolo",
      descricao: "Bolo de Chocolate",
      ingredientes: ["300g de Farinha", "4 ovos", "120g de manteiga"],
      instrucoes: ["Fogo médio", "Assar por 35min", "80°"],
      tempo_preparo_min: 30,
      createAt: new Date(2025-9-25),
      userId: 1,
      user: "Luana"
    }, 
  ];


  openViewerReceita(receita: Recipe) {
    console.log(receita)
    this.dialog.open(ViewerReceita, {
      data: {receita}
    });
  }
}
