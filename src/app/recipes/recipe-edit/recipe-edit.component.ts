import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.id = params.id;
      this.editMode = params.id != null;
      this.initForm();
    })
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIgredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipeImagePath = recipe.imagePath
      recipeDescription = recipe.description
      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients){
          recipeIgredients.push( 
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIgredients
    })
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'amount': new FormControl(1, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onSubmit(){
    // console.log(this.recipeForm.value);
    let { name, description, imagePath, ingredients } = this.recipeForm.value;
    const newRecipe = new Recipe(name, description, imagePath, ingredients)
    if(this.editMode){
      this.recipeService.updateRecipe( this.id, newRecipe)
    }
    else{
      this.recipeService.addRecipe(newRecipe)
    }
    this.onCancel()
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
