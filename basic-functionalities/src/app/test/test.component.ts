import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { TestChildComponent } from '../test-child/test-child.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @ViewChild(TestChildComponent, {static: true}) child!: TestChildComponent; 
  @ViewChild('refka', {static: true}) refka!: ElementRef;

  isTrue: boolean = false;
  isBackground: boolean = false;
  name: string = 'Kamil';

  // serviceText: string = this.service.text;

  constructor(public service: AppServiceService, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.refka);
  }

  onClick(): void {
    this.isTrue = !this.isTrue;
  }

  changeBackground(newName: string): void {
    this.isBackground = !this.isBackground;
    this.name = newName;
    console.log(newName);
  }

  APItest(): void {
    this.http.get('/api/test', { responseType: 'text' }).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }
}
