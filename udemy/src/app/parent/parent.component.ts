import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})

export class ParentComponent implements OnInit {
  eventTest!: string;
  eventTest2!: string;

  @ViewChild('inputRef', {static: true}) inputRef!: ElementRef;
  @ViewChild(ChildComponent, {static: true}) child!: ChildComponent; 

  constructor() { }

  ngOnInit(): void {
    interval(1000).subscribe((count) => {
      console.log(count);
    });
  }

  respondToClick(): void{
    console.log(this.inputRef.nativeElement.value);
  }

  inputFunction($event: Event): void {
    this.eventTest = (<HTMLInputElement>$event.target).value;
    this.eventTest2 = ($event.target as HTMLInputElement).value;
    console.log(this.eventTest);
    console.log(this.eventTest2);
  }
}
