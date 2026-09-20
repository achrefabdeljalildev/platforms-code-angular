# Platforms UI

Local Angular 19 component package. Exports `ButtonComponent`,
`ButtonCloseComponent`, `AvatarComponent`, `AccordionComponent`, and their public types.

## Install

```powershell
npm install "C:/Git/platforms code angular/dist/platforms-ui-0.0.0-local.tgz"
```

The package is intentionally private. Local tarball installation does not need
an npm account, npm link, or a registry.

## Styles and assets

Merge these entries into your application's Angular build options:

```json
{
  "styles": ["node_modules/platforms-ui/styles.css", "src/styles.css"],
  "assets": [
    {
      "glob": "**/*",
      "input": "node_modules/platforms-ui/assets",
      "output": "assets"
    }
  ]
}
```

Keep any existing styles and asset entries. The packaged stylesheet includes
the current library's Tailwind utilities and global reset. Consumers do not
need Tailwind, but should load their own overrides after the package stylesheet.

Default icons use `assets/button`, `assets/avatar`, and `assets/accordion`.
Button fonts currently use absolute `/assets/button` URLs. This local package
is tested with a root-hosted application; a subpath deployment must also serve
the fonts at `/assets/button`. Configurable asset roots are not implemented yet.

## Use

```typescript
import { Component } from "@angular/core";
import { ButtonComponent, ButtonCloseComponent } from "platforms-ui";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [ButtonComponent, ButtonCloseComponent],
  template: `
    <app-button label="Add" (activated)="count = count + 1" />
    <app-button-close label="Reset" (activated)="count = 0" />
    <p>{{ count }}</p>
  `,
})
export class ExampleComponent {
  count = 0;
}
```

Menu buttons are triggers: use `[menu]="true"` and `[(expanded)]="menuOpen"`.
The application owns menu content, focus management, and dismissal.

The bundled IBM Plex font license is included in `assets/button/OFL.txt`.
Review the original community design and asset redistribution terms before any public release.
