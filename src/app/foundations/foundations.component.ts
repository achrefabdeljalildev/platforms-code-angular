import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type Palette = {
  name: string;
  shades: { name: string; className: string; light: boolean }[];
};

@Component({
  selector: 'app-foundations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foundations.component.html',
})
export class FoundationsComponent {
  readonly palettes: Palette[] = [
    {
      name: 'Gray',
      shades: [
        ['25', 'bg-gray-25', true],
        ['50', 'bg-gray-50', true],
        ['100', 'bg-gray-100', true],
        ['200', 'bg-gray-200', true],
        ['300', 'bg-gray-300', true],
        ['400', 'bg-gray-400', true],
        ['500', 'bg-gray-500', false],
        ['600', 'bg-gray-600', false],
        ['700', 'bg-gray-700', false],
        ['800', 'bg-gray-800', false],
        ['900', 'bg-gray-900', false],
        ['950', 'bg-gray-950', false],
      ].map(([name, className, light]) => ({
        name,
        className,
        light,
      })) as Palette['shades'],
    },
    {
      name: 'Primary',
      shades: [
        ['25', 'bg-primary-25', true],
        ['50', 'bg-primary-50', true],
        ['100', 'bg-primary-100', true],
        ['200', 'bg-primary-200', true],
        ['300', 'bg-primary-300', true],
        ['400', 'bg-primary-400', false],
        ['500', 'bg-primary-500', false],
        ['600', 'bg-primary-600', false],
        ['700', 'bg-primary-700', false],
        ['800', 'bg-primary-800', false],
        ['900', 'bg-primary-900', false],
        ['950', 'bg-primary-950', false],
      ].map(([name, className, light]) => ({
        name,
        className,
        light,
      })) as Palette['shades'],
    },
    {
      name: 'Gold',
      shades: [
        ['25', 'bg-gold-25', true],
        ['50', 'bg-gold-50', true],
        ['100', 'bg-gold-100', true],
        ['200', 'bg-gold-200', true],
        ['300', 'bg-gold-300', true],
        ['400', 'bg-gold-400', true],
        ['500', 'bg-gold-500', true],
        ['600', 'bg-gold-600', true],
        ['700', 'bg-gold-700', false],
        ['800', 'bg-gold-800', false],
        ['900', 'bg-gold-900', false],
        ['950', 'bg-gold-950', false],
      ].map(([name, className, light]) => ({
        name,
        className,
        light,
      })) as Palette['shades'],
    },
    {
      name: 'Lavender',
      shades: [
        ['25', 'bg-lavender-25', true],
        ['50', 'bg-lavender-50', true],
        ['100', 'bg-lavender-100', true],
        ['200', 'bg-lavender-200', true],
        ['300', 'bg-lavender-300', true],
        ['400', 'bg-lavender-400', false],
        ['500', 'bg-lavender-500', false],
        ['600', 'bg-lavender-600', false],
        ['700', 'bg-lavender-700', false],
        ['800', 'bg-lavender-800', false],
        ['900', 'bg-lavender-900', false],
        ['950', 'bg-lavender-950', false],
      ].map(([name, className, light]) => ({
        name,
        className,
        light,
      })) as Palette['shades'],
    },
    {
      name: 'Semantic',
      shades: [
        ['Error', 'bg-error-500', false],
        ['Warning', 'bg-warning-500', true],
        ['Info', 'bg-info-500', false],
        ['Success', 'bg-success-500', false],
      ].map(([name, className, light]) => ({
        name,
        className,
        light,
      })) as Palette['shades'],
    },
  ];

  readonly spacing = [
    ['xxs', '2px'],
    ['xs', '4px'],
    ['sm', '6px'],
    ['md', '8px'],
    ['lg', '12px'],
    ['xl', '16px'],
    ['2xl', '20px'],
    ['3xl', '24px'],
    ['4xl', '32px'],
    ['5xl', '40px'],
    ['6xl', '48px'],
    ['7xl', '64px'],
    ['8xl', '80px'],
    ['9xl', '96px'],
  ];

  readonly typography = [
    ['Display 2xl', 'text-display-2xl', '72 / 90px'],
    ['Display xl', 'text-display-xl', '60 / 72px'],
    ['Display lg', 'text-display-lg', '48 / 60px'],
    ['Display md', 'text-display-md', '36 / 44px'],
    ['Display sm', 'text-display-sm', '30 / 38px'],
    ['Display xs', 'text-display-xs', '24 / 32px'],
    ['Body xl', 'text-body-xl', '20 / 30px'],
    ['Body lg', 'text-body-lg', '18 / 28px'],
    ['Body md', 'text-body-md', '16 / 24px'],
    ['Body sm', 'text-body-sm', '14 / 20px'],
    ['Body xs', 'text-body-xs', '12 / 18px'],
    ['Body 2xs', 'text-body-2xs', '10 / 14px'],
  ];

  readonly radii = [
    ['none', 'rounded-none', '0px'],
    ['xs', 'rounded-xs', '2px'],
    ['sm', 'rounded-sm', '4px'],
    ['md', 'rounded-md', '8px'],
    ['lg', 'rounded-lg', '16px'],
    ['xl', 'rounded-xl', '24px'],
    ['full', 'rounded-full', '9999px'],
  ];

  readonly shadows = [
    'shadow-xs',
    'shadow-sm',
    'shadow-md',
    'shadow-lg',
    'shadow-xl',
    'shadow-2xl',
    'shadow-3xl',
  ];
}
