import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AvatarComponent,
  AvatarShape,
  AvatarSize,
} from './components/avatar/avatar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  sizes: AvatarSize[] = [24, 32, 40, 48, 64, 80, 120];
  shapes: AvatarShape[] = ['circle', 'square'];
}
