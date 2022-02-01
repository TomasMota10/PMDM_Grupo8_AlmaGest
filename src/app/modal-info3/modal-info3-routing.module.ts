import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfo3Page } from './modal-info3.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfo3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfo3PageRoutingModule {}
