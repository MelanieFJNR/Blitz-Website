import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

export interface WizzardItem {
  name: any;
  activated?: boolean;
  completed?: boolean;
}

@Component({
  selector: 'app-nt-wizzard',
  templateUrl: './nt-wizzard.component.html',
  styleUrls: ['./nt-wizzard.component.scss']
})
export class NtWizzardComponent implements OnInit {

  items: WizzardItem[] = [
    {
      'name': _('nt-wizzard.informations')
    },
    {
      'name': _('nt-wizzard.verification')
    },
    {
      'name': _('nt-wizzard.confirmation')
    },
    {
      'name': _('nt-wizzard.subscription')
    }
  ];

  @Input() active: number;

  constructor(private translate: TranslateService) { }

  translateItems() {
    for (const item of this.items) {
      this.translate.get(item.name).subscribe(
        (translatedLabel: string) => {
          item.name = translatedLabel;
        }
      );
    }
  }

  ngOnInit() {
    this.translateItems();
    if (this.active !== null) {
      let count = 0;
      for (const item of this.items) {
        if (count === this.active) {
          item.activated = true;
          break;
        } else {
          item.completed = true;
          count += 1;
        }
      }
    }
  }

  getIndex() {
    if (this.active) {
      return this.active + 1;
    } else {
      return 0;
    }
  }

  get maxWidth(): string{
    return `${100 / this.items.length}%`;
  }
}
