import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() isLoader = false;
  @Input() message: string;
  @Input() tip: string;
  @Input() isLogo = false;
  constructor() {}

  ngOnInit(): void {}
}
