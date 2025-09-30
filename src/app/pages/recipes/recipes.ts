import { Component, inject, OnInit } from '@angular/core';
import { Recipe } from '../../shared/interfaces/recipe';
import { MatDialog } from '@angular/material/dialog';
import { ViewerReceita } from '../../shared/components/viewer-receita/viewer-receita';
import { CreateRecipeDialog } from '../../shared/components/create-recipe-dialog/create-recipe-dialog';
import { RecipeService } from '../../shared/services/recipe.service';

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css'
})
export class Recipes implements OnInit{
  readonly dialog = inject(MatDialog);
  recipeService = inject(RecipeService);

  recipesList: Recipe[] = [];

  ngOnInit(): void {
    this.getAllRecipes()
  }

  openViewerReceita(receita: Recipe) {
    this.dialog.open(ViewerReceita, {
      data: { receita }
    });
  }

  openCreateRecipeDialog(){
    const dialogRef = this.dialog.open(CreateRecipeDialog);

    dialogRef.afterClosed().subscribe({
      next: (recipe) => {
        // adiciona nova receita à lista
        if(recipe){
          this.recipesList.push(recipe);
        }
      }
    })
  }

  getAllRecipes(){
    // pega as receitas do banco e adiciona à lista
    this.recipeService.getAll().subscribe({
      next: (recipes: Recipe[] | any) => {
        recipes.map((r: Recipe) => this.recipesList.push(r));
      }
    })
  }
}
