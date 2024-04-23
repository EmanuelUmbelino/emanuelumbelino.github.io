import { ElementRef } from '@angular/core';

export class Topic {
  name: string;
  top: number;
  bottom: number;
  show: boolean;
  element: ElementRef;

  constructor(name: string, show: boolean, element: ElementRef) {
    this.name = name;
    this.show = show;
    this.element = element;
    this.top = getTop(element);
    this.bottom = getBottom(element);
  }
}

function getTop(ref: ElementRef) {
  return ref.nativeElement.offsetTop;
}

function getBottom(ref: ElementRef) {
  return getTop(ref) + ref.nativeElement.offsetHeight;
}
