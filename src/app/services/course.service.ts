import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  appUrl = 'http://localhost:5000/tasks';
  constructor(private http: HttpClient) { }

  findAll(): any {
    return this.http.get<Task[]>(this.appUrl);
   }

   deleteTask(id): any {
    return this.http.delete(`${this.appUrl}/${id}`);
  }

  persist(task: Task): any {
    return this.http.post(this.appUrl, task);
  }

  editTask(task: Task): any {
    return this.http.put(`${this.appUrl}/${task.id}`, task);
  }

  completed(id, completed): any {
    return this.http.patch(`${this.appUrl}/${id}`, {completed: !completed});
  }




}
