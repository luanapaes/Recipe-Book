import { Component, inject, OnInit } from '@angular/core';
import { Recipe } from '../../shared/interfaces/recipe';
import { MatDialog } from '@angular/material/dialog';
import { ViewerReceita } from '../../shared/components/viewer-receita/viewer-receita';
import { CreateRecipeDialog } from '../../shared/components/create-recipe-dialog/create-recipe-dialog';
import { RecipeService } from '../../shared/services/recipe.service';
import { MsgSnackBarService } from '../../shared/services/msg-snackbar.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css'
})
export class Recipes implements OnInit{
  readonly dialog = inject(MatDialog);
  recipeService = inject(RecipeService);
  msgSnackBarService = inject(MsgSnackBarService)
  notificationService = inject(NotificationService);

  recipesList: Recipe[] = [];

  ngOnInit(): void {
    this.getAllRecipes();
    
    this.notificationService.notification$.subscribe((recipe) => {
      const i = this.recipesList.findIndex(r => r.id == recipe.id);

      this.recipesList[i] = {
        ...this.recipesList[i],
        ...recipe
      }
    });
  }

  openViewerReceita(receita: Recipe) {
    const dialogRef = this.dialog.open(ViewerReceita, {
      data: { receita }
    });

    dialogRef.afterClosed().subscribe({
      next: (idRecipe) => {
        const indice = this.recipesList.findIndex(recipe => recipe.id === idRecipe)

        if(indice > -1){
          this.recipesList.splice(indice, 1)
        }
      }
    })
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
