import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FireStoreService } from 'src/app/services/fire-store.service';
import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);

interface ContactLinks {
  Telegram?: String;
  Email?: String;

  TelegramLink?: String;
  EmailLink?: String;
}

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  unsubscribe$: Subject<void> = new Subject<void>();
  filesPortfolio: Array<String> = [];
  sertificatesUrl: Array<String> = [];
  paragraphsDescription: Array<string>;
  contactLinks: ContactLinks = {};
  nameObj: {
    FirstName?: string;
    SecondName?: string;
    ProfName?: string;
  };

  constructor(private store: FireStoreService) { }

  ngOnInit(): void {
    this.getDescription();
    this.getContactLinks();
    this.getNames();
    this.getImagesPortfolioPaths();
    this.getCertificatesPortfolioPaths();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#5176;','&#5171;'],
    items: 1,
    nav: true,
    autoHeight:true,
  }

  getDescription(): void {
    this.store.getDescription$().pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => this.paragraphsDescription = res['paragraphs']);
  }

  getContactLinks(): void {
    this.store.getContactLinks$().pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.contactLinks.Email = res['Email'];
        this.contactLinks.Telegram = res['Telegram'];

        this.contactLinks.TelegramLink = `https://t.me/${res['Telegram']}`;
        this.contactLinks.EmailLink = `mailto:${res['Email']}`;
      });
  }

  getNames(): void {
    this.store.getName$().pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.nameObj = {};
        this.nameObj['FirstName'] = res['FirstName'];
        this.nameObj['SecondName'] = res['SecondName'];
        this.nameObj['ProfName'] = res['ProfName'];
      })
  }

  getImagesPortfolioPaths(): void {
    this.store.getImagesRefs$('portfolio-arts/').pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      res.items.forEach((elem) => {
        this.getImage$(elem.fullPath).subscribe(res => {
          this.filesPortfolio.push(res);
        })
      })
    });
  }

  getCertificatesPortfolioPaths(): void {
    this.store.getImagesRefs$('certificates/').pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      res.items.forEach((elem) => {
        this.getImage$(elem.fullPath).subscribe(res => {
          this.sertificatesUrl.push(res);
        })
      })
    });
  }

  getImage$(path: string) {
    return this.store.uploadImageProductByPath$(path).pipe(takeUntil(this.unsubscribe$));
  }
}
