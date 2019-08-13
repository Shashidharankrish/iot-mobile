import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';
 
  pages = [
    {
      title: 'First Page with Tabs',
      url: '/menu/first'
    },
    {
      title: 'Second Page blank',
      url: '/menu/second'
    },    
    {
      title: 'User',
      url: '/menu/userlist'
    },
    {
      title: 'Device',
      url: '/menu/device-list'
    }
  ];

  constructor(
    private router: Router,
    private storage: NativeStorage) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {

  }

  logout(){
    this.storage.remove('token');
    localStorage.removeItem('token');
    localStorage.removeItem('mftoken');
    this.router.navigate(['/welcome']);
  }

}