import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type AvatarSize = 24 | 32 | 40 | 48 | 64 | 80 | 120;
export type AvatarShape = 'circle' | 'square';
export type AvatarType = 'initials' | 'icon' | 'image';

/** Literal Tailwind classes per size — kept as full strings so Tailwind's content scanner can detect them. */
const BOX_CLASSES: Record<AvatarSize, string> = {
  24: 'w-[24px] h-[24px] border-2',
  32: 'w-[32px] h-[32px] border-2',
  40: 'w-[40px] h-[40px] border-2',
  48: 'w-[48px] h-[48px] border-2',
  64: 'w-[64px] h-[64px] border-2',
  80: 'w-[80px] h-[80px] border-2',
  120: 'w-[120px] h-[120px] border-4',
};

const CIRCLE_RADIUS_CLASSES: Record<AvatarSize, string> = {
  24: 'rounded-full',
  32: 'rounded-full',
  40: 'rounded-full',
  48: 'rounded-full',
  64: 'rounded-full',
  80: 'rounded-full',
  120: 'rounded-full',
};

const SQUARE_RADIUS_CLASSES: Record<AvatarSize, string> = {
  24: 'rounded-[4px]',
  32: 'rounded-[4px]',
  40: 'rounded-[4px]',
  48: 'rounded-[4px]',
  64: 'rounded-[4px]',
  80: 'rounded-[4px]',
  120: 'rounded-[8px]',
};

const CONTENT_INSET_CLASSES: Record<AvatarSize, string> = {
  24: 'p-[16.67%]',
  32: 'p-[12.5%]',
  40: 'p-[10%]',
  48: 'p-[16.67%]',
  64: 'p-[18.75%]',
  80: 'p-[15%]',
  120: 'p-[16.67%]',
};

const INITIALS_CLASSES: Record<AvatarSize, string> = {
  24: 'text-[10px] leading-[14px] font-bold',
  32: 'text-[12px] leading-[18px] font-semibold',
  40: 'text-[14px] leading-[20px] font-semibold',
  48: 'text-[16px] leading-[24px] font-medium',
  64: 'text-[20px] leading-[30px] font-medium',
  80: 'text-[30px] leading-[38px] font-normal',
  120: 'text-[36px] leading-[44px] font-normal tracking-[-0.72px]',
};

const RING_BORDER_CLASSES: Record<AvatarSize, string> = {
  24: 'border',
  32: 'border',
  40: 'border',
  48: 'border',
  64: 'border',
  80: 'border',
  120: 'border-2',
};

export const DEFAULT_ICON_SRC = 'assets/avatar/icon-user.svg';
export const DEFAULT_IMAGE_SRC = 'assets/avatar/avatar-sample.png';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  /** Diameter/side length in px: 24, 32, 40, 48, 64, 80 or 120. */
  @Input() size: AvatarSize = 40;
  @Input() shape: AvatarShape = 'circle';
  @Input() type: AvatarType = 'initials';
  @Input() text = 'AB';
  @Input() imageSrc = DEFAULT_IMAGE_SRC;
  @Input() imageAlt = '';
  @Input() iconSrc = DEFAULT_ICON_SRC;
  /** Shows the extra 1-2px semi-transparent ring outline around the avatar edge. */
  @Input() border = false;

  get containerClasses(): string {
    const radius =
      this.shape === 'square'
        ? SQUARE_RADIUS_CLASSES[this.size]
        : CIRCLE_RADIUS_CLASSES[this.size];
    const bg = this.type === 'image' ? 'bg-white' : 'bg-avatar-bg';
    return `relative inline-flex flex-shrink-0 box-border border-solid border-white ${BOX_CLASSES[this.size]} ${radius} ${bg}`;
  }

  get contentClasses(): string {
    return `flex items-center justify-center w-full h-full box-border overflow-hidden ${CONTENT_INSET_CLASSES[this.size]}`;
  }

  get initialsClasses(): string {
    return `w-full m-0 text-center break-words text-avatar-text font-plex-arabic ${INITIALS_CLASSES[this.size]}`;
  }

  get ringClasses(): string {
    return `absolute inset-0 rounded-[inherit] border-black/20 border-solid pointer-events-none ${RING_BORDER_CLASSES[this.size]}`;
  }
}
