import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WeatherDataService } from '../../shared/weather-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  queryParams: Params;
  searchToggle: boolean = true;
  constructor(
    private weatherDataService: WeatherDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      this.queryParams = query;
    });
    this.weatherDataService.searchToggleInput.subscribe((toggle) => {
      this.searchToggle = !toggle;
    });
  }

  onSearchToggle() {
    this.searchToggle = !this.searchToggle;
    this.weatherDataService.searchToggle.next(!this.searchToggle);
  }
}
