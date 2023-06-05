import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    LoadingComponent,
    NavbarComponent
  ],
  exports: [
    LoadingComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
