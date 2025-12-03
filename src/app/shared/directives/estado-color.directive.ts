import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appEstadoColor]',
  standalone: true
})
export class EstadoColorDirective implements OnInit {
  @Input() appEstadoColor: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const estilo = this.appEstadoColor 
      ? { bg: '#4caf50', text: '#ffffff' }  // Verde para activo
      : { bg: '#f44336', text: '#ffffff' }; // Rojo para inactivo

    this.el.nativeElement.style.backgroundColor = estilo.bg;
    this.el.nativeElement.style.color = estilo.text;
    this.el.nativeElement.style.padding = '6px 12px';
    this.el.nativeElement.style.borderRadius = '12px';
    this.el.nativeElement.style.fontWeight = 'bold';
    this.el.nativeElement.style.fontSize = '12px';
    this.el.nativeElement.style.display = 'inline-block';
  }
}