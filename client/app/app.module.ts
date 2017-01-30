import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PieComponent } from './components/pie/pie.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [BrowserModule, HttpModule,FormsModule],
    declarations: [AppComponent, TasksComponent,PieComponent],
    bootstrap: [AppComponent]
})
export class AppModule { 
    
}