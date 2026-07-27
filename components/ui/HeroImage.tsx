"use client";

import { motion } from "motion/react";
import React from "react";
import Image from "next/image";
const HeroImage = () => {
  const Motionimage = motion.create(Image);
  return (
    <div className="w-screen md:h-[50%] relative pb-120 lg:w-[50%] lg:h-full lg:p-1.5 ">
      <Motionimage
        src="/laptop on desk.jpg"
        alt="hero image"
        width={800}
        height={270}
        priority
        animate={{
          opacity: [1, 1, 0, 0, 0],
        }}
        style={{
          opacity: 1,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 p-1.5 h-120 md:h-full   rounded-xl object-cover w-full"
      />
      <Motionimage
        src="/perfume.jpg"
        alt="hero image"
        width={800}
        loading="eager"
        height={270}
        style={{
            opacity: 0,
        }}
        animate={{
            opacity: [0, 1, 1, 0, 0],
        }}
        transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
        }}
        className="absolute inset-0 p-1.5 h-120 md:h-full   rounded-xl object-cover w-full"
      />
        <Motionimage
          src="/leather.jpg"
          alt="hero image"
          width={800}
          height={270}
          animate={{
            opacity: [0, 0, 1, 1, 0],
          }}
          style={{
            opacity: 0,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0  p-1.5 h-120 md:h-full   rounded-xl object-cover w-full"
        />
      <Motionimage
        src="/chair.jpg"
        alt="hero image"
        width={800}
        height={270}
        animate={{
          opacity: [0, 0, 0, 1, 1],
        }}
        style={{
          opacity: 0,
        }}
        loading="eager"
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0  p-1.5 h-120 md:h-full   rounded-xl object-cover w-full"
      />
    </div>
  );
};

export default HeroImage;
