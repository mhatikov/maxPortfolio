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

  getImagesPortfolioPaths(): void {
    this.filesPortfolio = ['./assets/testImages/image_2022-10-11_00-01-38.png', './assets/testImages/image_2022-10-11_00-01-47.png'];
  }

  getCertificatesPortfolioPaths(): void {
    this.sertificatesUrl = ['./assets/testImages/artcraft-certif.jpg'];
  }


}
