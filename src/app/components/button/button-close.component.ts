import { Component, EventEmitter, Input, Output } from '@angular/core';

export type CloseButtonSize = 'x-small' | 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button-close',
  standalone: true,
  template: `
    <button
      type="button"
      [class]="buttonClasses"
      [disabled]="disabled"
      [attr.aria-label]="label"
      [title]="label"
      (click)="activate($event)"
    >
      <span
        class="relative flex shrink-0 items-center justify-center"
        [class]="iconClasses"
      >
        <img [src]="iconSrc" alt="" class="block max-w-none" />
      </span>
    </button>
  `,
  styles: [':host { display: inline-flex; vertical-align: middle; }'],
})
export class ButtonCloseComponent {
  @Input() size: CloseButtonSize = 'small';
  @Input() onColor = false;
  @Input() disabled = false;
  @Input() label = 'Close';
  @Output() activated = new EventEmitter<MouseEvent>();

  activate(event: MouseEvent): void {
    if (!this.disabled) this.activated.emit(event);
  }

  get buttonClasses(): string {
    const sizes: Record<CloseButtonSize, string> = {
      'x-small': 'w-[20px] h-[20px]',
      small: 'w-[24px] h-[24px]',
      medium: 'w-[32px] h-[32px]',
      large: 'w-[40px] h-[40px]',
    };
    const colors = this.onColor
      ? 'enabled:hover:bg-white/20 enabled:active:bg-white/40 focus-visible:ring-white'
      : 'enabled:hover:bg-gray-100 enabled:active:bg-gray-200 focus-visible:ring-[#161616]';
    return `inline-flex shrink-0 items-center justify-center rounded-sm border-0 p-0 bg-transparent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset disabled:opacity-40 disabled:cursor-not-allowed ${sizes[this.size]} ${colors}`;
  }

  get iconClasses(): string {
    return this.size === 'large'
      ? 'w-[24px] h-[24px]'
      : this.size === 'x-small'
        ? 'w-[16px] h-[16px]'
        : 'w-[20px] h-[20px]';
  }

  get iconSrc(): string {
    const size = this.size === 'large' ? 24 : this.size === 'x-small' ? 16 : 20;
    return `assets/button/close-${size}${this.onColor ? '-white' : ''}.svg`;
  }
}
