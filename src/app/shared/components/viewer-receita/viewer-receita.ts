import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { MsgSnackBarService } from '../../services/msg-snackbar.service';
@Component({
  selector: 'app-viewer-receita',
  imports: [MatDialogActions, MatDialogClose, MatButtonModule, MatDialogContent
  ],
  templateUrl: './viewer-receita.html',
  styleUrl: './viewer-receita.css'
})
export class ViewerReceita implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { receita: Recipe },
    private dialogRef: MatDialogRef<ViewerReceita>
  ) { }

  receita!: Recipe;
  recipeService = inject(RecipeService)
  msgSnackBar = inject(MsgSnackBarService)

  ngOnInit(): void {
    this.receita = this.data.receita
  }

  delete(id: number){
    return this.recipeService.delete(id).subscribe({
      next: () => {
        this.dialogRef.close(id)
        this.msgSnackBar.openSnackBar("Receita deletada com sucesso!")
      }
    })
  }
}
