# Setup

In this section we'll go over
- How to clone repository
- Yarn commands
- Directory structure

## Clone repository

You can clone this repository by running the following command:
```bash
git clone https://github.com/Tomburgs/pwa-boilerplate
```

After this, run the `yarn install` command to install node modules.

## Yarn commands

- `yarn development` - Start NextJS development server, you might need to run build before first run.
- `yarn build` - Create build files.
- `yarn start` - Start NextJS production server.
- `yarn eslint` - Run ESLint tests.

## Project structure

```
.
├── next-env.d.ts
├── next.config.js - NextJS config file, includes loaders, plugins, env variable definitions & other things.
├── package.json
├── public - Static file directory, read more about it here: https://nextjs.org/docs/basic-features/static-file-serving
│            Files such as favicon, manifest, robots.txt & logos can be found here.
├── src
│   ├── assets - Includes all svg icons
│   ├── components - React component directory
│   ├── contexts - React contexts
│   ├── hooks - React hooks
│   ├── pages - NextJS pages, commonly files here will directly link to src/routes directory
│   ├── routes - React route components, more about the difference between this & src/pages below
│   ├── stores - Redux stores
│   ├── styles - Main styles, font helper functions, variables & more
│   ├── sw - Service Worker directory
│   ├── utils - Util functions, includes such things as localStorage abstraction, getWindowProperty method, etc.
│   └── config.ts - Config file, this includes such things as theme-color meta data & iOS status bar style definitions.
├── tsconfig.json
└── yarn.lock
```

## Removing demo files

You can safely remove the following files & directories.
These were only necessary to showcase features such as caching:

- src/pages/api
- src/pages/[page].tsx
- src/pages/pages.tsx
- src/routes/pageList
- public/api

After this you will have a couple of issues:

- The homepage will have infinite placeholders where content used to be.
- There will be infinite placeholders on the sidebar under "Pages" text.
- The "Pages" header item will link you to a 404 page.

In order to fix these, you will want to modify the following files:

- src/routes/page/Page.component.tsx - This file is responsible for the infinite placeholders on Homepage.
- src/components/sidebar/Sidebar.component.tsx - This file is responsible for the infinite placeholders on the Sidebar.
- src/components/pages - After modifying Sidebar to not use it, this component can be safely removed.
- src/components/header/items/Items.component.tsx - Remove "Pages" link.
- src/stores/index.ts - Modify this to not include the pages reducer anymore.
- src/stores/pages - Remove the pages redux store.
- src/hooks/page - These were the hooks responsible for interacting with & fetching the page content.


