import { Subject } from "rxjs";
import { EventEmitter } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model'

export class ShoppingListService{
    constructor(){}
    ingredientsChanged = new Subject<Ingredient[]>();
    editingStarted = new Subject<number>();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ]

      getIngredients(){
        return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice())
      }

      addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients)
        this.ingredientsChanged.next(this.ingredients.slice())
      }
}