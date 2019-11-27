import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonData, ColumnSetting } from 'src/app/core/data/CommonData';
import { RoutingService } from 'src/app/core/service/routing.service';
import { CommonService } from 'src/app/core/service/common.service';
import { Router } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit {
  @Input() serviceData: any;
  @Input() lookupfor: any;
  @Input() selectedImage: any
  @Output() lookupvalue = new EventEmitter();

  public commonData = new CommonData();
  language = JSON.parse(sessionStorage.getItem('current_lang'));
  popup_title = '';

  public dialogOpened = false;
  public isDraggable: boolean = true;
  public current_popup_row: any = "";
  public is_operation_popup_lookup_open: boolean = false;
  public resourceServiceData: any = [];
  public popup_resource: boolean = false;
  public skip: number = 0;
  public popup_lookupfor = "";
  public showLookupLoader: boolean = false;
  public showLoader: boolean = false;
  public LookupDataLoaded: boolean = false;
  public RuleOutputLookupDataLoaded: boolean = false;
  public showruleOutputLoader: boolean = false;
  public lookup_key = "";
  public item_code_columns;
  public model_template_item_columns;
  public fill_input_id = '';
  public preview_image = "";
  public dataBind: any = [];
  public outputServiceData: any = [];
  public resource_counter = 0;
  public about_info = [];
  public search_string = "";
  public table_head: ColumnSetting[] = [];
  public table_head_hidden_elements = [];
  public width_value = '100%';
  public allowUnsort = true;
  public sort: SortDescriptor[];
  public gridView: GridDataResult;

  constructor(private rs: RoutingService, private CommonService: CommonService, private router: Router) { }

  ngOnInit() {
  }

  async ngOnChanges(): Promise<void> {
    this.popup_lookupfor = this.lookupfor;
    this.showLoader = true;
    this.LookupDataLoaded = false;
    this.showruleOutputLoader = true;
    this.RuleOutputLookupDataLoaded = false;
    this.lookup_key = '';
    this.item_code_columns = [];
    this.model_template_item_columns = [];
    this.fill_input_id = '';
    this.preview_image = '';
    this.dataBind = [];
    this.outputServiceData = [];
    this.skip = 0;
    this.resource_counter = 0;
    this.dialogOpened = false;
    this.about_info = [];

    this.current_popup_row = "";
    //this.test_model();
    //    console.log("this.lookupfor " + this.popup_lookupfor);
    this.search_string = "";
    // if (this.popup_lookupfor == "output_invoice_print") {
    //   await this.sleep(400);
    // }

    // if (this.popup_lookupfor != "") {
    //   if (this.popup_lookupfor == "model_template") {
    //     this.model_template_lookup();
    //     return;
    //   }
    //   if (this.popup_lookupfor == "model_item_generation") {
    //     this.model_item_generation_lookup();
    //     return;
    //   }

    //   if (this.popup_lookupfor == "feature_lookup") {
    //     this.get_features_lookup();
    //     return;
    //   }

    //   if (this.popup_lookupfor == "feature_Detail_lookup") {
    //     this.get_features_lookup();
    //     return;
    //   }

    //   if (this.popup_lookupfor == "Item_Detail_lookup") {
    //     this.get_Item_lookup();
    //     return;
    //   }

    //   // open poup for import 
    //   if (this.popup_lookupfor == "import_popup") {
    //     this.import_popup();
    //     return;
    //   }

    //   if (this.popup_lookupfor == "ModelBom_lookup" || this.popup_lookupfor == "ModelBom_Detail_lookup") {
    //     this.get_Model_lookup();
    //     return;
    //   }

    //   if (this.popup_lookupfor == "large_image_view") {
    //     this.showImage();
    //     return;
    //   }
    //   if (this.popup_lookupfor == "Price_lookup") {
    //     this.get_Price_lookup();
    //     return;
    //   }
    //   if (this.popup_lookupfor == "rule_section_lookup") {
    //     this.ruleSelection();
    //     return;
    //   }

    //   if (this.popup_lookupfor == "tree_view__model_bom_lookup") {
    //     this.showModelBOMTreeView();
    //     return;
    //   }

    //   if (this.popup_lookupfor == "associated_BOM") {
    //     this.showAssociatedBOMs();
    //     return;
    //   }
    //   if (this.popup_lookupfor == "feature_Detail_Output_lookup") {
    //     this.get_features_Output_lookup();
    //     return;
    //   }

    if (this.popup_lookupfor == "output_customer") {
      this.customer_lookup();
      return;
    }

    // if (this.popup_lookupfor == "operand_feature_lookup") {
    //   this.get_operand_lookup();
    //   return;
    // }

    // if (this.popup_lookupfor == "operand_model_lookup") {
    //   this.get_Model_lookup();
    //   return;
    // }

    if (this.popup_lookupfor == "configure_list_lookup") {
      this.configure_list_lookup();
      return;
    }
    if (this.popup_lookupfor == "ModelBomForWizard_lookup") {
      this.get_ModelWizard_lookup();
      return;
    }

    // if (this.popup_lookupfor == "output_invoice_print") {
    //   this.output_invoice_print();
    //   return;
    // }

    // if (this.popup_lookupfor == 'routing_resource_lookup') {
    //     this.routing_resource_lookup();
    //     return;
    //   }

    //   if (this.popup_lookupfor == "warehouse_lookup") {
    //     this.warehouse_lookup_list();
    //   }

    //   if (this.popup_lookupfor == 'operation_lookup') {
    //     this.operation_lookup_list();
    //   }

    //   if (this.popup_lookupfor == 'workcenter_lookup') {
    //     this.workcenter_lookup_list();
    //   }

    //   if (this.popup_lookupfor == "template_routing_lookup") {
    //     this.template_routing_list();
    //   }

    //   if(this.popup_lookupfor == "help_popup"){

    //     this.show_help_popup();
    //   }

    // }
  }

  private loadServerData(dataset): void {
    if (this.sort !== undefined && this.sort !== null) {
      this.gridView = {
        data: orderBy(dataset, this.sort),
        total: this.serviceData.length
      };
    } else {
      this.gridView = {
        data: dataset,
        total: this.serviceData.length
      };
    }
  }

  customer_lookup() {
    this.popup_title = this.language.customer;
    this.LookupDataLoaded = false;
    this.showLoader = true;
    this.fill_input_id = 'featureItemName';
    this.table_head = [
      {
        field: 'CustID',
        title: this.language.customer_code,
        type: 'text',
        width: '100',
        attrType: 'text'
      },
      {
        field: 'Name',
        title: this.language.Name,
        type: 'text',
        width: '100',
        attrType: 'text'
      },
    ];
    this.table_head_hidden_elements = [false, false];
    this.lookup_key = 'Name';
    this.width_value = ((100 / this.table_head.length) + '%');
    this.showLoader = false;
    this.LookupDataLoaded = true;
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
        this.loadServerData(this.serviceData);
      }
    }
  }

  configure_list_lookup() {
    this.popup_title = this.language.list_configuration;
    this.LookupDataLoaded = false;
    this.showLoader = true;
    this.fill_input_id = 'modify_duplicate_lookup';
    this.table_head = [
      {
        field: 'OPTM_LOGID',
        title: this.language.configuration_id,
        type: 'numeric',
        width: '100',
        attrType: 'text'
      },
      {
        field: 'OPTM_DESC',
        title: this.language.description,
        type: 'text',
        width: '100',
        attrType: 'text'
      },
      {
        field: 'OPTM_BPCODE',
        title: this.language.customer,
        type: 'text',
        width: '100',
        attrType: 'text'
      },
      {
        field: 'OPTM_CONTACTPERSON',
        title: this.language.contact_person,
        type: 'text',
        width: '100',
        attrType: 'text'
      }
    ];

    this.lookup_key = 'OPTM_DESC';
    this.width_value = ((100 / this.table_head.length) + '%');
    this.showLoader = false;
    this.LookupDataLoaded = true;
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
        this.loadServerData(this.serviceData);
      }
    }
  }

  get_ModelWizard_lookup() {
    this.popup_title = this.language.ModelBom;
    this.LookupDataLoaded = false;
    this.showLoader = true;
    this.fill_input_id = 'featureNameId';
    this.lookup_key = 'OPTM_FEATUREID';
    this.table_head = [
      {
        field: 'OPTM_FEATURECODE',
        title: this.language.code,
        type: 'text',
        width: '100',
        attrType: 'text'
      },
      {
        field: 'OPTM_DISPLAYNAME',
        title: this.language.Name,
        type: 'text',
        width: '100',
        attrType: 'text'
      },
    ];
    this.table_head_hidden_elements = [true, false, false, true, true];
    this.width_value = ((100 / this.table_head.length) + '%');
    this.showLoader = false;
    this.LookupDataLoaded = true;
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
      }
    }

  }

  on_item_select(selection) {
    var lookup_key = selection.selectedRows[0].dataItem;
    if (this.is_operation_popup_lookup_open == true) {
      if (lookup_key.ResCode != undefined && lookup_key.Name != undefined) {
        for (let i = 0; i < this.resourceServiceData.length; ++i) {
          if (this.resourceServiceData[i].rowindex === this.current_popup_row) {
            this.resourceServiceData[i].resource_code = lookup_key.ResCode;
            this.resourceServiceData[i].resource_name = lookup_key.Name;
            this.resourceServiceData[i].resource_uom = lookup_key.UnitOfMsr;
            this.resourceServiceData[i].resource_uom = lookup_key.UnitOfMsr;
            this.resourceServiceData[i].DCNum = lookup_key.DCNum;
            this.get_consumption_inverse_value('consumption', 1, this.resourceServiceData[i].resource_code, i);
          }
        }
      }
    }

    if (this.popup_resource == false) {
      this.lookupvalue.emit(Object.values(lookup_key));
    }

    if (this.popup_resource == true) {
      this.popup_resource = false;
    }
    this.serviceData = [];
    selection.selectedRows = [];
    selection.index = 0;
    selection.selected = false;
    this.skip = 0;
    this.dialogOpened = false;
    if (this.is_operation_popup_lookup_open == false) {
      this.current_popup_row = "";
    }
    setTimeout(() => {
      this.popup_lookupfor = "";
    }, 10);
  }

  get_consumption_inverse_value(type, value, resource_code, currentrow) {
    this.rs.getResConversionInverse(type, value, resource_code).subscribe(
      data => {
        console.log(data);
        if (data != undefined) {
          if (data.length > 0) {
            if (data[0].ErrorMsg == "7001") {
              this.CommonService.RemoveLoggedInUser().subscribe();
              this.CommonService.signOut(this.router, 'Sessionout');
              this.showLookupLoader = false;
              return;
            }
            if (type == 'inverse') {
              this.resourceServiceData[currentrow].resource_consumption = parseFloat(data[0].Consumption).toFixed(3)
            }
            if (type == 'consumption') {
              this.resourceServiceData[currentrow].resource_inverse = parseFloat(data[0].Inverse).toFixed(3);
            }
            if (data[0].TimeUOM != null && data[0].TimeUOM != undefined && data[0].TimeUOM != "") {
              this.resourceServiceData[currentrow].time_uom = data[0].TimeUOM;
            } else {
              this.resourceServiceData[currentrow].time_uom = "";
            }
            if (data[0].TimeConsumption != null && data[0].TimeConsumption != undefined) {
              this.resourceServiceData[currentrow].time_consumption = parseFloat(data[0].TimeConsumption).toFixed(3);
            } else {
              this.resourceServiceData[currentrow].time_consumption = (0).toFixed(3);
            }
            if (data[0].TimeInverse != null && data[0].TimeInverse != undefined) {
              this.resourceServiceData[currentrow].time_inverse = parseFloat(data[0].TimeInverse).toFixed(3);
            } else {
              this.resourceServiceData[currentrow].time_consumption = (0).toFixed(3);
            }
          }
        } else {
          this.CommonService.show_notification(this.language.NoDataAvailable, 'error');
        }
      }, error => {
        if (error.error.ExceptionMessage.trim() == this.commonData.unauthorizedMessage) {
          this.CommonService.isUnauthorized();
        } else {
          this.CommonService.show_notification(this.language.server_error, 'error');
        }
      }
    )
  }

  public close_kendo_dialog() {
    this.dialogOpened = false;
    this.current_popup_row = "";
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadServerData(this.serviceData);
  }

}
