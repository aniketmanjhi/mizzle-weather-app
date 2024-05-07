import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-air-condition-details',
  templateUrl: './air-condition-details.component.html',
  styleUrl: './air-condition-details.component.css',
})
export class AirConditionDetailsComponent {
  @Input() addPadding: boolean;
  @Input() airCondition: { name: string; value: string; icons: string };

  getName() {
    return this.airCondition.name
      .split('_')
      .map((el: string) =>
        el.length > 2 ? el[0].toUpperCase() + el.slice(1) : el.toUpperCase()
      )
      .join(' ');
  }
}
