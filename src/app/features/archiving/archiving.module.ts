import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivingRoutingModule } from './archiving-routing.module';
import { ArchivingViewComponent } from './archiving-view/archiving-view.component';


@NgModule({
  declarations: [ArchivingViewComponent],
  imports: [
    CommonModule,
    ArchivingRoutingModule
  ],
  entryComponents: [ArchivingViewComponent]
})
export class ArchivingModule { }
