import {Component, OnDestroy, OnInit} from '@angular/core';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {TranslateService} from '../../shared/services/translate.service';
import {SharedModule} from '../../shared/shared.module';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-kontakt',
  standalone: true,
  imports: [
    InputGroupAddonModule,
    InputGroupModule,
    InputTextareaModule,
    SharedModule
  ],
  templateUrl: './kontakt.component.html',
  styleUrl: './kontakt.component.scss'
})
export class KontaktComponent implements OnInit, OnDestroy {
  value!: string;
  loaded: boolean = false;
  private subscription: Subscription | null = null;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.subscription = this.translateService.areTranslationsLoaded().subscribe(loaded => {
      this.loaded = loaded;
    });
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
