/*  OctoWS2811 BasicTest.ino - Basic RGB LED Test
    http://www.pjrc.com/teensy/td_libs_OctoWS2811.html
    Copyright (c) 2013 Paul Stoffregen, PJRC.COM, LLC

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

  Required Connections
  --------------------
    pin 2:  LED Strip #1    OctoWS2811 drives 8 LED Strips.
    pin 14: LED strip #2    All 8 are the same length.
    pin 7:  LED strip #3
    pin 8:  LED strip #4    A 100 ohm resistor should used
    pin 6:  LED strip #5    between each Teensy pin and the
    pin 20: LED strip #6    wire to the LED strip, to minimize
    pin 21: LED strip #7    high frequency ringining & noise.
    pin 5:  LED strip #8
    pin 15 & 16 - Connect together, but do not use
    pin 4 - Do not use
    pin 3 - Do not use as PWM.  Normal use is ok.

  This test is useful for checking if your LED strips work, and which
  color config (WS2811_RGB, WS2811_GRB, etc) they require.
*/

#include <OctoWS2811.h>
#include <PNGdec.h>

const int ledPin = 13;

// Only the last strip has this many
const int ledsPerStrip = 4 * 48;
// The first 7 have 3 * 38
const int numStrips = 8;

DMAMEM int displayMemory[ledsPerStrip*numStrips];
int drawingMemory[ledsPerStrip*numStrips];

// The PNG should never actually be this big.
// 3 colours, 8 strips, 150 per strip, 1024 extra for headers and seperator etc
const uint ringLen = 3 * 8 * 150 + 1024;
char ringBuffer[ringLen];
unsigned int ringStart = 0;
unsigned int ringLast = ringLen - 1;
const String SEP = "SEPERATING TEXT";

unsigned int bufferSize = 0;
char dataBuffer[ringLen];

void addCharToRing(char &c) {
  if (ringLast == ringLen - 1) {
    ringLast = 0;
  } else {
    ringLast += 1;
  }
  ringBuffer[ringLast] = c;
}

boolean checkRingForSeperator() {
  unsigned int sepPos;
  if (ringLast < SEP.length()) {
    sepPos = ringLen - (SEP.length() - ringLast);
  } else {
    sepPos = ringLast - SEP.length();
  }
  for (unsigned int i = 0; i < SEP.length(); i++) {
     unsigned int ringI = sepPos + i;
     if (ringI >= ringLen) {
         ringI -= ringLen;
     }
     if (SEP.charAt(i) != ringBuffer[ringI]) {
      return false;
     }
  }
  return true;
}

// Assumed to run after second SEP detected - when ringLast is gonna be next ringStart.
void copyBufferedImage() {
  unsigned int last = ringLast;
  if (last < SEP.length()) {
    last = ringLen - (SEP.length() - last);
  } else {
    last = last - SEP.length();
  }
  copySegmentToDatabuffer(ringStart, last);
  ringStart = ringLast;
}

void copySegmentToDatabuffer(unsigned int start, unsigned int last) {
  if (last > start) {
    // TODO: Figure out how to do this with memove - different from memcpy in c it seems?
    bufferSize = last - start;
    for (unsigned int i = 0; i < bufferSize; i++) {
      unsigned int ri = i + start;
      dataBuffer[i] = ringBuffer[ri];
    }
  } else {
    // TODO: Figure out how to do this with memove - different from memcpy in c it seems?
    unsigned int endChunkSize = ringLen - start;
    bufferSize = endChunkSize + last;
    for (unsigned int i = 0; i < endChunkSize; i++) {
      unsigned int ri = i + start;
      dataBuffer[i] = ringBuffer[ri];
    }
    for (unsigned int i = 0; i < last; i++) {
      unsigned int di = i + endChunkSize;
      dataBuffer[di] = ringBuffer[i];
    }
  }
}

const int config = WS2811_GRB | WS2811_800kHz;

OctoWS2811 leds(ledsPerStrip, displayMemory, drawingMemory, config);

void setup() {
  pinMode(ledPin, OUTPUT);
  leds.begin();
  leds.show();
}

#define RED    0xFF0000
#define GREEN  0x00FF00
#define BLUE   0x0000FF
#define YELLOW 0xFFFF00
#define PINK   0xFF1088
#define ORANGE 0xE05800
#define WHITE  0xFFFFFF

// Less intense...
/*
#define RED    0x160000
#define GREEN  0x001600
#define BLUE   0x000016
#define YELLOW 0x101400
#define PINK   0x120009
#define ORANGE 0x100400
#define WHITE  0x101010
*/

bool ledOn = true;

void loop() {
//  int microsec = 2000000 / leds.numPixels();  // change them all in 2 seconds

  // uncomment for voltage controlled speed
  // millisec = analogRead(A9) / 40;

  while (Serial.available()) {
    char incomingByte = Serial.read();
    addCharToRing(incomingByte);
    if (checkRingForSeperator()) {
      if (ledOn) {
        digitalWrite(ledPin, LOW);    // set the LED off
        ledOn = false;
      } else {
        digitalWrite(ledPin, HIGH);   // set the LED on 
        ledOn = true;
      }
//      copyBufferedImage();
    }
  }

//  colorWipe(RED, microsec);
//  colorWipe(GREEN, microsec);
//  colorWipe(BLUE, microsec);
//  colorWipe(YELLOW, microsec);
//  colorWipe(PINK, microsec);
//  colorWipe(ORANGE, microsec);
//  colorWipe(WHITE, microsec);
}

void colorWipe(int color, int wait)
{
  for (int i=0; i < leds.numPixels(); i++) {
    leds.setPixel(i, color);
    leds.show();
    delayMicroseconds(wait);
  }
}
