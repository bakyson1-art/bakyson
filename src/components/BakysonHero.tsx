'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { heroSlides } from '@/data/heroData'

interface ContainerSize {
  width: number
  height: number
}

export default function BakysonHero() {
  const [index, setIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const slide = heroSlides[index]

  // Auto-cycle every 7 seconds so visitors can read the full subhead
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length)
    }, 7000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const jumpTo = (i: number) => {
    setIndex(i)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex((idx) => (idx + 1) % heroSlides.length)
    }, 7000)
  }

  return (
    <section className="bg-white overflow-hidden">
      {/* Top navigation bar */}
      <header className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <a href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/logo/bakyson-logo.svg"
            alt="Bakyson"
            width={175}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </a>

        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
          <a href="/about" className="text-[12px] font-semibold text-black hover:text-[#f3694f] transition-colors">
            About
          </a>
          <a href="#systems" className="text-[12px] font-semibold text-black hover:text-[#f3694f] transition-colors">
            Systems
          </a>
          <a href="/services" className="text-[12px] font-semibold text-black hover:text-[#f3694f] transition-colors">
            Industries
          </a>
          <a href="#contact" className="text-[12px] font-semibold text-black hover:text-[#f3694f] transition-colors">
            Contact
          </a>
        </nav>

        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-full bg-[#f3694f] pl-4 pr-2 py-2 text-[11px] font-semibold text-white transition-all hover:bg-black"
        >
          Book a Demo
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
          </span>
        </a>
      </header>

      {/* Hero stage */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* LEFT: Copy + CTA */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 select-none mb-2">
              <Image
                src="/images/logo/bakyson-logo.svg"
                alt="Bakyson"
                width={100}
                height={23}
                className="h-6 w-auto"
              />
              <span className="text-xs font-semibold text-black tracking-wide uppercase">
                {slide.model}
              </span>
            </div>

            <h1
              className="text-3xl lg:text-5xl font-bold text-black leading-tight mb-6"
            >
              {slide.headline}
            </h1>

            <p className="text-lg text-black/[0.85] max-w-lg leading-relaxed mb-8">
              {slide.subhead}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-[#f3694f] text-white px-6 py-4 rounded-lg text-lg font-medium hover:bg-black transition-colors"
              >
                {slide.primaryCta}
              </a>
              <a
                href={slide.secondaryHref}
                className="bg-white text-black border-2 border-black px-6 py-4 rounded-lg text-lg font-medium hover:bg-black hover:text-white transition-colors"
              >
                {slide.secondaryCta}
              </a>
            </div>
          </div>

          {/* RIGHT: Media */}
          <div className="relative h-[500px] lg:h-[650px] rounded-[24px] overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            {slide.mediaType === 'video' ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover object-center"
                poster={slide.thumbnail}
              >
                <source src={slide.media} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={slide.media}
                alt={slide.model}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}

            {/* Play button overlay */}
            <button
              onClick={() => jumpTo(index)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/80 transition z-20"
              aria-label="Play video"
            >
              <svg
                className="w-6 h-6 text-white ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            {/* Decorative loading spinners */}
            <div className="absolute top-1/4 left-1/6 w-10 h-10 border-4 border-black/20 border-t-[#f3694f] rounded-full animate-spin z-20" />
            <div className="absolute bottom-1/4 right-1/6 w-10 h-10 border-4 border-black/20 border-t-[#f3694f] rounded-full animate-spin z-20" />
          </div>
        </div>

        {/* Mobile: media stacked below copy */}
        <div className="mt-8 lg:hidden relative overflow-hidden rounded-[24px] h-[300px] bg-black flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          {slide.mediaType === 'video' ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover object-center"
              poster={slide.thumbnail}
            >
              <source src={slide.media} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={slide.media}
              alt={slide.model}
              className="h-full w-full object-cover object-center"
              sizes="100vw"
              priority
            />
          )}
        </div>
      </div>
    </section>
  )
}
