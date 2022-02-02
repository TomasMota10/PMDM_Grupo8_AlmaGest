import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfo4Page } from './modal-info4.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfo4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfo4PageRoutingModule {}
