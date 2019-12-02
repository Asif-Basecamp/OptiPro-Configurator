import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-cg-add-edit',
  templateUrl: './item-cg-add-edit.component.html',
  styleUrls: ['./item-cg-add-edit.component.scss']
})
export class ItemCgAddEditComponent implements OnInit {
  public language = JSON.parse(sessionStorage.getItem('current_lang'));
  constructor() { }

  ngOnInit() {
  }

}
