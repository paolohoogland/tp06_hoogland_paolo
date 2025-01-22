import { Directive, Input, ElementRef, Renderer2, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appErreurSaisie]' 
})
export class ErreurSaisieDirective implements OnChanges {
  @Input('appErreurSaisie') control!: FormControl; 
  @Input() messages!: { [key: string]: string };  // messages d'erreur

  private errorContainer: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.errorContainer = this.renderer.createElement('div');
    this.renderer.addClass(this.errorContainer, 'error');
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorContainer);
  }

  ngOnChanges(): void {
    this.updateErrorMessages();
  }

  private updateErrorMessages(): void {
    this.errorContainer.innerHTML = '';

    if (this.control && this.control.invalid && this.control.touched) {
      const errors = Object.keys(this.control.errors || {}); // liste des erreurs
      errors.forEach((errorKey) => {
        if (this.messages && this.messages[errorKey]) {
          const errorText = this.renderer.createText(this.messages[errorKey]);
          const errorElement = this.renderer.createElement('p');
          this.renderer.appendChild(errorElement, errorText);
          this.renderer.appendChild(this.errorContainer, errorElement);
        }
      });
    }
  }
}
