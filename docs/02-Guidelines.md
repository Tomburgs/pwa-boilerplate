# Guidelines

Here we'll discuss guidelines on how to create components, styling, etc.

## Component & Routes structure

Components & Routes are both created by the same principle.
Components are created by the following structure:
```
.
├── components
│   └── myComponent
│       ├─ index.ts - Exports default & named values from MyComponent.tsx
│       ├─ MyComponent.tsx - Defines react component & anything else it needs
│       ├─ MyComponent.module.scss - Styling for component
│       └─ <directory> - Additional components that are used only by this component,
│                        If it's intended to be used by anything else, it's advised
│                        to move it to src/components
│
│                        An example of this A2HS component & Header component.
```

Note: It is advised to use function components when possible, as this project is largely based on hooks & similar principles.

## What's the deal with Pages & Routes?

We use `src/pages` & `src/routes` directories, because pages directory is necessary for NextJS to generate static pages.
Practically everything in pages directory gets treated as a route, so we had to move component definitions & stylings elsewhere.
Since we don't want our route styles & components to be mixed with regular components we use routes directory.

TL;DR: Pages is where you define what routes your application has, Routes directory is where markup & styling is defined.

## More is coming!

More information to docs is in-progress!
