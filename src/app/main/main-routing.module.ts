import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { MainComponent } from './main.component';
import { ContentComponent } from './content/content.component';

// guard
import { AuthGuardService } from '../service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
     {
        path: '',
        component: ContentComponent,
      }, {
        path: 'other',
        component: ContentComponent
      }
    ]  
 }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class MainRoutingModule { }
