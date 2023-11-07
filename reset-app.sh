#! /usr/bin/env bash
# Get the available docker-compose command
docker compose &> /dev/null
if [[ $? == 0 ]]; then
  compose="docker compose"
else
  compose="docker-compose"
fi

set -e

# $1 is the first argument to the shell script. Valid options are 'no-validate-entities' and 'validate-entities'.
# If argument is empty, default value will be no-validate-entities.
if [ -z "$1" ]
  then
    VALIDATION_FLAG="validate-entities"
  else
    if [ $1 != "no-validate-entities" ] && [ $1 != "validate-entities" ]
      then
        echo "validation flag is invalid. valid values are 'no-validate-entities' and 'validate-entities'"
        exit 1
    fi
    VALIDATION_FLAG=$1
fi

MODE=${1:-local}
# Load environment (mode) specific environment values
source .env.$MODE
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

echo "Upload Job API blueprints to DMSS"
eval $compose run --rm job-api dm -u http://dmss:5000 reset ../app
echo "Upload plugins blueprints to DMSS"
dm --url $VITE_DMSS_URL import-plugin-blueprints node_modules/@development-framework/dm-core-plugins
echo "Upload app/ to DMSS"
dm --force  --url $VITE_DMSS_URL reset app --$VALIDATION_FLAG
echo "Creating lookup table"
dm --url $VITE_DMSS_URL create-lookup DemoApp DemoApplicationDataSource/DemoApplication/recipes