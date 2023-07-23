import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LandingComponent } from './components/landing/landing.component';
import { DisplayComponent } from './components/display/display.component';
import { InsertComponent } from './components/insert/insert.component';

const routes: Routes = [
  { path: "auth", component: AuthComponent },
  { path: "landing", component: LandingComponent },
  { path: "display", component: DisplayComponent },
  { path: "insert", component: InsertComponent },
  { path: "", redirectTo: "auth", pathMatch: 'full' },
  { path: "**", redirectTo: "auth" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
