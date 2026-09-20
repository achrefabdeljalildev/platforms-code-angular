import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant =
  | 'primary'
  | 'neutral'
  | 'secondary-solid'
  | 'secondary-outline'
  | 'subtle'
  | 'transparent';

const SIZE_CLASSES: Record<ButtonSize, string> = {
  small: 'h-[24px] px-md text-body-xs',
  medium: 'h-[32px] px-lg text-body-sm',
  large: 'h-[40px] px-xl text-body-md',
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-900 data-[selected=true]:bg-primary-800',
  neutral:
    'bg-gray-950 text-white hover:bg-gray-800 active:bg-gray-600 data-[selected=true]:bg-gray-700',
  'secondary-solid':
    'bg-gray-100 text-[#161616] hover:bg-gray-200 active:bg-gray-200 data-[selected=true]:bg-gray-200',
  'secondary-outline':
    'bg-transparent text-[#161616] ring-1 ring-inset ring-gray-300 hover:bg-gray-100 active:bg-gray-200 data-[selected=true]:bg-gray-200',
  subtle:
    'bg-transparent text-[#161616] hover:bg-gray-100 active:bg-gray-200 data-[selected=true]:bg-gray-200',
  transparent:
    'bg-transparent text-[#161616] hover:text-primary-700 active:text-primary-900 data-[selected=true]:text-primary-800',
};

const DESTRUCTIVE_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-error-600 text-white hover:bg-error-700 active:bg-error-900 data-[selected=true]:bg-error-800',
  neutral: VARIANT_CLASSES.neutral,
  'secondary-solid':
    'bg-error-50 text-error-700 hover:bg-error-100 active:bg-error-200 data-[selected=true]:bg-error-200',
  'secondary-outline':
    'bg-transparent text-error-700 ring-1 ring-inset ring-error-200 hover:bg-error-50 active:bg-error-100 data-[selected=true]:bg-error-100',
  subtle:
    'bg-transparent text-error-700 hover:bg-error-50 active:bg-error-100 data-[selected=true]:bg-error-100',
  transparent:
    'bg-transparent text-error-700 hover:text-error-700 active:text-error-900 data-[selected=true]:text-error-800',
};

const ON_COLOR_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-white text-[#161616] hover:bg-white/80 active:bg-white/60 data-[selected=true]:bg-white/70',
  neutral:
    'bg-white text-[#161616] hover:bg-white/80 active:bg-white/60 data-[selected=true]:bg-white/70',
  'secondary-solid':
    'bg-white/20 text-white hover:bg-white/40 active:bg-white/40 data-[selected=true]:bg-white/30',
  'secondary-outline':
    'bg-transparent text-white ring-1 ring-inset ring-white/40 hover:bg-white/20 active:bg-white/40 data-[selected=true]:bg-white/30',
  subtle:
    'bg-transparent text-white hover:bg-white/20 active:bg-white/40 data-[selected=true]:bg-white/30',
  transparent:
    'bg-transparent text-white hover:text-primary-400 active:text-primary-300 data-[selected=true]:text-primary-400',
};

const DESTRUCTIVE_ON_COLOR_CLASSES: Record<ButtonVariant, string> = {
  primary: DESTRUCTIVE_CLASSES.primary,
  neutral: ON_COLOR_CLASSES.neutral,
  'secondary-solid':
    'bg-white/20 text-error-200 hover:bg-white/40 active:bg-white/40 data-[selected=true]:bg-white/30',
  'secondary-outline':
    'bg-transparent text-error-200 ring-1 ring-inset ring-white/40 hover:bg-white/20 active:bg-white/40 data-[selected=true]:bg-white/30',
  subtle:
    'bg-transparent text-error-200 hover:bg-white/20 active:bg-white/40 data-[selected=true]:bg-white/30',
  transparent:
    'bg-transparent text-error-200 hover:text-error-300 active:text-error-400 data-[selected=true]:text-error-300',
};

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() size: ButtonSize = 'large';
  @Input() variant: ButtonVariant = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() destructive = false;
  @Input() onColor = false;
  @Input() iconOnly = false;
  @Input() leadingIcon = true;
  @Input() trailingIcon = false;
  @Input() leadingIconSrc = '';
  @Input() trailingIconSrc = '';
  @Input() selected: boolean | null = null;
  @Input() menu = false;
  @Input() expanded = false;
  @Input() controls: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Output() activated = new EventEmitter<MouseEvent>();
  @Output() expandedChange = new EventEmitter<boolean>();

  get iconSize(): number {
    return this.size === 'large' ? 24 : this.size === 'medium' ? 20 : 16;
  }

  get buttonClasses(): string {
    const variants = this.onColor
      ? this.destructive
        ? DESTRUCTIVE_ON_COLOR_CLASSES
        : ON_COLOR_CLASSES
      : this.destructive
        ? DESTRUCTIVE_CLASSES
        : VARIANT_CLASSES;
    let palette = variants[this.variant];
    if (this.disabled) {
      const transparent = [
        'secondary-outline',
        'subtle',
        'transparent',
      ].includes(this.variant);
      palette = this.onColor
        ? `text-white/40 ${transparent ? 'bg-transparent' : 'bg-white/20'}`
        : `text-gray-400 ${transparent ? 'bg-transparent' : 'bg-gray-200'}`;
      if (this.variant === 'secondary-outline')
        palette += this.onColor
          ? ' ring-1 ring-inset ring-white/40'
          : ' ring-1 ring-inset ring-gray-200';
    }
    const square =
      this.iconOnly && !this.menu
        ? `icon-only ${this.size === 'large' ? 'w-[40px]' : this.size === 'medium' ? 'w-[32px]' : 'w-[24px]'}`
        : '';
    return `button inline-flex shrink-0 items-center justify-center gap-xs rounded-sm border-0 py-0 font-text font-medium tracking-normal cursor-pointer disabled:cursor-not-allowed ${SIZE_CLASSES[this.size]} ${square} ${palette}`;
  }

  get leadingAsset(): string {
    return `assets/button/${this.menu ? 'menu' : 'arrow'}-${this.iconSize}.svg`;
  }

  activate(event: MouseEvent): void {
    if (this.disabled) return;
    if (this.menu) this.setExpanded(!this.expanded);
    this.activated.emit(event);
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.menu || this.disabled) return;
    if (event.key === 'ArrowDown' || event.key === 'Escape') {
      event.preventDefault();
      this.setExpanded(event.key === 'ArrowDown');
    }
  }

  private setExpanded(expanded: boolean): void {
    this.expanded = expanded;
    this.expandedChange.emit(expanded);
  }
}
