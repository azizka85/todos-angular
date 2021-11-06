import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { TODOS_STORAGE } from './services/todos-storage';
import { TodosLocalStorageService } from './services/todos-local-storage/todos-local-storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: TODOS_STORAGE, useClass: TodosLocalStorageService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
