# Create Data Modelling App [![On schedule: healthcheck of standard and latest setup](https://github.com/equinor/create-dm-app/actions/workflows/on-schedule-nightly.yaml/badge.svg)](https://github.com/equinor/create-dm-app/actions/workflows/on-schedule-nightly.yaml)

Tool for quickly creating a _data modelling_ app skeleton

## Getting started

By following these steps, you will have your own custom application up and running on your local machine.

Requirements:

- [Node 14.0.0](https://nodejs.org/en/) or later (We recommend using the latest LTS version).
- [Docker compose](https://docs.docker.com/compose/)
- [Python](https://www.python.org/) 3.8 or later

### 1) Create a new application

Using the command (you can change `my-app` to your application name)

```
npx @development-framework/create-dm-app my-app
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and
higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

This will create a new folder "my-app".
Inside that folder, the initial project structure is generated and the transitive dependencies are installed.

Create-dm-app is using [create-react-app](https://create-react-app.dev/) so go
to [create-react-app](https://github.com/facebook/create-react-app) to get a list of all possible commands, or just look
inside the package.json file and under scripts.

### 2) Start DMSS

To run your custom application locally, you will need an instance of DMSS running locally.

Go to the `my-app` folder in a terminal and run the commands:

```
docker-compose pull
docker-compose up --build
```

To reset the database, open a new terminal window and navigate to the `my-app` folder and run the commands:

```
docker-compose run --rm dmss reset-app
```

### 3) Install dm-cli

_Note: it is recommended to use a python virtual environment before you install the dm-cli package_

```
pip install dm-cli
```

### 4) Upload documents/models to DMSS

Run the following command to upload the documents in the folder my-app/app to DMSS

```
dm reset app/
```

You must also upload documents from dm-job.
When you are in the `my-app` folder in your terminal window, run the following command

```
docker-compose run --rm job-api dm -u http://dmss:5000 reset ../app
```

### 5) Create a lookup table in DMSS

In your terminal window, go to the `my-app` and run

```
dm import-plugin-blueprints ./node_modules/@development-framework/dm-core-plugins
dm create-lookup demo-app DemoApplicationDataSource/instances/recipe_links

### 6) Start the web application

When inside the `my-app` folder in the terminal, run

```
npm install
npm start
```

The web app can now be reached at [http://localhost:3000](http://localhost:3000) in the web browser.

(Remember, you must have the docker-compose services running to use the web application)

The web page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

When you’re ready to deploy to production, create a minified bundle with `npm run build`.

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

### UiPlugins

#### Adding a ui-plugin

1. Create a folder in `src/plugins`. This will be your plugin, and must have a `index.js`-file that has a default export
   of the type `export const plugins: TPlugin[]`
2. Add this plugin to the list of plugins to load in `src/plugins.js`
3. Done!

#### Using the ui-plugin

Associate a blueprint type with a set of uiRecipes that uses the ui-plugin

1. Create a `CORE:RecipeLink`-entity (see `app/data/DemoApplicationDataSource/instances/recipe_links/demoApp.json` as an
   example)
2. Create a _lookup_ with the app name and the _RecipeLinks_ for it (DMSS must be running on localhost:5000)
   - `dm create-lookup DemoApp DemoApplicationDataSource/instances/recipe_links`

### Using the Tree component

To use the Tree component from [dm-core](https://github.com/equinor/dm-core-packages), visible data sources must be
specified. If you want to change the datasource name or add new data sources, the visibleDataSources list defined in
your App.tsx needs to be updated. In the DemoApp,
[App.tsx](https://github.com/equinor/create-dm-app/blob/main/src/plugins/DemoApp/App.tsx) only has one visible data
source, DemoApplicationDataSource.

### Link core

If you want to work on the core and don't want to release new core versions to see the changes in create-dm-app, then
change the `@development-framework/dm-core` from inside `package.json` to point to core locally
like `link:./../data-modelling-tool/web/packages/dmt-core/`. You have to run `yarn rollup` inside dm-core to get changes,
since this will bild a new dist that will be picked-up by create-dm-app.

### Connecting to DMSS

If you run the [DMSS API](https://github.com/equinor/data-modelling-storage-service) locally, it will by default be
available at localhost:8000. If this is the case, you must update an environment variable. This is achieved by editing
the start script in package.json:

```json
"start": "REACT_APP_DMSS_URL=http://localhost:5000 react-app-rewired start"
```

### Resetting data sources

The [dm-cli](https://github.com/equinor/dm-cli) can be used for resetting datasources. The recommended way to run the
cli tool is to:

1. Create a new virtual python environment with the bash command
   ```bash
   python -m venv .venv
   ```
2. Activate the virtual environment with the bash command
   ```bash
   source .venv/bin/activate
   ```
3. Install the dm-cli (available on [PyPi](https://pypi.org/project/dm-cli/) with
   ```bash
   pip install dm-cli
   ```
4. Run commands from the dm-cli to reset the DemoApp data source.
   ```bash
   dm reset app
   ```
   (Note: it might be necessary to also reset the local DMSS data sources before resetting the demo app datasources,
   this can be done by navigating to the DMSS repo and run the command "docker-compose run --rm dmss reset-app")
