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

const int onboardLedPin = 13;
bool ledOn = false;
void toggleOnboardLed() {
  if (ledOn) {
    digitalWrite(onboardLedPin, LOW);    // set the LED off
    ledOn = false;
  } else {
    digitalWrite(onboardLedPin, HIGH);   // set the LED on 
    ledOn = true;
  }
}

const unsigned int WIDTH = 16;
const unsigned int HEIGHT = 25;

// Only the last strip has 4 rows
const int ledsPerStrip = 4 * WIDTH;
// Most have have 2 or 3 rows per strip
const int numStrips = 8;

DMAMEM int displayMemory[ledsPerStrip*numStrips];
int drawingMemory[ledsPerStrip*numStrips];

int dataToPixelMap[] = {128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495};

// 3 colours, 25 x 48, + 80 for fun (and the seperator)
const uint ringLen = 3 * HEIGHT * WIDTH + 80;
byte ringBuffer[ringLen];
unsigned int ringStart = 0;
unsigned int ringLast = ringLen - 1;
const String SEP = "SEPERATING TEXT";

unsigned int bufferSize = 0;
byte dataBuffer[ringLen];

void addCharToRing(byte &c) {
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
  pinMode(onboardLedPin, OUTPUT);
  leds.begin();
  leds.show();
  // Serial.begin(57600);
}

void decodeImage() {
//  for (unsigned int y = 0; y < HEIGHT; y++) {
  for (unsigned int y = 0; y < 1; y++) {
    unsigned int yDataPixIdx = y * WIDTH;
    // for (unsigned int x = 0; x < WIDTH; x++) {
    for (unsigned int x = 0; x < 1; x++) {
      unsigned int dataPixIndex = yDataPixIdx + x;
//      unsigned int dataIndex = dataPixIndex * 3;
//      uint8_t r = dataBuffer[dataIndex];
//      uint8_t g = dataBuffer[dataIndex + 1];
//      uint8_t b = dataBuffer[dataIndex + 2];
//      uint32_t color = (r << 24) + (g << 16) + (b << 8);
//      GREEN = 0x0000FF
//      BLUE = 0x00FF00
//      RED = 0xFF0000
      leds.setPixel(dataToPixelMap[dataPixIndex], 0x222222);
    }
  }
}

void loop() {
  while (Serial.available()) {
    byte incomingByte = Serial.read();
    addCharToRing(incomingByte);
    if (checkRingForSeperator()) {
      copyBufferedImage();
      // toggleOnboardLed();
      decodeImage();
      toggleOnboardLed();
      leds.show();
    }
  }
}
