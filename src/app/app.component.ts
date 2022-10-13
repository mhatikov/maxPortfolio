import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ParallaxComponent } from './components/parallax/parallax.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'max-portfolio';

  constructor(private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  coordXParallax:number = 0;
  coordYParallax:number = 0;

  contentPosition:number = 0;
  changeBackgroundMenu:boolean = false;

  @ViewChild(ParallaxComponent) parallax: ParallaxComponent;
  @ViewChild('contentWrap') contentWrap: ElementRef;

  sendDataParallax(event:any): void{
    const parallaxWrap:any = this.parallax.parallaxContainer;

    const parallaxWidth:number = parallaxWrap.nativeElement.offsetWidth;
    const parallaxHeight:number = parallaxWrap.nativeElement.offsetHeight;

    const coordX:number = event.pageX - parallaxWidth / 2;
    const coordY:number = event.pageY - parallaxHeight / 2;

    this.coordXParallax = coordX / parallaxWidth * 100;
    this.coordYParallax = coordY / parallaxHeight * 100;
  }

  ngAfterViewInit(): void {
    if(this.contentWrap) {
      const wrapContent = this.contentWrap.nativeElement;
      this.contentPosition = wrapContent.offsetTop;
      this.cdref.detectChanges();
    }
  }
}
