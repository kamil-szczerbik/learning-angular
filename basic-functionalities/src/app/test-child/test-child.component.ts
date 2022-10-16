import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.css']
})
export class TestChildComponent implements OnInit {
  @Input() name: string = '';
  @Output() changeBackground = new EventEmitter<string>();

  text: string = 'Parent ma do mnie dostęp';

  constructor() { }

  ngOnInit(): void {
  }

  onClick(newName: string): void {
    this.changeBackground.emit(newName);
  }
}
