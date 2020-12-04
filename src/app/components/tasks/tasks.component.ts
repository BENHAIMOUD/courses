import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../services/course.service';
import {Task} from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  searchText = '';

  formEdit = false;
  showForm = false;


  MyTask: Task = {
    label: '',
    completed : false
  };
  tasks: Task[] = [];
  resultTasks: Task[] = [];
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getTesks();
  }

  getTesks(): any {
    this.courseService.findAll()
      .subscribe(tasks =>
         this.resultTasks = this.tasks = tasks );
  }

  deleteTask(id): any{
    this.courseService.deleteTask(id)
      .subscribe(() => {
       this.tasks = this.tasks.filter((task) => task.id !== id );
      });
  }

  persistTask(): any {
    this.courseService.persist(this.MyTask)
      .subscribe( task => {
        this.tasks = [task, ...this.tasks];
      });
    this.formEmpty();
    this.showForm = false;
  }
  toggleCompleted(task: Task): any {
    this.courseService.completed(task.id, task.completed)
      .subscribe(() => {
        task.completed = !task.completed;
      });
  }

  editTask(task): any {
    this.MyTask = task;
    this.formEdit = true;
  }

  updateTask(): any{
    this.courseService.editTask(this.MyTask)
      .subscribe((task) => {
        this.formEmpty();
        this.formEdit = false;
        this.showForm = false;
      });
  }

  searchTasks(): any{
    this.resultTasks = this.tasks.filter(task => task.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  formEmpty(): any {
     this.MyTask = {
       label: '',
       completed: false
     };
  }
}
