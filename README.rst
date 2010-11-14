
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

Prerequisites
=============

  - Install ``node.js``. For more information see the node.js repo:
    https://github.com/ry/node
  - Install ``npm``. Again for more information see the public repo:
    https://github.com/isaacs/npm
  - You can install all prerequisites by using ``npm install`` or install
    them manually. Have a look at ``package.json`` for the names of the
    neccessary modules.

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

Usage
=====

Just start developing your website by altering ``public/css/styles.sass`` and
``views/index.ejs``. Everytime you save your files your browser should be
updated and reflect the changes. If you use ``node-inspector`` (install it via
npm as well) your server will even restart automatically on changes in your
node application files.

By creating a folder ``public/img/overlays`` and placing images with filenames
like ``index.png`` or ``index-centered.png`` you can overlay your html with
your pixel perfect layouts from photoshop and toggle it with a mouseclick.
It will automativcally be toggled on filechanges as well.
