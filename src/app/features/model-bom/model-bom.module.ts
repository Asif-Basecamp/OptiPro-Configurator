import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelBOMRoutingModule } from './model-bom-routing.module';
import { ModelBomAddEditComponent } from './model-bom-add-edit/model-bom-add-edit.component';
import { ModelBomViewComponent } from './model-bom-view/model-bom-view.component';


@NgModule({
  declarations: [ModelBomAddEditComponent, ModelBomViewComponent],
  imports: [
    CommonModule,
    ModelBOMRoutingModule
  ],
  entryComponents: [ModelBomViewComponent]
})
export class ModelBOMModule { }
