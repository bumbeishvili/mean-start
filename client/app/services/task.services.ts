import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Task } from '../../Task';

@Injectable()
export class TaskService {
    constructor(private http: Http) {
        console.log('Task Service Initialised ...');
    }
    getTasks() {
        return this.http.get('http://localhost:3000/api/tasks')
            .map(res => {
                console.log('got ', res.json());
                return res.json();
            });
    }

    addTask(newTask: Task) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this.http
            .post('/api/task', JSON.stringify(newTask), { headers: headers })
            .map(res => res.json());
    }

    deleteTask(id: any) {
        return this.http
            .delete('/api/tasks/' + id)
            .map(res => res.json());
    }

    updateStatus(task: Task) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this.http
            .put('/api/tasks/'+task._id, JSON.stringify(task), { headers: headers })
            .map(res => res.json());
    }
}