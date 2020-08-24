#!/bin/bash

rm -rf dist

ng build "--configuration=test" "--aot"
