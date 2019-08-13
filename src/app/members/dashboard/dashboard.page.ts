import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, RouterEvent } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  selectedPath = '';
 
  pages = [
    {
      title: 'First Page with Tabs',
      url: '/menu/first'
    },
    {
      title: 'Second Page blank',
      url: '/menu/second'
    }
  ];

  constructor(
    private router: Router,
    private deviceService: DeviceService
    ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }
  ngOnInit() {
  }

  logout(){
    //this.authService.logout();
  }

}
