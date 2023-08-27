'use client'
import React, { useState } from "react";
import SectionTitle from "../common/SectionTitle";
import { SectionGradient } from "../common/section-gradient";

const Demo = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="relative z-10 bg-primary/[.03] py-16 md:py-20 lg:py-28 w-full">
      <div className="container">
        <SectionTitle
          title="Demo Video"
          paragraph="Här kan du se ett exempel på hur vår produkt kan fungera på din hemsida."
          center
        />
        <div className="-mx-4 flex flex-wrap ">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-md relative aspect-[77/40]"
              data-wow-delay=".15s"
            >
              {/* Thumbnail Image */}
              <img
                src="/images/video/video.png"
                alt="video thumbnail"
                className="w-full h-full object-cover rounded-md cursor-pointer"
                onClick={() => setOpen(true)}
              />

              {/* Video Player */}
              {isOpen && (
                <div className="absolute top-0 left-0 w-full h-full ">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/U0Kkja8v6NA"
                    title="YouTube video player"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {/* Play Button */}
              {!isOpen && (
                <div className="absolute top-0 right-0 flex h-full w-full items-center justify-center">
                  <button
                    onClick={() => setOpen(true)}
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
                  >
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      className="fill-current"
                    >
                      <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-[-1]">
        <img src="/images/video/shape.svg" alt="shape" className="w-full" />
      </div>
    </section>
  );
};

export default Demo;
