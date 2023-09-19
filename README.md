# Create Data Modelling App 

[![On schedule: healthcheck of standard and latest setup](https://github.com/equinor/create-dm-app/actions/workflows/on-schedule-nightly.yaml/badge.svg)](https://github.com/equinor/create-dm-app/actions/workflows/on-schedule-nightly.yaml)

A tool for quickly creating a _data modelling_ app.

## Getting started

By following these steps, you will have your own custom application up and running on your local machine.

Requirements:

- [Node 14.0.0](https://nodejs.org/en/) or later (We recommend using the latest LTS version).
- [Docker compose](https://docs.docker.com/compose/)
- [Python](https://www.python.org/) 3.8 or later

### 1) Create a new application

Create a new app by running (change `my-app` to your application name).

```
npx @development-framework/create-dm-app my-app
```

This will create a new folder `my-app` and inside that folder, the initial project structure is generated and the transitive dependencies are installed. 

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and
higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_


### 2) Starting services

The dependent services (DMSS, job and databases) are specified in the docker compose file called `docker-compose.yaml`.

Go to the `my-app` folder in a terminal and run the commands to start the services (passing the "-d" flag  is optional for running detached):

```
docker-compose pull
docker-compose up --build -d
```

### 3) Install dm-cli

The [dm-cli](https://github.com/equinor/dm-cli) can be used for resetting datas sources. The recommended way to run the cli tool is to:

1. Create a new virtual python environment with the bash command
   ```bash
   python3 -m venv .venv
   ```
2. Activate the virtual environment with the bash command
   ```bash
   source .venv/bin/activate
   ```
3. Install the dm-cli (available on [PyPi](https://pypi.org/project/dm-cli/)) with
   ```bash
   pip install dm-cli
   ```

### 4) Upload entities, blueprints and recipes

Run this commands that will upload to DMSS any entities, blueprints and recipes register under the data source folder:

```
./reset-app.sh
```

The script uses dm-cli, so the venv needs to be activated before running the script.

> **NOTE**: This script must be run every time a modification is done in any files in the `app/DemoApplicationDataSource/`  folder.

### 5) Start the web application

When inside the `my-app` folder in the terminal, run

```
npm install
npm start
```

The web app can now be reached at [http://localhost:3000](http://localhost:3000) in the web browser.

> **Remember**: You must have the docker-compose services running to use the web application

The web page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

When you’re ready to deploy to production, create a minified bundle with `npm run build`.

> **Remote DMSS**: The app can be connected to any DMSS instance you want.

## Settings

This template uses an application entity to control the behavior of the app. This entity can be seen at `app/data/DemoApplicationDataSource/DemoApplication/entities/demoApplication.json`. The `.env` points to this application entity, which will be loaded and used to select UI plugin to be shown. The recipe that defines what to show can be seen at `app/data/DemoApplicationDataSource/DemoApplication/recipes/demoApp.json`. There also exist default recipes that can be seen at `app/data/DemoApplicationDataSource/DemoApplication/recipes/appDefault.recipe.json`.

URLs to services are controlled by environment variables in the `.env` file, by default this will point to the services specified in the `docker-compose.yaml` file.

## UI Plugins

### Adding

1. Create a new folder under `src/plugins`. This will be your plugin.
2. Add this plugin to the `src/plugins/index.tsx`-file that contains list of local plugins to load.
3. Done

### Using

Associate a blueprint type with a set of ui recipes that uses the ui-plugin.

1. Create a `CORE:RecipeLink`-entity. See `app/data/DemoApplicationDataSource/DemoApplication/instances/recipe_links/demoApp.json` as an example.
2. Run `reset-app.sh` so that the recipe link is uploaded to DMSS.

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