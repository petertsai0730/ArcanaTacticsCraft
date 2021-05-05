import { Component, OnInit } from '@angular/core';
import { DevelopService } from 'src/app/_services/develop.service';

@Component({
  selector: 'app-develop',
  templateUrl: './develop.component.html',
  styleUrls: ['./develop.component.scss']
})
export class DevelopComponent implements OnInit {
  constructor(private developService: DevelopService) {}

  ngOnInit() {}

  importHeroes() {
    // this.developService.importHeroesToDB().subscribe((res) => console.log(res));
  }

  getHeroes() {
    this.developService.getHeroes().subscribe((res) => {
      console.log(res);
    });
  }
}
