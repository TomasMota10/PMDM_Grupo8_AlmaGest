import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfo2Page } from './modal-info2.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfo2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfo2PageRoutingModule {}
