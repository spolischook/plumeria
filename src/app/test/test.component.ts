import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {share} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  tasks: Task[];
  options = {
    headers: new HttpHeaders(
      {owner: 'serhii'}
    )
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPosts().subscribe((body: Array<Task>) => {
      this.tasks = body;
    });
  }
  //
  getPosts() {
    const result = this.http.get<Array<Task>>(
      'https://api.todo-list.kotoblog.pp.ua/tasks',
      this.options
    ).pipe(share());

    result.subscribe((body) => {
      console.log(body);
    });

    return result;
  }
}

class Task {
  id: string;
  title: string;
  responsible: string;
  dueDate: Date;
  status: Status;
}

enum Status {
  'new',
  'in progress',
  'done'
}
