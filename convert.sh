#!/bin/bash

# Install Terser
npm install terser -g
# Make directories
mkdir convert pr-js meta js

mv release/*.user.js convert

# Split userscript to meta file and js file
for file in convert/*.user.js; do
  base=$(basename "$file" .user.js)
  sed -n '/\/\/ ==UserScript==/,/\/\/ ==\/UserScript==/p' "$file" > "meta/$base.meta.js"
  sed -n '/\/\/ ==\/UserScript==/,$p' "$file" | tail -n +2 > "pr-js/$base.js"
done

# Switch @downloadURL and @updateURL to our repository
for file in meta/*.meta.js; do
  base=$(basename "$file" .meta.js)
  sed -i "s|// @downloadURL .*|// @downloadURL https://raw.githubusercontent.com/$repository/raw/release/release/$base.user.js|" "$file"
  sed -i "s|// @updateURL .*|// @updateURL  https://raw.githubusercontent.com/$repository/raw/release/release/$base.meta.js|" "$file"
done

# Parallel compile js files
function compile_js() {
  local file=$1
  base=$(basename "$file" .js)
  eval terser --compress --mangle --comments false --output js/$base.js -- $file
}
export -f compile_js
parallel -j 8 compile_js ::: pr-js/*.js

# Merge meta files and js files after compile
for file in js/*.js; do
  base=$(basename "$file" .js)
  cat "meta/$base.meta.js" "js/$base.js" > "release/$base.user.js"
done

mv meta/*.meta.js release/
