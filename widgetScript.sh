yarn build:local
mv ./dist/index.js ./dist/healthloq-widget-local.js
yarn build:dev
mv ./dist/index.js ./dist/healthloq-widget-dev.js
yarn build:qa
mv ./dist/index.js ./dist/healthloq-widget-qa.js
yarn build:prod
cp ./dist/index.js ./dist/healthloq-widget-live.js
mv ./dist/index.js ./dist/healthloq-widget.js
mv ./dist/index.css ./dist/healthloq-widget.css