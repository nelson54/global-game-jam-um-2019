#!/bin/bash

docker run -it -p 3000:3000 -v $PWD/src:/app/src -v $PWD/assets:/app/assets node-game
