import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightRol]',
  standalone: true
})
export class HighlightRolDirective implements OnInit {
  @Input() appHighlightRol: 'admin' | 'profesor' | 'estudiante' = 'estudiante';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const colores = {
      'admin': '#e3f2fd',
      'profesor': '#f3e5f5',
      'estudiante': '#e8f5e9'
    };

    const color = colores[this.appHighlightRol];
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.padding = '4px 8px';
    this.el.nativeElement.style.borderRadius = '4px';
    this.el.nativeElement.style.display = 'inline-block';
    this.el.nativeElement.style.fontWeight = '500';
  }
}