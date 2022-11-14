# Create Data Modelling App

Create new data modelling apps with just one command!

## Quick Overview

```
npx @development-framework/create-dm-app my-app
cd my-app
npm start
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and
higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>

When you’re ready to deploy to production, create a minified bundle with `npm run build`.

## Creating an App

You’ll need to have Node 14.0.0 or later version on your local development machine (but it’s not required on the server)
. We recommend using the latest LTS version.

To create a new app, you may choose one of the following methods:

* `npx create-dm-app my-app`

It will create a directory called my-app inside the current folder.

Inside that directory, it will generate the initial project structure and install the transitive dependencies:

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

Create-dm-app is using [create-react-app](https://create-react-app.dev/) so go
to [create-react-app](https://github.com/facebook/create-react-app) to get a list of all possible commands, or just look
inside the package.json file and under scripts.

## Development tips

### Pre commit

In this repo, [pre-commit](https://pre-commit.com/) has been used to ensure consistent code formatting. The pre-commit
hook
will run [prettier](https://prettier.io/) formatting and analyze the JavaScript code using [eslint](https://eslint.org/)
.

To run pre-commit, it needs to be installed on your local machine with

```bash
pip install pre-commit
```

Once installed, pre-commit can be run with:

```bash
pre-commit run --all-files
```

### Using the Tree component

To use the Tree component from [dm-core](https://github.com/equinor/dm-core-packages), visible data sources must be
specified. If you want to change the datasource name or add new data sources, the visibleDataSources list defined in
your App.tsx needs to be updated. In the demo-app,
[App.tsx](https://github.com/equinor/create-dm-app/blob/main/src/plugins/demo-app/App.tsx) only has one visible data
source, DemoApplicationDataSource.

### Link core

If you want to work on the core and don't want to release new core versions to see the changes in create-dm-app, then
change the  `@development-framework/dm-core` from inside `package.json` to point to core locally
like `link:./../data-modelling-tool/web/packages/dmt-core/`. You have to run `yarn rollup`inside dm-core to get changes,
since this will bild a new dist that will be picked-up by create-dm-app.

### Connecting to DMSS

If you run the [DMSS API](https://github.com/equinor/data-modelling-storage-service) locally, it will by default be
available at localhost:8000. If this is the case, you must update an environment variable. This is achieved by editing
the start script in package.json:

```json
"start": "REACT_APP_DMSS_URL=http://localhost:8000 react-app-rewired start"
```

### Resetting data sources

The [dm-cli](https://github.com/equinor/dm-cli) can be used for resetting datasources. The recommended way to run the
cli tool is to:

1) Create a new virtual python environment with the bash command
   ```bash
   python -m venv .venv
   ```
2) Activate the virtual environment with the bash command
   ```bash
   source .venv/bin/activate
   ```
3) Install the dm-cli (available on [PyPi](https://pypi.org/project/dm-cli/) with
   ```bash
   pip install dm-cli
   ```
4) Run commands from the dm-cli to reset the demo-app data source.
   ```bash
   dm reset app
   ```
   (Note: it might be necessary to also reset the local DMSS data sources before resetting the demo app datasources,
   this can be done by navigating to the DMSS repo and run the command "docker-compose run --rm dmss reset-app")