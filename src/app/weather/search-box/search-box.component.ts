import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherDataService } from '../../shared/weather-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent implements OnInit {
  searchValue: string = '';
  searchForm: FormGroup;
  searchToggle: boolean = false;

  constructor(
    private router: Router,
    private weatherDataService: WeatherDataService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchValue: new FormControl(null, Validators.required),
    });
    this.weatherDataService.searchToggle.subscribe((toggle) => {
      this.searchToggle = toggle;
    });
  }

  onSubmit() {
    this.searchValue = this.searchForm.value['searchValue'];
    if (this.searchValue) {
      this.weatherDataService.cityName.next(this.searchValue);
      this.router.navigate(['/weather/weather-forecast'], {
        queryParams: { search: this.searchValue },
      });
    }

    this.searchToggle = false;
    this.weatherDataService.searchToggleInput.next(this.searchToggle);
    this.searchForm.reset();
  }
}
