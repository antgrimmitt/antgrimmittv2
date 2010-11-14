
Node HTML5 Express Boilerplate
==============================

this is my take on a node-boilerplate heavily influenced by Mathias Pettersson's
node-express-boilerplate. For more information see
https://github.com/mape/node-express-boilerplate

The main differences to Mathias' boilerplate are as follows:

  - This README is written in reStructuredText
  - I use sass.js as CSS extension
  - I cleaned up the code to comply with JSLint coding guidelines
  - I use the html5-boilerplate as a submodule. Many of its ressources (such as
    favicon or .js files) will be used.
  - The main html5-boilerplate stylesheet gets sliced into two pieces, so that
    you can write your own styles using sass in a seperate file. The
    assetmanager then compiles the sass file to css and merges it back into the
    original html5-boilerplate stylesheets.

Installation
============

Clone this repository, install all prerequisites and run the initialization
script::

  git clone https://github.com/mbrochh/node-express-boilerplate yourproject
  cd yourproject
  npm install
  chmod +x bin/initproject.sh
  ./bin/initproject.sh node app.js
  node server.js
