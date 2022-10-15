import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input('alias') dupa: string = '';
  @Output() someFun = new EventEmitter();

  constructor(private testService: TestService) { }

  parentCanReadMe: number = 69;
  parentCanReadFunction(): void {
    console.log('mnie też może przeczytać?');
  }

  

  ngOnInit(): void {
    this.someFun.emit();
    const score: number = this.testService.score;
    console.log(score);
  }

}
