#!/bin/sh
# sudo apt-get install teensy-loader-cli
# curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | BINDIR=~/.local/bin sh
teensy_loader_cli --mcu=TEENSY40 program.hex