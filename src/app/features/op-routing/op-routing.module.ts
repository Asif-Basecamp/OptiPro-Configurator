import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpRoutingRoutingModule } from './op-routing-routing.module';
import { OpRoutingViewComponent } from './op-routing-view/op-routing-view.component';
import { OpRoutingAddEditComponent } from './op-routing-add-edit/op-routing-add-edit.component';


@NgModule({
  declarations: [OpRoutingViewComponent, OpRoutingAddEditComponent],
  imports: [
    CommonModule,
    OpRoutingRoutingModule
  ],
  entryComponents: [OpRoutingViewComponent, OpRoutingAddEditComponent]
})
export class OpRoutingModule { }
