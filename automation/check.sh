#!/bin/sh -ex

# Set up Node.js environment with dependencies linked to ./node_modules:
source /usr/share/ovirt-engine-nodejs-modules/setup-env.sh

# Lint code and run tests:
yarn test
