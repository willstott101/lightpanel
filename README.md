This is a personal software project for controlling a massively over-complicated low-resolution LED-matrix screen used as my living room light.

For ease of control this project makes use of the excellent OctoWS2811 library and adapter for LED control via a Teensy microcontroller.

Frames are sent over Serial USB to the Teensy from a nodejs process.

The nodejs process is also a webserver which serves a website for controlling the light.

# Engine

The Engine is responsible for taking the current time, and outputting LED colours.

The Engine needs to know the spatial location of each LED in order to be able to create any useful pattern.

We have a simple framework responsible for timing, which can have a "shader" assigned to it. Functions on this shader are called to generate pixel colours. These shaders are analogous to fragment shaders in computer graphics, or "patches" in audio synthesis.

In general, shaders should require no-more than LED location, the current time and a random number to calculate the LED colours. However shaders that make use of images or realtime data might be interesting to experiment with in the future.

# Frontend

Any sensible visual project requires some form of visualization. The frontend is responsible for visualizing the output the Engine is producing, whilst also sending control commands to the backend.

The control commands might include live data (video/touch interactions), or discrete commands like changing the current shader.

Built using svelte the frontend should be very lightweight. Ideally it'll be able to run happily on an old 1st Gen iPad Mini's Safari.

# Backend

The use of node allows me to re-use javascript code for a front-end visualization.

The backend uses a Serial port to communicate with the Teensy, and WAMP to communicate with the frontend.

WAMP is based on websockets and is therefore much more well suited for real-time control than a rest-like HTTP endpoint. Thanks to predictable ordering and very low per-message overhead.

# Lowend

I have a Teensy 4.1 with an OctoWS2811 Adapter on it controlling all my LEDs.

The C++/Processing code for this lives in `teensy` folder. I'm currently planning on using an image format like PNG when transferring pixel data. However I'm not sure it's neccessary, so may fallback to good old `little-endian RGB888`.
