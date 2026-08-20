import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `<div class="skeleton" [style.width]="width()" [style.height]="height()" [style.borderRadius]="radius()"></div>`,
})
export class Skeleton {
  width = input('100%');
  height = input('16px');
  radius = input('8px');
}
