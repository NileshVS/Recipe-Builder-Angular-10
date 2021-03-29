import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component'


import { RecipiesModule } from './recipes/recipes.module'
import { RecipesRoutingModule } from './recipes/recipes-routing.module'

import {ShoppingListModule} from'./shopping-list/shopping-list.module'
import { SharedModule } from './shared/shared.module';

import {CoreModule } from './core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipiesModule,
    RecipesRoutingModule,
    ShoppingListModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
