import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  // showSplash = false;

  constructor() { }

  ngOnInit() {
  }

  goToGraficas() {
    // this.showSplash = true;

    console.log('goToGraficas');
  }

}
