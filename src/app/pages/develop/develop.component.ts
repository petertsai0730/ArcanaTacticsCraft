import { Component, OnInit } from '@angular/core';
import { DevelopService } from 'src/app/_services/develop.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-develop',
  templateUrl: './develop.component.html',
  styleUrls: ['./develop.component.scss']
})
export class DevelopComponent implements OnInit {
  img = '';

  constructor(private developService: DevelopService) {}

  ngOnInit() {
    this.getHeroImage();
  }

  importHeroes() {
    // this.developService.importHeroesToDB().subscribe((res) => console.log(res));
  }

  getHeroes() {
    this.developService.getHeroes().subscribe((res) => {
      console.log(res);
    });
  }

  getHeroImage() {
    this.developService
      .getHeroImage(Md5.hashStr('Wizard').toString())
      .subscribe((res) => {
        this.img = res;
        console.log(res);
      });
  }
}
