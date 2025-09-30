import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, Inject, inject, model, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateRecipe } from '../../interfaces/create-recipe';
import { AuthService } from '../../services/auth.service';
import { MsgSnackBarService } from '../../services/msg-snackbar.service';
import { RecipeService } from '../../services/recipe.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-edit-recipe-dialog',
  imports: [
    MatDialogTitle, MatDialogContent, MatDialogActions,
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

  constructor(private dialogRef: MatDialogRef<EditRecipeDialog>,
    @Inject(MAT_DIALOG_DATA) public receita: Recipe

  ) { }
  editRecipeForm!: FormGroup;
  recipe!: Recipe

  ngOnInit(): void {
    this.recipe = this.receita;
    console.log(this.receita)
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

  // INGREDIENTES
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentIngrediente = model('');
  readonly ingredientes = signal(['Açucar']);
  readonly announcer = inject(LiveAnnouncer);

  // INSTRUÇÕES DE PREPARO
  readonly separatorKeysC: number[] = [ENTER, COMMA];
  readonly announcerTwo = inject(LiveAnnouncer);
  readonly currentInstrucao = model('');
  readonly instrucoes = signal(['Levar à geladeira']);


  // INGREDIENTES
  // METHODS
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.ingredientes.update(ingredientes => [...ingredientes, value]);
    }

    // Clear the input value
    this.currentIngrediente.set('');
  }

  remove(fruit: string): void {
    this.ingredientes.update(ingredientes => {
      const index = ingredientes.indexOf(fruit);
      if (index < 0) {
        return ingredientes;
      }

      ingredientes.splice(index, 1);
      this.announcer.announce(`Removed ${fruit}`);
      return [...ingredientes];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ingredientes.update(ingredientes => [...ingredientes, event.option.viewValue]);
    this.currentIngrediente.set('');
    event.option.deselect();
  }

  // INSTRUÇÕES DE PREPARO
  // METHODS
  addInstrucao(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.instrucoes.update(instrucoes => [...instrucoes, value]);
    }

    // Clear the input value
    this.currentInstrucao.set('');
  }

  removeInstrucao(instrucao: string): void {
    this.instrucoes.update(inst => {
      const index = inst.indexOf(instrucao);
      if (index < 0) {
        return inst;
      }

      inst.splice(index, 1);
      this.announcerTwo.announce(`Removed ${instrucao}`);
      return [...inst];
    });
  }

  selectedInstrucao(event: MatAutocompleteSelectedEvent): void {
    this.instrucoes.update(instrucoes => [...instrucoes, event.option.viewValue]);
    this.currentInstrucao.set('');
    event.option.deselect();
  }

  carregarIngredientes() {
    this.ingredientes.set(this.receita.ingredientes);
  }

  carregarIntrucoes(){
    this.instrucoes.set(this.receita.instrucoes);
  }
}

