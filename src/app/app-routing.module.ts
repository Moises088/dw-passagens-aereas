import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './modules/panel/panel.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/panel/panel.module').then(
            (module) => module.PanelModule
          ),
      },
    ],
  },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
