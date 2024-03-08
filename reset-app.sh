#! /usr/bin/env bash
# Get the available docker-compose command
docker compose &> /dev/null
if [[ $? == 0 ]]; then
  compose="docker compose"
else
  compose="docker-compose"
fi

set -e

substitute_env_in_file() {
  TEMPFILE=$(mktemp)
  envsubst < $1 > $TEMPFILE
  mv $TEMPFILE $1
}

MODE=${1:-local}

set -a
source .env
# Load environment (mode) specific environment values
source .env.$MODE
set +a
echo "RESET ENVIRONMENT: $MODE"
echo "DMSS URL: $VITE_DMSS_URL"

# Wait until the storage services is ready before continuing.
# This is to ensure that the services is initialized before the API tries to connect.
service_is_ready() {
  ATTEMPT_COUNTER=1
  MAX_ATTEMPTS=100
  echo "Testing availability of DMSS: $VITE_DMSS_URL"
  until $(curl --silent --output /dev/null --fail "$VITE_DMSS_URL/api/healthcheck"); do
    if [ ${ATTEMPT_COUNTER} -eq ${MAX_ATTEMPTS} ];then
      echo "ERROR: Max attempts reached. Data Modelling Storage API($VITE_DMSS_URL) did not respond. Exiting..."
      exit 1
    fi
    echo "Waiting for $VITE_DMSS_URL... (${ATTEMPT_COUNTER})"
    ATTEMPT_COUNTER=$((ATTEMPT_COUNTER+1))
    sleep 5
  done
  echo "DMSS is ready!"
}
service_is_ready


mkdir -p app/data_sources
cp -r app/data_source_templates/* app/data_sources/

for ds_file in ./app/data_sources/*; do
  substitute_env_in_file $ds_file
  dm --url "$VITE_DMSS_URL" --token "$TOKEN" --force ds import $ds_file
done

echo "Upload DMSS core blueprints to DMSS"
dm --url "$VITE_DMSS_URL" --token "$TOKEN" --force entities import app/data/system/SIMOS system/

echo "Creating DMSS lookup"
dm --token "$TOKEN" --url $VITE_DMSS_URL create-lookup DMSS "system/SIMOS/recipe_links"

echo "Upload plugins blueprints to DMSS"

dm --token "$TOKEN" --url $VITE_DMSS_URL import-plugin-blueprints --no-validate node_modules/@development-framework/dm-core-plugins

rm -rf app/data_sources

echo "Uploading application data"
for DS_NAME in ./app/data/*; do
  if [ "$(basename $DS_NAME)"  == "system" ]; then
  echo "Skipping re-uploading CORE SIMOS package"
  continue
  fi
  for ROOT_PACKAGE in $DS_NAME/*; do
    dm --token "$TOKEN" --force --url $VITE_DMSS_URL entities import --no-validate "$ROOT_PACKAGE" "$(basename $DS_NAME)"
  done
done

# The entities contain cross DS references, and most therefore be validated after all entities in all DSs has been uploaded
for DS_NAME in ./app/data/*; do
  for ROOT_PACKAGE in $DS_NAME/*; do
    dm --token "$TOKEN" --url $VITE_DMSS_URL entities validate "$(basename $DS_NAME)/$(basename $ROOT_PACKAGE)"
  done
done

echo "Creating lookup table 'DemoApp'"
dm --token "$TOKEN" --url $VITE_DMSS_URL create-lookup DemoApp DemoDS/DemoApplication/recipes
