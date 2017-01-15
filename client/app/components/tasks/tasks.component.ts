import { Component } from '@angular/core';
import { TaskService } from '../../services/task.services';
import { Task } from '../../../Task';

@Component({
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'tasks.component.html',
})
export class TasksComponent {
    tasks: Task[];
    title: string;

    updateStatus(task: Task) {
        var _task = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone
        }

        this.taskService.updateStatus(_task)
            .subscribe(data => {
                task.isDone = !task.isDone;
            })
    }

    addTask(event: any) {
        event.preventDefault();
        console.log(this.title);
        var newTask = {
            title: this.title,
            isDone: false
        }
        this.taskService.addTask(newTask)
            .subscribe(savedTask => {
                this.tasks.push(savedTask);
                this.title='';
            })

    }
    deleteTask(id: any) {
        var tasks = this.tasks;
        this.taskService.deleteTask(id).subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == id) {
                        tasks.splice(i, 1);
                    }
                }
            }
        });

    }

    constructor(private taskService: TaskService) {
        // this.tasks = [
        //     {
        //         "title": "Walk the dog",
        //         "isDone": false
        //     },
        //     {
        //         "title": "Go to shopping",
        //         "isDone": false
        //     },
        //     {
        //         "title": "Go out for dinner",
        //         "isDone": false
        //     }
        // ]
        this.taskService
            .getTasks()
            .subscribe(tasks => {
                console.log(tasks);
                this.tasks = tasks;
            });
    }
}