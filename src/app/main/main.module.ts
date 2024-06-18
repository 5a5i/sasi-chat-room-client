import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// include material
import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main.component';
import { ContentComponent } from './content/content.component';

import { MainRoutingModule } from './main-routing.module';

import { ChatContentComponent } from './content/chat-content/chat-content.component';
import { ChatListComponent } from './content/chat-list/chat-list.component';

// declare user component here?
@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [MainComponent, ContentComponent, ChatContentComponent, ChatListComponent],
  exports:[
    MainComponent,
  ]
})
export class MainModule { }
