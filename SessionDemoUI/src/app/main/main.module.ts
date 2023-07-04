import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/home/home.component';
import { RouterModule } from '@angular/router';
import { mainRoutes } from '../main-routing/main-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from '../angular-material/angular-material.module';



@NgModule({
  declarations: [
    HomeComponent
],
exports: [
    HomeComponent,
    RouterModule
],
providers: [
],
imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),
    AngularMaterialModule
],
bootstrap: [],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule { }
