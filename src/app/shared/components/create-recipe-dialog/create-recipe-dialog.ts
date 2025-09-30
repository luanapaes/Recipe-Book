import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent, MatOption } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CreateRecipe } from '../../interfaces/create-recipe';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-recipe-dialog',
  imports: [
    MatDialogActions, MatFormFieldModule, MatChipsModule,
    MatIconModule, MatAutocompleteModule, FormsModule,
    MatButtonToggleModule, ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-recipe-dialog.html',
  styleUrl: './create-recipe-dialog.css'
})
export class CreateRecipeDialog implements OnInit {
  createRecipeForm!: FormGroup;
  recipeService = inject(RecipeService);
  authService = inject(AuthService)

  ngOnInit(): void {
    this.createRecipeForm = new FormGroup({
      titulo: new FormControl(''),
      descricao: new FormControl(''),
      ingredientes: new FormControl(['']),
      instrucoes: new FormControl(['']),
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
          console.log('Receita criada com sucesso:', recipe);
        },
        error: (error) => {
          console.error('Erro ao criar receita:', error);
        }
      });
      console.log("Nova receita criada:", newRecipe);
    }
  }





































  // INGREDIENTES
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentIngrediente = model('');
  readonly ingredientes = signal(['']);
  readonly announcer = inject(LiveAnnouncer);

  // INSTRUÇÕES DE PREPARO
  readonly separatorKeysC: number[] = [ENTER, COMMA];
  readonly announcerTwo = inject(LiveAnnouncer);
  readonly currentInstrucao = model('');
  readonly instrucoes = signal(['']);


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

}

