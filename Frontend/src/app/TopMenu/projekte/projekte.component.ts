import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '../../shared/services/translate.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {Subscription} from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-projekte',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    SharedModule,
    CardModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './projekte.component.html',
  styleUrl: './projekte.component.scss'
})

export class ProjekteComponent implements OnInit, OnDestroy{
  loaded: boolean = false;
  private subscription: Subscription | null = null;

  cards = [
    {
      images: ['assets/images/Group-20.webp', 'assets/images/Group-1_2_.webp', 'assets/images/Group-7.webp',  'assets/images/Group-4.webp','assets/images/Group-3.webp','assets/images/Group-6.webp'],
      header: 'Mobile App/Desktop',
      title: 'DishList',
      gps: 'https://play.google.com/store/apps/details?id=com.rezepte_app&hl=de',
      live: 'https://www.the-dishlist.com/',
      content: 'Eine Webanwendung mit der Rezepte, die man im Web findet, in einer Sammlung anlegen und mit zusätzlichen Information beschreiben kann.',
      link: 'https://github.com/AlexDur/Dishlist_2_2024/tree/main',
      currentImage: 0
    },
    {
      images: ['assets/images/onehealth.webp'],
      header: 'Mobile App',
      title: 'One Health Data Integrator',
      gps: '',
      live: '',
      content: 'Eine mobile App, mit deren Hilfe das eigene Beet so geplant werden kann, dass der Anbau einen höheren Ertrag liefert.',
      link: 'https://github.com/AlexDur/One-Health.git',
      currentImage: 0
    },
    {
      images:['assets/images/ad_rund-red75-quad.webp','assets/images/ad_rund-red75-quad.webp'],
      header: 'Mobile App/Desktop',
      title: 'In Konzeptionsphase (Schadensüberwachung im Forst)',
      gps: '',
      live: '',
      content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
      link: '',
      currentImage: 0
    }


  ];

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.subscription = this.translateService.use('de').subscribe(() => {
      this.loaded = true;
    });
  }


  scrollImages(index: number) {
    const card = this.cards[index];
    card.currentImage = (card.currentImage + 1) % card.images.length;
  }


  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
