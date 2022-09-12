import { AfterViewInit, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  showSplash = true;
  isLogo = true;
  constructor(
    private platform: Platform
  ) {
    this.initializeApp();
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  initializeApp(): void {
    void this.platform.ready().then(() => {
      timer(3000).subscribe(() => (this.showSplash = false, this.isLogo = false));
    });
  }
}
