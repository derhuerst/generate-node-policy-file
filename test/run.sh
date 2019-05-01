#!/bin/bash
set -e # fail fast
cd $(dirname $0)
set -x # print executed commands

../generate.js --base-dir . files.json >policy.json
node -v
node --experimental-policy=policy.json one.js
