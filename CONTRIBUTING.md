# Contributing to PWA Boilerplate

This project is intended to be a safe & welcoming space for collaboration.
Contributors are expected to adhere to [the code of conduct](CODE_OF_CONDUCT.md).

## Development

### Fork & Clone

Fork & clone the repo running the following command:
```bash
git clone git@github.com:<Your-Username>/pwa-boilerplate.git
```

or clone using HTTP
```bash
git clone https://github.com:<Your-Username>/pwa-boilerplate
```

### Install dependencies

Install the modules by running
```bash
yarn install
```

### Create a new branch

Now you can create a new branch from master:
```bash
git checkout -b my-feature origin/master
```
### Development commands

You can use the following development command:
```bash
yarn development
```

This will automatically start your project in development mode with hot reload.

### Testing PWA functionality

It's possible that the service worker offline mode won't work correctly in development mode due to the hot reload plugin.

If you wish to test this functionality, you should run it in production mode:
```bash
yarn build && yarn start
```

## Guidelines

Have a look at [docs](docs/), they go into more details on functionality and project's set-up.

When creating a new Pull Request, please ensure that you follow the PR template.
