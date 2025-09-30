import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateRecipe } from '../interfaces/create-recipe';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  readonly apiUrl = 'http://localhost:3000/recipes';
  httpClient = inject(HttpClient);
  authService = inject(AuthService)

  create(recipe: CreateRecipe) {
    return this.httpClient.post<CreateRecipe>(this.apiUrl, recipe);
  }

  getAll(){
    return this.httpClient.get(this.apiUrl)
  }
}
