import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ParallaxService } from 'src/app/services/parallax.service';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements OnChanges {

  constructor(private parallaxService:ParallaxService) { }

  private positionX:number = 0;
  private positionY:number = 0;

  @Input() coordXprocent:number;
  @Input() coordYprocent:number;


  @ViewChild('clouds')
  clouds:ElementRef;
  @ViewChild('mountains')
  mountains:ElementRef;
  @ViewChild('body')
  parallaxContainer: ElementRef;

  setAnimationParallax():void{
    this.positionX = this.parallaxService.setMouseParallaxStyleX(this.coordXprocent, this.positionX);
    this.positionY = this.parallaxService.setMouseParallaxStyleY(this.coordYprocent, this.positionY);
    this.clouds.nativeElement.style.transform = `translate(${this.positionX / this.parallaxService.FORCLOUDS}%, ${this.positionY / this.parallaxService.FORCLOUDS}%)`;
    this.mountains.nativeElement.style.transform = `translate(${this.positionX / this.parallaxService.FORMOUNTAINS}%, ${this.positionY / this.parallaxService.FORMOUNTAINS}%)`;
  }

  ngOnChanges():void{
    if(this.clouds && this.mountains && this.parallaxContainer) this.setAnimationParallax();
  }

}
