# npm run build:local
# mv ./dist/index.js ./dist/healthloq-widget-local.js
npm run build:dev
mv ./dist/index.js ./dist/healthloq-widget-dev.js
npm run build:qa
mv ./dist/index.js ./dist/healthloq-widget-qa.js
npm run build:prod
cp ./dist/index.js ./dist/healthloq-widget-live.js
mv ./dist/index.js ./dist/healthloq-widget.js
mv ./dist/index.css ./dist/healthloq-widget.css