import {Component, OnDestroy, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MenuItem } from 'primeng/api';
import {TranslateService} from '../shared/services/translate.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('emailButton', { static: false }) emailButton: ElementRef;
  items: MenuItem[] = [];
  activeItem: string | undefined;
  loaded: boolean = false;
  menuOpen = false;
  isEnglish = true;
  private subscription: Subscription | null = null;

  constructor(private translateService: TranslateService) {

    this.emailButton = new ElementRef(null);
  }

  ngOnInit() {
    // Standard-Sprache 'de' laden
    this.translateService.use('en').subscribe(() => {
      this.loaded = true;
      console.log('Deutsch geladen');
      this.initializeMenuItems();
    });

    // MenuItem aus LocalStorage setzen
    const savedActiveItem = localStorage.getItem('activeMenuItem');
    if (savedActiveItem) {
      this.setActiveItem(savedActiveItem);
    }
  }


  private initializeMenuItems() {
    const menuKeys = ['about', 'services', 'publications', 'portfolio'];
    this.items = [];
    menuKeys.forEach(key => {
      this.translateService.translate(`menu.${key}`).subscribe(translation => {
        if (!this.items.some(item => item.url === `/${key}`)) {
          this.items.push({ label: translation, url: `/${key}` });
        }
      });
    });
  }

  setActiveItem(url: string | undefined) {
    this.activeItem = url;
    if (typeof url === 'string') {
      localStorage.setItem('activeMenuItem', url);
    }
  }

  toggleMenu() {
    console.log('Menu toggled');
    this.menuOpen = !this.menuOpen;
  }


  toggleLanguage() {
    const lang = this.isEnglish ? 'en' : 'de';
    this.translateService.use(lang).subscribe(() => {
      console.log(`Sprache gewechselt zu: ${lang}`);
      this.initializeMenuItems();
    });
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
