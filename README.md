# AvatarWorkspace

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.27.

## Local npm package

Build and pack the component library without publishing to a registry:

```powershell
npm run pack:local
```

The output is `dist/platforms-ui-0.0.0-local.tgz`. The package remains private
and exports the button, close button, avatar, and accordion components from
`src/public-api.ts`. Storybook and application code are not public exports.

Test the actual tarball in the isolated Angular 19 consumer:

```powershell
npm run test:local
npm run start:local
```

Open `http://127.0.0.1:4201`. The check rebuilds and reinstalls the tarball,
verifies installed bundles and assets against the build, then runs a production
consumer build. No npm login or global npm link is needed. Stop and restart the
consumer server after reinstalling an updated package to clear dev-server caches.

See [the package setup guide](src/README.md) for installation in another Angular
app, including required CSS and asset-copy configuration. The current stylesheet
includes a global Tailwind reset, and font URLs assume a root-hosted app.

## Buttons

Import `ButtonComponent` and `ButtonCloseComponent` from `src/app/components/button`
using their respective component files into a standalone component's `imports`.

```html
<app-button label="Save" (activated)="save()" />
<app-button label="Delete" [destructive]="true" variant="secondary-outline" />
<app-button label="Options" [menu]="true" [leadingIcon]="false" [(expanded)]="menuOpen" controls="options-menu" />
<app-button-close label="Close dialog" (activated)="closeDialog()" />
```

- Sizes: `small` (24px), `medium` (32px), `large` (40px). Close buttons also support `x-small` (20px).
- Variants: `primary`, `neutral`, `secondary-solid`, `secondary-outline`, `subtle`, `transparent`.
- Options: `disabled`, `destructive`, `onColor`, `iconOnly`, `leadingIcon`, `trailingIcon`, and nullable `selected` for toggle buttons.
- `label` supplies the accessible name for icon-only buttons; `ariaLabel` can override it. Close buttons use `label`.
- Buttons default to `type="button"`; `submit` and `reset` are available explicitly.
- Direction is inherited from `dir="rtl"`; labels are supplied by the application.
- The menu option is a trigger, not a menu implementation. The parent owns the menu content, option navigation, focus management, and dismissal. `expandedChange` fires on click, Arrow Down (open), and Escape (close).
- Default icons are local Figma exports. Custom `leadingIconSrc` and `trailingIconSrc` accept application-provided image URLs.

Run `npm run storybook` and open **Components / Button** or **Button Close**.
Stories include variant matrices and interaction checks. Run
`npx ngc -p tsconfig.json --noEmit` for a component and story type check.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
