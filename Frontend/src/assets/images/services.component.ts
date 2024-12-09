import {Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import {TranslateService} from '../../app/shared/services/translate.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {SharedModule} from '../../app/shared/shared.module';
import {Subscription} from 'rxjs';
import {TechstackComponent} from '../../app/TopMenu/about/techstack/techstack.component';
import {AccordionModule} from 'primeng/accordion';
import {ServicesGrafikComponent} from '../../app/TopMenu/services/services-grafik/services-grafik.component';
import {ServicesTechstackComponent} from '../../app/TopMenu/services/services-techstack/services-techstack.component';

import {ServicesArbeitsweiseComponent} from '../../app/TopMenu/services/services-arbeitsweise/services-arbeitsweise.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    SharedModule,
    TechstackComponent,
    AccordionModule,
    ServicesGrafikComponent,
    ServicesTechstackComponent,
    ServicesArbeitsweiseComponent
  ],
  templateUrl: '../../app/TopMenu/services/services.component.html',
  styleUrl: '../../app/TopMenu/services/services.component.scss'
})

export class ServicesComponent implements OnInit, OnDestroy {
  loaded: boolean = false;
  isDesktop: boolean = true;
  private subscription: Subscription | null = null;

  constructor(private translateService: TranslateService) {  this.checkScreenSize();}

  ngOnInit() {
    this.subscription = this.translateService.areTranslationsLoaded().subscribe(loaded => {
      this.loaded = loaded;
    });
  }

  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth > 600;
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
