import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appOnline]'
})
export class OnlineDirective {

  @Input() appOnline: boolean = false;

  constructor( private elementRef: ElementRef, private renderer: Renderer2 ) { 
    this.colorCelda();
   }
  ngOnChanges(changes: SimpleChanges): void {
    this.colorCelda();
  }

   colorCelda(): void {
    this.renderer.setStyle( this.elementRef.nativeElement, 'background-color', this.appOnline ? '#fd7e14' : '#20c997' );
   }

}
