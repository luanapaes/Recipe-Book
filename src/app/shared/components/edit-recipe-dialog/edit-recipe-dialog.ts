import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, Inject, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateRecipe } from '../../interfaces/create-recipe';
import { AuthService } from '../../services/auth.service';
import { MsgSnackBarService } from '../../services/msg-snackbar.service';
import { RecipeService } from '../../services/recipe.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Recipe } from '../../interfaces/recipe';
import { ChipsMaterialService } from '../../services/chips-material.service';

@Component({
  selector: 'app-edit-recipe-dialog',
  imports: [
    MatDialogContent, MatDialogActions,
    MatDialogClose, MatButtonModule, MatButtonToggleModule,
    MatIconModule, MatAutocompleteModule, ReactiveFormsModule,
    MatFormFieldModule, MatChipsModule
  ],
  templateUrl: './edit-recipe-dialog.html',
  styleUrl: './edit-recipe-dialog.css'
})
export class EditRecipeDialog {
  recipeService = inject(RecipeService);
  authService = inject(AuthService);
  sanckBarService = inject(MsgSnackBarService)
  chipsService = inject(ChipsMaterialService)

  constructor(private dialogRef: MatDialogRef<EditRecipeDialog>,
    @Inject(MAT_DIALOG_DATA) public receita: Recipe

  ) { }
  editRecipeForm!: FormGroup;
  recipe!: Recipe

  ngOnInit(): void {
    this.recipe = this.receita;
    this.editRecipeForm = new FormGroup({
      titulo: new FormControl(this.receita.titulo, [Validators.required]),
      descricao: new FormControl(this.receita.descricao, [Validators.required]),
      ingredientes: new FormControl([this.receita.ingredientes], [Validators.required]),
      instrucoes: new FormControl([this.receita.instrucoes], [Validators.required]),
      tempo_preparo_min: new FormControl(this.receita.tempo_preparo_min ? this.receita.tempo_preparo_min : 1),
      formato_tempo: new FormControl('min'),
    });

    this.carregarIngredientes()
    this.carregarIntrucoes()
  }

  onEdit() {
    if (this.editRecipeForm.valid) {
      const editRecipe: CreateRecipe = {
        titulo: this.editRecipeForm.value.titulo,
        descricao: this.editRecipeForm.value.descricao,
        ingredientes: this.ingredientes(),
        instrucoes: this.instrucoes(),
        tempo_preparo_min:
          this.editRecipeForm.value.formato_tempo === 'h' ? this.editRecipeForm.value.tempo_preparo_min * 60 : this.editRecipeForm.value.tempo_preparo_min,
      }

      this.recipeService.edit(this.recipe.id, editRecipe).subscribe({
        next: (recipe) => {
          this.dialogRef.close(recipe)
          this.sanckBarService.openSnackBar("Receita editada com sucesso!")
        },
        error: () => {
          this.sanckBarService.openSnackBar("Erro ao editar receita, insira todas as informações necessárias.")
        }
      });
    } else {
      this.sanckBarService.openSnackBar("Preencha as informações da receita.")
    }
  }

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly separatorKeysC: number[] = [ENTER, COMMA];
  currentIngrediente = signal('');
  currentInstrucao = signal('');

  ingredientes = this.chipsService.chips;
  instrucoes = signal<string[]>([]);

  // METHODS - INGREDIENTES
  add(event: MatChipInputEvent): void {
    this.chipsService.add(event, this.currentIngrediente);
  }

  remove(ingrediente: string): void {
    this.chipsService.remove(ingrediente);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chipsService.selected(event);
  }

  // METHODS - INSTRUÇÕES DE PREPARO
  addInstrucao(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.instrucoes.update(instrs => [...instrs, value]);
    }
    this.currentInstrucao.set('');
  }

  removeInstrucao(instrucao: string): void {
    this.instrucoes.update(instrs => instrs.filter(i => i !== instrucao));
  }

  selectedInstrucao(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (value) {
      this.instrucoes.update(instrs => [...instrs, value]);
    }
    this.currentInstrucao.set('');
    event.option.deselect();
  }

  //carrega os ingredientes/instruções do objeto
  carregarIngredientes() {
    this.chipsService.chips.set(this.receita.ingredientes);
  }

  carregarIntrucoes() {
    this.instrucoes.set(this.receita.instrucoes);
  }
}

