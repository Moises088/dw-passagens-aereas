import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './modules/panel/panel.component';
import { AuthComponent } from './modules/auth/auth.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.module').then(
            (module) => module.AuthModule
          ),
      },
    ],
  },
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
