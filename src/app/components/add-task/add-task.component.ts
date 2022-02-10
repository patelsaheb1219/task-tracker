import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  text?: string;
  day?: string;
  reminder?: boolean = false;
  subscription?: Subscription;
  showAddTask?: boolean;

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService.onToggle().subscribe(val => this.showAddTask = val);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert("Please add a text");
    }

    const newTask = {
      text: this.text!,
      day: this.day!,
      reminder: this.reminder!
    }

    this.onAddTask.emit(newTask);
    // @TODO - emit event
    this.text = "";
    this.day = "";
    this.reminder = false;
  }

}
