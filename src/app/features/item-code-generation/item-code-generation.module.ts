import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemCodeGenerationRoutingModule } from './item-code-generation-routing.module';
import { ItemCgViewComponent } from './item-cg-view/item-cg-view.component';
import { ItemCgAddEditComponent } from './item-cg-add-edit/item-cg-add-edit.component';


@NgModule({
  declarations: [ItemCgViewComponent, ItemCgAddEditComponent],
  imports: [
    CommonModule,
    ItemCodeGenerationRoutingModule
  ],
  entryComponents: [ItemCgViewComponent]
})
export class ItemCodeGenerationModule { }
