import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { authGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: '',
    component: AppComponent,
    canActivate: [authGuard],
    children : [
      { path: 'main', component: MainComponent },
    ]
  },
];

@NgModule({
  declarations: [
    // AuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    RouterModule,
    // AuthComponent,
  ],
  providers: [],
  bootstrap: []
})
export class AppRoutingModule { }

export default routes; // Export the routes array
