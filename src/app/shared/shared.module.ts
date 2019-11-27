import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { CustomLayoutModule } from '../@layout/customLayout.module';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { LookupComponent } from './lookup/lookup.component';
import { CustomDialogsComponent } from './custom-dialogs/custom-dialogs.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@NgModule({
  declarations: [
  LookupComponent,
  CustomDialogsComponent],
  imports: [
    FormsModule,
    FlexLayoutModule,
    CommonModule,
    DialogsModule,
    GridModule,
    ExcelModule,    
    CustomLayoutModule,
    NotificationModule,
    DatePickerModule,
    DropDownsModule
  ],
  exports: [
    FormsModule, FlexLayoutModule, NotificationModule, ExcelModule, GridModule, CommonModule, CustomLayoutModule, DialogsModule, DatePickerModule, LookupComponent, CustomDialogsComponent,DropDownsModule
  ],
  providers: [],
  bootstrap: []
})
export class SharedModules { }
