import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export type AccordionSize = 'small' | 'medium' | 'large';
export type AccordionIconPosition = 'leading' | 'trailing';

const SIZE_CLASSES: Record<AccordionSize, string> = {
  small: 'min-h-[40px] p-md text-body-sm',
  medium: 'min-h-[48px] p-lg text-body-md',
  large: 'min-h-[56px] p-xl text-body-md',
};

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  @Input() title = 'Accordion Title';
  @Input() size: AccordionSize = 'large';
  @Input() iconPosition: AccordionIconPosition = 'trailing';
  @Input() flush = false;
  @Input() disabled = false;
  @Input() expanded = false;
  @Output() expandedChange = new EventEmitter<boolean>();

  readonly iconSrc = 'assets/accordion/arrow-down-01.svg';

  get isDisabled(): boolean {
    return this.disabled;
  }

  get itemClasses(): string {
    return `w-full min-w-[366px] border-t border-gray-300 border-solid bg-white ${this.flush ? 'rounded-none' : ''}`;
  }

  get headerClasses(): string {
    const alignment =
      this.iconPosition === 'leading' ? 'justify-start' : 'justify-between';
    return `flex  items-center gap-xl w-full ${SIZE_CLASSES[this.size]} ${alignment} cursor-pointer hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-[-2px] disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400`;
  }

  get iconClasses(): string {
    const leading =
      this.iconPosition === 'leading' ? 'order-first' : 'order-last';
    const rotation = this.expanded ? 'rotate-180' : '';
    return `size-2 shrink-0 transition-transform ${leading} ${rotation}`;
  }

  get panelClasses(): string {
    return 'px-xl pb-xl text-body-md text-gray-600';
  }

  toggle(): void {
    if (this.isDisabled) return;
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}
