#!/bin/sh
cd /Users/uemuratakahiro/wk/mdn-l10n-update-checker
zip -r -FS ./my-extension.zip ./main.js ./manifest.json 
mv ./my-extension.zip ./deploy/.
