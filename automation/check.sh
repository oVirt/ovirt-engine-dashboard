#!/bin/sh -ex

# Force CI to get the latest version of these packages:
dependencies="$(sed -e '/^[ \t]*$/d' -e '/^#/d' automation/build.packages.force)"
yum-deprecated clean metadata || yum clean metadata
yum-deprecated -y install ${dependencies} || yum -y install ${dependencies}

# Set up Node.js environment with dependencies linked to ./node_modules:
source /usr/share/ovirt-engine-nodejs-modules/setup-env.sh

# Lint code and run tests:
yarn test
