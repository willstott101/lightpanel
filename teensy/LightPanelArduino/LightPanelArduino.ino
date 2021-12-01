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

int dataToPixelMap[] = {160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,159,158,157,156,155,154,153,152,151,150,149,148,147,146,145,144,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,223,222,221,220,219,218,217,216,215,214,213,212,211,210,209,208,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,447,446,445,444,443,442,441,440,439,438,437,436,435,434,433,432,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,415,414,413,412,411,410,409,408,407,406,405,404,403,402,401,400,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,319,318,317,316,315,314,313,312,311,310,309,308,307,306,305,304,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,287,286,285,284,283,282,281,280,279,278,277,276,275,274,273,272,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,351,350,349,348,347,346,345,344,343,342,341,340,339,338,337,336,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,479,478,477,476,475,474,473,472,471,470,469,468,467,466,465,464,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463};

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
  defaultImage();
  leds.show();
}

void defaultImage() {
  for (unsigned int y = 0; y < HEIGHT; y++) {
    unsigned int yDataPixIdx = y * WIDTH;
    for (unsigned int x = 0; x < WIDTH; x++) {
      unsigned int dataPixIndex = yDataPixIdx + x;
      // 240, 100, 25 - warm white
      leds.setPixel(dataToPixelMap[dataPixIndex], 0xF06419);
    }
  }
}

void decodeImage() {
  for (unsigned int y = 0; y < HEIGHT; y++) {
    unsigned int yDataPixIdx = y * WIDTH;
    for (unsigned int x = 0; x < WIDTH; x++) {
      unsigned int dataPixIndex = yDataPixIdx + x;
      unsigned int dataIndex = dataPixIndex * 3;
      uint8_t r = dataBuffer[dataIndex];
      uint8_t g = dataBuffer[dataIndex + 1];
      uint8_t b = dataBuffer[dataIndex + 2];
      uint32_t color = (r << 16) + (g << 0) + (b << 8);
//      GREEN = 0x0000FF
//      BLUE = 0x00FF00
//      RED = 0xFF0000
      leds.setPixel(dataToPixelMap[dataPixIndex], color);
    }
  }
}

void loop() {
  while (Serial.available()) {
    byte incomingByte = Serial.read();
    addCharToRing(incomingByte);
    if (checkRingForSeperator()) {
      copyBufferedImage();
      decodeImage();
      toggleOnboardLed();
      leds.show();
    }
  }
}
