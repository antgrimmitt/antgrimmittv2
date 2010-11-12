
Node HTML5 Express Boilerplate
==============================

this is my take on a node-boilerplate heavily influenced by Mathias Pettersson's
node-express-boilerplate. For more information see
https://github.com/mape/node-express-boilerplate

The main differences to Mathias' boilerplate are as follows:

  - This README is written in reStructuredText
  - I use jade.js as the templating engine
  - I use sass.js as CSS extension
  - I cleaned up the code to comply with JSLint coding guidelines
  - I use connect-assetmanager to merge and minify all .js and .css ressources
  - I use the html5-boilerplate as a submodule. Many of its ressources (such as
    favicon or .js files) will be used. It's index.html will be transformed into
    layout.jade by me soon.
  - The main html5-boilerplate stylesheet gets sliced into two pieces, so that
    you can write your own styles using sass in a seperate file. The
    assetmanager then compiles the sass file to css and merges it back into the
    original html5-boilerplate stylesheets.

Installation
============

Install the prerequisites::

  npm install connect npm install connect-assetmanager npm install
  connect-assetmanager-handlers npm install express npm install sass npm install
  jade

Clone this repository and run the initialization script::

  git clone https://github.com/mbrochh/node-express-boilerplate yourproject cd
  yourproject chmod +x bin/initproject.sh ./bin/initproject.sh node app.js
