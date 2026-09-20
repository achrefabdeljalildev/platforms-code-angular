import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  AccordionComponent,
  AvatarComponent,
  ButtonCloseComponent,
  ButtonComponent,
} from 'platforms-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AccordionComponent,
    AvatarComponent,
    ButtonComponent,
    ButtonCloseComponent,
  ],
  template: `
    <main>
      <header>
        <h1>Platforms UI</h1>
        <span class="package-version">0.0.0-local</span>
      </header>
      <section aria-labelledby="buttons-heading">
        <h2 id="buttons-heading">Buttons</h2>
        <div class="row">
          <app-button label="Add" (activated)="count = count + 1" />
          <app-button
            label="Disabled"
            [disabled]="true"
            (activated)="count = count + 1"
          />
          <app-button
            label="Delete"
            variant="secondary-outline"
            [destructive]="true"
          />
          <app-button
            label="Options"
            [menu]="true"
            [leadingIcon]="false"
            [(expanded)]="menuOpen"
          />
          <app-button-close label="Reset count" (activated)="count = 0" />
        </div>
        <output aria-live="polite">Count: {{ count }}</output>
        <p role="status">Menu: {{ menuOpen ? 'open' : 'closed' }}</p>
        <div class="row sizes">
          <app-button size="small" label="Small" [trailingIcon]="true" />
          <app-button size="medium" label="Medium" [trailingIcon]="true" />
          <app-button size="large" label="Large" [trailingIcon]="true" />
        </div>
        <div dir="rtl" class="row rtl">
          <app-button label="&#1578;&#1575;&#1604;&#1610;" />
          <app-button-close label="Close RTL" />
        </div>
      </section>
      <section aria-labelledby="avatars-heading">
        <h2 id="avatars-heading">Avatars</h2>
        <div class="row">
          <app-avatar text="AB" [size]="40" />
          <app-avatar type="icon" [size]="48" />
          <app-avatar type="image" imageAlt="Sample profile" [size]="64" />
        </div>
      </section>
      <section aria-labelledby="accordion-heading" class="accordion-section">
        <h2 id="accordion-heading">Accordion</h2>
        <app-accordion title="Package details">
          <p accordion-content>platforms-ui 0.0.0-local</p>
        </app-accordion>
      </section>
    </main>
  `,
})
class AppComponent {
  count = 0;
  menuOpen = false;
}

bootstrapApplication(AppComponent).catch((error) => console.error(error));
