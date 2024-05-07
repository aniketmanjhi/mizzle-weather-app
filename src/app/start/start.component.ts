import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent implements OnInit {
  searchForm: FormGroup;
  searchValue: string;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null, Validators.required),
    });
  }
}
