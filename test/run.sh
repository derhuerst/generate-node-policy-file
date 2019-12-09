#!/bin/bash
set -e # fail fast
cd $(dirname $0)
set -x # print executed commands

env REQUIRED_FILES=files.json node -r ../track one.js
../generate.js --base-dir . files.json >policy.json
node -v
node --experimental-policy=policy.json one.js
