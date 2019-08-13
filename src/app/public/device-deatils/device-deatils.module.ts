import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeviceDeatilsPage } from './device-deatils.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceDeatilsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeviceDeatilsPage]
})
export class DeviceDeatilsPageModule {}
