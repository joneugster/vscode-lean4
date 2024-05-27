#!/bin/sh

# This script automatically increases the minor version of the infoview package
# and publishes the new version to https://npmjs.com.

# Operate in the directory where this file is located
cd $(dirname $0)

FILE="./package.json"

# # update package version
# current_version=$(sed -n 's/.*"version": "\([^"]*\)".*/\1/p' "$FILE");
# new_version=$(echo $current_version | awk -F '.' '{$NF = $NF + 1} 1' OFS='.');
# echo "updating version to $new_version."
# sed -i 's/"version": ".*"/"version": "'$new_version'"/' "$FILE"
# sed -i 's,"current-release": ".*","current-release": "npm:@joneugster/infoview@^'$new_version'",' "$FILE"


echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ../.npmrc

echo "hey there"
cat .npmrc

npm publish --access=public