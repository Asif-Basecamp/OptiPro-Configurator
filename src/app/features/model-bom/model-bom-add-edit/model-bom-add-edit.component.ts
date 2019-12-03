import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-bom-add-edit',
  templateUrl: './model-bom-add-edit.component.html',
  styleUrls: ['./model-bom-add-edit.component.scss']
})
export class ModelBomAddEditComponent implements OnInit {
  language = JSON.parse(sessionStorage.getItem('current_lang'));
  constructor() { }

  ngOnInit() {
  }

}
