import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {

    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if(this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogReg = this.dialog.open(StopTrainingComponent, {data: {
      progress: this.progress
    }});

    dialogReg.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

}
