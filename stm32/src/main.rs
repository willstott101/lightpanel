#![no_main]
#![no_std]

// Halt on panic
use panic_halt as _; // panic handler

use cortex_m_rt::entry;
use stm32g4xx_hal as hal;

use ws2812_spi as ws2812;

use hal::delay::{Delay, DelayFromCountDownTimer};
use hal::stm32;
use hal::prelude::*;
use hal::time::ExtU32;
use hal::time::RateExtU32;
use hal::timer::Timer;
use hal::spi;
use ws2812::Ws2812;

use smart_leds::{gamma, SmartLedsWrite, RGB8, hsv::Hsv, hsv::hsv2rgb};
use smart_leds::{colors};

#[entry]
fn main() -> ! {
    let dp = stm32::Peripherals::take().expect("cannot take peripherals");
    // Constrain clocking registers
    let mut rcc = dp.RCC.constrain();
    // let clocks = rcc.cfgr.sysclk(48_000.kHz()).freeze();
    
    // let mut delay = Delay::new(cp.SYST, &clocks);
    let timer2 = Timer::new(dp.TIM2, &rcc.clocks);
    let mut delay_tim2 = DelayFromCountDownTimer::new(timer2.start_count_down(1u32.millis()));

    // GPIOA used for SPI
    let gpioa = dp.GPIOA.split(&mut rcc);

    // turn onboard led on - there is a pin conflict on this board :(
    // let mut led = gpioa.pa5.into_push_pull_output();
    // led.set_low();

    // Configure pins for SPI
    let sclk = gpioa.pa5.into_alternate();
    // PA7 is CN5 - 4 on the back of my nucleo board
    let mosi = gpioa.pa7.into_alternate();     // PA7 is output going to data line of leds

    // SPI1 with 3Mhz
    let spi = dp
        .SPI1
        .spi((sclk, spi::NoMiso, mosi), spi::MODE_0, 2_400.kHz(), &mut rcc);

    let mut ws = Ws2812::new(spi);

    const LED_NUM: usize = 50;
    let mut data: [RGB8; 50] = [colors::WHITE; LED_NUM];

    // loop {
    //     spi.send(127 as u8).unwrap();

    //     // for j in 0..256 {
    //     //     for i in 0..LED_NUM {
    //     //         // rainbow cycle using HSV, where hue goes through all colors in circle
    //     //         // value sets the brightness
    //     //         let hsv = Hsv{hue: ((i * 3 + j) % 256) as u8, sat: 255, val: 100};

    //     //         data[i] = hsv2rgb(hsv);
    //     //     }
    //     //     // before writing, apply gamma correction for nicer rainbow
    //     //     ws.write(gamma(data.iter().cloned())).unwrap();
    //     //     // delay.delay_ms(10u32);
    //     //     delay_tim2.delay_ms(10_u16);
    //     // }
    // }

    loop {
        // for i in 0..LED_NUM {
        //     // rainbow cycle using HSV, where hue goes through all colors in circle
        //     // value sets the brightness
        //     let hsv = Hsv{hue: ((i * 3 + j) % 256) as u8, sat: 255, val: 100};

        //     data[i] = hsv2rgb(hsv);
        // }
        // // before writing, apply gamma correction for nicer rainbow
        // ws.write(gamma(data.iter().cloned())).unwrap();
        ws.write(data.iter().cloned()).unwrap();
        // delay.delay_ms(10u32);
        delay_tim2.delay_ms(1_u16);
    }
}