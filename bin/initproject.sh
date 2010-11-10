#!/bin/sh

echo "Updating git submodules"
git submodule update --init --recursive

echo "Creating static folders"
mkdir ./public/img
mkdir ./public/css
mkdir ./public/js

echo "Copying html5-boilerplate stuff we need"
cp ./lib/html5-boilerplate/404.html ./views/404.jade
cp ./lib/html5-boilerplate/apple-touch-icon.png ./public/apple-touch-icon.png
cp ./lib/html5-boilerplate/favicon.ico ./public/favicon.ico
cp ./lib/html5-boilerplate/robots.txt ./public/robots.txt
cp -r ./lib/html5-boilerplate/js ./public
cp -r ./lib/html5-boilerplate/css ./public

echo "Splitting up html5-boilerplate css"
SPLIT=`grep -n "/* Primary Styles" ./public/css/style.css | awk -F":" '{ print $1 }'`
SPLITHEAD=`expr $SPLIT - 1`
SPLITTAIL=`expr $SPLIT + 3`
head --lines=$SPLITHEAD ./public/css/style.css > ./public/css/boilerplate.css
tail -n +$SPLITTAIL ./public/css/style.css > ./public/css/boilerplate_media.css

echo "Removing the stuff we dont want..."
rm -rf .git
rm -rf bin
rm README.rst
rm ./public/css/style.css

echo "Initing the new git project..."
git init
git add .
git commit -m "Initial Commit"