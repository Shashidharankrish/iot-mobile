import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
 
const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'first',
        loadChildren: '../first-with-tabs/first-with-tabs.module#FirstWithTabsPageModule'
      },
      {
        path: 'second',
        loadChildren: '../second/second.module#SecondPageModule'
      },
      {
        path: 'second/details',
        loadChildren: '../details/details.module#DetailsPageModule'
      },
      {
        path: 'device',
        loadChildren: '../device/device.module#DevicePageModule'
      },
      {
        path: 'device/:deviceid',
        loadChildren: '../device-deatils/device-deatils.module#DeviceDeatilsPageModule'
      },
      {
        path: 'device-list', 
        loadChildren: '../device-list/device-list.module#DeviceListPageModule' 
      },
      { 
        path: 'userlist', 
        loadChildren: '../userlist/userlist.module#UserlistPageModule' 
      },
      { 
        path: 'user', 
        loadChildren: '../user/user.module#UserPageModule' 
      },
      { path: 
        'userdetail/:userid', 
        loadChildren: '../userdetail/userdetail.module#UserdetailPageModule' 
      },
      { path: 
        'useredit/:userid', 
        loadChildren: '../user/useredit/useredit.module#UsereditPageModule' 
      },
      { 
        path: 'devicetype', 
        loadChildren: '../device/devicetype/devicetype.module#DevicetypePageModule' 
      },
      { 
        path: 'assigndevice', 
        loadChildren: '../user/assigndevice/assigndevice.module#AssigndevicePageModule' 
      }
    ]
  }
];
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }