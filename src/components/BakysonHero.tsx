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
  const stageRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<ContainerSize>({ width: 1280, height: 670 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width > 0 && height > 0) {
          setSize({ width, height })
        }
      }
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const slide = heroSlides[index]

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

  const computeMainMaskPath = (w: number, h: number) => {
    const r = 34
    const notchX = Math.round(w * 0.512)
    const notchY = Math.round(h * 0.455)
    const diagTopY = Math.round(h * 0.535)
    const diagBotX = Math.round(w * 0.675)

    return `
      M ${notchX + r},0
      L ${w - r},0
      Q ${w},0 ${w},${r}
      L ${w},${diagTopY - r * 0.65}
      Q ${w},${diagTopY + r * 0.35} ${w - r * 0.65},${diagTopY + r * 1.1}
      L ${diagBotX + r * 0.65},${h - r * 1.1}
      Q ${diagBotX},${h} ${diagBotX - r},${h}
      L ${r},${h}
      Q 0,${h} 0,${h - r}
      L 0,${notchY + r}
      Q 0,${notchY} ${r},${notchY}
      L ${notchX - r},${notchY}
      Q ${notchX},${notchY} ${notchX},${notchY - r}
      L ${notchX},${r}
      Q ${notchX},0 ${notchX + r},0
      Z
    `
  }

  const computeCornerCardPath = (w: number, h: number) => {
    const r = 30
    const gap = 22
    const diagTopY = Math.round(h * 0.535) + gap
    const diagBotX = Math.round(w * 0.675) + gap

    return `
      M ${w - r * 0.65},${diagTopY + r * 1.1}
      Q ${w},${diagTopY} ${w},${diagTopY + r * 1.6}
      L ${w},${h - r}
      Q ${w},${h} ${w - r},${h}
      L ${diagBotX + r * 1.4},${h}
      Q ${diagBotX},${h} ${diagBotX + r * 0.8},${h - r * 1.1}
      Z
    `
  }

  return (
    <section className="min-h-screen w-full bg-[#d6dad8] p-3 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Outer Device / Browser Shell */}
      <div className="relative w-full max-w-[1400px] rounded-[26px] sm:rounded-[32px] bg-[#f4f5f4] p-5 sm:p-8 lg:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.14)] border-[5px] sm:border-[6px] border-[#161717]">
        {/* TOP HEADER NAVIGATION */}
        <header className="relative z-30 flex items-center justify-between gap-4 mb-5 lg:mb-4">
          <a
            href="#top"
            className="hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f3694f] rounded-lg"
          >
            <Image
              src="/images/logo/bakyson-logo.svg"
              alt="Bakyson"
              width={175}
              height={40}
              className="h-7 sm:h-8"
              priority
            />
          </a>

          {/* Desktop Navigation Pill + Order CTA */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-8 rounded-full border border-[#373a39]/45 bg-[#f4f5f4] px-8 py-2.5 text-[11.5px] font-semibold tracking-[0.06em] text-[#373a39]">
              <a href="/about" className="hover:text-[#f3694f] transition-colors">
                About
              </a>
              <a href="#systems" className="hover:text-[#f3694f] transition-colors">
                Systems
              </a>
              <a href="/services" className="hover:text-[#f3694f] transition-colors">
                Industries
              </a>
              <a href="#contact" className="hover:text-[#f3694f] transition-colors">
                Contact
              </a>
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[#373a39] pl-5 pr-1.5 py-1.5 text-[11.5px] font-semibold tracking-[0.06em] text-white transition-all hover:bg-[#222423]"
            >
              <span>Book a Demo</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f5f4] text-[#373a39] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
              </span>
            </a>
          </nav>

          {/* Mobile Hamburger Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#373a39] pl-3.5 pr-1 py-1 text-[11px] font-semibold tracking-wider text-white"
            >
              <span>Book</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f4f5f4] text-[#373a39]">
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#373a39]/40 text-[#373a39]"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mb-5 rounded-2xl border border-[#373a39]/20 bg-white p-4 shadow-lg">
            <div className="flex flex-col gap-3 text-xs font-semibold tracking-wider text-[#373a39]">
              <a href="/about" onClick={() => setMobileMenuOpen(false)}>
                About
              </a>
              <a href="#systems" onClick={() => setMobileMenuOpen(false)}>
                Systems
              </a>
              <a href="/services" onClick={() => setMobileMenuOpen(false)}>
                Industries
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
            </div>
          </div>
        )}

        {/* HERO STAGE */}
        <div
          ref={stageRef}
          className="relative w-full lg:h-[660px] xl:h-[700px]"
        >
          {/* Dynamic Pixel-Exact SVG Clip Paths for Desktop */}
          <svg width="0" height="0" className="hidden lg:block absolute pointer-events-none" aria-hidden="true">
            <defs>
              <clipPath id="hero-main-exact" clipPathUnits="userSpaceOnUse">
                <path d={computeMainMaskPath(size.width, size.height)} />
              </clipPath>
              <clipPath id="hero-corner-exact" clipPathUnits="userSpaceOnUse">
                <path d={computeCornerCardPath(size.width, size.height)} />
              </clipPath>
            </defs>
          </svg>

          {/* TOP-LEFT EDITORIAL & CTA BLOCK */}
          <div className="relative z-20 w-full lg:w-[49%] pt-1 pb-7 lg:pb-0">
            {/* Brand + Vertical Lockup */}
            <div className="flex items-center gap-3.5 sm:gap-5 select-none mb-4">
              <Image
                src="/images/logo/bakyson-logo.svg"
                alt="Bakyson"
                width={148}
                height={34}
                className="h-[72%] w-auto text-[#373a39]"
                priority
              />
              <div className="h-14 sm:h-20 w-[1.5px] bg-[#373a39]/60" />
              <span className="text-[#f3694f] font-semibold text-sm sm:text-base tracking-tight uppercase">
                {slide.model}
              </span>
            </div>

            {/* Sub-row: Mini Hand-Held Thumbnail + Description + Pill Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              <div className="relative h-[136px] w-[144px] sm:h-[160px] sm:w-[170px] shrink-0 overflow-hidden rounded-[22px] bg-[#dfd9d2] shadow-sm">
                <Image
                  src={slide.thumbnail}
                  alt={`${slide.model} thumbnail`}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col justify-between max-w-[325px]">
                <p className="text-[15px] sm:text-[15.5px] leading-[1.45] font-medium text-[#4e5250]">
                  {slide.subhead}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-1.5">
                  <a
                    href="#contact"
                    className="rounded-full border border-[#373a39]/50 px-4 py-2 text-[11px] font-semibold tracking-[0.05em] text-[#373a39] transition-colors hover:bg-[#373a39] hover:text-white"
                  >
                    {slide.primaryCta}
                  </a>

                  <a
                    href={slide.secondaryHref}
                    className="rounded-full border border-[#373a39]/50 px-5 py-2 text-[11px] font-semibold tracking-[0.05em] text-[#373a39] transition-colors hover:bg-[#373a39] hover:text-white"
                  >
                    {slide.secondaryCta}
                  </a>

                  <a
                    href={slide.secondaryHref}
                    aria-label={`Explore ${slide.model} Systems`}
                    className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#373a39] text-white transition-transform hover:scale-105"
                  >
                    <ArrowUpRight className="h-4 w-4 stroke-[2.2] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN HERO PHOTOGRAPH */}
          <div
            style={{
              clipPath:
                typeof window !== 'undefined' && window.innerWidth >= 1024
                  ? 'url(#hero-main-exact)'
                  : undefined,
            }}
            className="relative lg:absolute lg:inset-0 w-full h-[380px] sm:h-[460px] lg:h-full rounded-[26px] lg:rounded-none overflow-hidden bg-[#2f2a25]"
          >
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
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}

            {/* Decorative center play button */}
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
            <div className="absolute top-1/3 left-1/4 w-10 h-10 border-4 border-[#373a39]/20 border-t-[#f3694f] rounded-full animate-spin z-20" />
            <div className="absolute bottom-1/4 right-1/5 w-10 h-10 border-4 border-[#373a39]/20 border-t-[#f3694f] rounded-full animate-spin z-20" />
          </div>

          {/* BOTTOM-RIGHT DIAGONAL FEATURE CARD (Desktop) */}
          <div
            style={{
              clipPath: 'url(#hero-corner-exact)',
            }}
            className="hidden lg:block absolute inset-0 z-20 pointer-events-none"
          >
            <div className="absolute bottom-0 right-0 w-[33%] h-[46.5%] bg-[#4b4d4c] overflow-hidden pointer-events-auto group">


              {/* Close-Up Product / Equipment Render */}
              <Image
                src={slide.detailMedia}
                alt={`${slide.model} detail`}
                className="relative z-10 h-full w-full object-contain object-bottom translate-y-2 translate-x-2 scale-105 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)]"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>
          </div>

          {/* Mobile / Tablet Fallback Feature Strip for the Bottom-Right Render */}
          <div className="mt-4 lg:hidden relative overflow-hidden rounded-[22px] bg-gradient-to-r from-[#3b3d3c] to-[#232524] p-5 flex items-center justify-between">
            <div className="z-10 max-w-[60%]">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#f3694f]">
                Bakyson · {slide.model}
              </span>
              <h2 className="mt-1 text-base font-semibold text-white">
                {slide.headline}
              </h2>
              <p className="mt-1 text-xs text-white/75">
                {slide.subhead}
              </p>
            </div>
            <Image
              src={slide.detailMedia}
              alt={`${slide.model} detail`}
              className="h-28 w-28 object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
