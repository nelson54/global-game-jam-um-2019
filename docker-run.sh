#!/bin/bash

docker run -it -p 3000:3000 -v $PWD:/app node-game
