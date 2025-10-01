import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CreateRecipe } from '../../interfaces/create-recipe';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MsgSnackBarService } from '../../services/msg-snackbar.service';
import { ChipsMaterialService } from '../../services/chips-material.service';

@Component({
  selector: 'app-create-recipe-dialog',
  imports: [
    MatDialogActions, MatFormFieldModule, MatChipsModule,
    MatIconModule, MatAutocompleteModule, FormsModule,
    MatButtonToggleModule, ReactiveFormsModule, MatDialogContent,
    MatButtonModule, MatDialogClose
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-recipe-dialog.html',
  styleUrl: './create-recipe-dialog.css'
})
export class CreateRecipeDialog implements OnInit {
  createRecipeForm!: FormGroup;
  recipeService = inject(RecipeService);
  authService = inject(AuthService);
  sanckBarService = inject(MsgSnackBarService)
  chipsService = inject(ChipsMaterialService)

  constructor(private dialogRef: MatDialogRef<CreateRecipeDialog>) { }

  ngOnInit(): void {
    this.createRecipeForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      ingredientes: new FormControl([''], [Validators.required]),
      instrucoes: new FormControl([''], [Validators.required]),
      tempo_preparo_min: new FormControl(1),
      formato_tempo: new FormControl('min'),
    });
  }

  onSubmit() {
    if (this.createRecipeForm.valid) {
      const newRecipe: CreateRecipe = {
        titulo: this.createRecipeForm.value.titulo,
        descricao: this.createRecipeForm.value.descricao,
        ingredientes: this.ingredientes(),
        instrucoes: this.instrucoes(),
        tempo_preparo_min:
          this.createRecipeForm.value.formato_tempo === 'h' ? this.createRecipeForm.value.tempo_preparo_min * 60 : this.createRecipeForm.value.tempo_preparo_min,
      }

      this.recipeService.create(newRecipe).subscribe({
        next: (recipe) => {
          this.dialogRef.close(recipe)
          this.sanckBarService.openSnackBar("Receita adicionada com sucesso!")
        },
        error: () => {
          this.sanckBarService.openSnackBar("Erro ao adicionar receita, insira todas as informações necessárias.")
        }
      });
    } else {
      this.sanckBarService.openSnackBar("Preencha as informações da receita.")
    }
  }

  // INGREDIENTES
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
}

