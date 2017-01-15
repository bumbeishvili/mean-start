import { Component } from '@angular/core';
import {TaskService} from './services/task.services'

@Component({
    moduleId:module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers:[TaskService]
})
export class AppComponent { name = 'Diff' }