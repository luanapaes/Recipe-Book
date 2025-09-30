import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateRecipe } from '../interfaces/create-recipe';
import { AuthService } from './auth.service';
import { Recipe } from '../interfaces/recipe';

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
    return this.httpClient.get<Recipe[]>(this.apiUrl)
  }

  delete(id: number){
    return this.httpClient.delete<Recipe>(`${this.apiUrl}/${id}`);
  }

  edit(id: number, recipe: CreateRecipe){
    return this.httpClient.patch<Recipe>(`${this.apiUrl}/${id}`, recipe);
  }
}
