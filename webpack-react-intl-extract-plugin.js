let fs = require('fs');
let path = require('path');
let globSync = require('glob').sync;
let mkdirpSync = require('mkdirp').sync;


function extractStrings(source, dest) {
  // Aggregates the default messages that were extracted from the example app's
  // React components via the React Intl Babel plugin. An error will be thrown if
  // there are messages in different components that use the same `id`. The result
  // is a flat collection of `id: message` pairs for the app's default locale.
  let defaultMessages = globSync(path.join(source, '**/*.json'))
    .map((filename) => fs.readFileSync(filename, 'utf8'))
    .map((file) => JSON.parse(file))
    .reduce((collection, descriptors) => {
      descriptors.forEach(({ id, defaultMessage }) => {
        if (collection.hasOwnProperty(id)) {
          throw new Error(`Duplicate message id: ${id}`);
        }
        collection[id] = defaultMessage;
      });

      return collection
    }, {});

  mkdirpSync(dest);

  // Write out default locale
  let destFile    = path.join(dest, 'en.json');
  let destContent = JSON.stringify(defaultMessages, null, 2);

  if (!fs.existsSync(destFile) || fs.readFileSync(destFile, 'utf8') !== destContent) {
    fs.writeFileSync(destFile, destContent);
  }
}


function ReactIntlWebpackPlugin(source, dest) {
  this.source = source;
  this.dest   = dest;
}

// inspired by https://github.com/yahoo/react-intl/tree/master/examples/translations/scripts/translate.js
ReactIntlWebpackPlugin.prototype.apply = function(compiler) {
  let that = this;
  compiler.plugin('compile', function() {
    extractStrings(that.source, that.dest);
  });
};

module.exports = ReactIntlWebpackPlugin;
