'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { heroSlides } from '@/data/heroData'
import HeroMainPlaceholder from './HeroMainPlaceholder'

export default function BakysonHero() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 1280,
    height: 670,
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

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

  const jumpTo = (i: number) => {
    setIndex(i)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex((idx) => (idx + 1) % heroSlides.length)
    }, 7000)
  }

  /**
   * Detail card mask: diagonal cut parallel to main photo's diagonal,
   * offset along the normal vector by channel width g.
   */
  const computeCornerCardPath = (w: number, h: number) => {
    const r = 20
    const gap = 16

    const mainDiagX = w * 0.32
    const mainDiagY = h * 0.455
    const mainDiagLen = Math.sqrt(mainDiagX * mainDiagX + mainDiagY * mainDiagY)

    const nx = mainDiagY / mainDiagLen
    const ny = mainDiagX / mainDiagLen

    const diagTopY = Math.round(h * 0.545 + gap * ny)
    const diagBotX = Math.round(w * 0.68 + gap * nx)

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
    <section className="min-h-screen w-full bg-[#f4f5f4] p-3 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Outer Device / Browser Shell */}
      <div className="relative w-full max-w-[1400px] rounded-[26px] sm:rounded-[32px] bg-[#f4f5f4] p-5 sm:p-8 lg:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
        {/* TOP HEADER NAVIGATION */}
        <header className="relative z-30 flex items-center justify-between gap-4 mb-5 lg:mb-4">
          {/* Hero Header Logo */}
          <a
            href="#top"
            className="hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f3694f] rounded-lg"
          >
            <Image
              src="/images/logo/bakyson-logo.svg"
              alt="Bakyson"
              width={150}
              height={34}
              className="h-6 sm:h-7"
              priority
            />
          </a>

          {/* Desktop Navigation Pill + Order CTA */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-8 rounded-full border border-[#0A0A0A]/45 bg-[#f4f5f4] px-8 py-2.5 text-[11px] font-semibold tracking-[0.08em] text-[#0A0A0A]">
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
              className="group inline-flex items-center gap-3 rounded-full bg-[#0A0A0A] pl-5 pr-1.5 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-white transition-all hover:bg-[#f3694f] hover:text-[#0A0A0A]"
            >
              <span>Book a Demo</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f5f4] text-[#0A0A0A] transition-transform duration-300 group-hover:bg-[#f3694f] group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
              </span>
            </a>
          </nav>

          {/* Mobile Hamburger Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] pl-3.5 pr-1 py-1 text-[11px] font-semibold tracking-wider text-white"
            >
              <span>Book</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f4f5f4] text-[#0A0A0A]">
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0A0A0A]/40 text-[#0A0A0A]"
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
          <div className="md:hidden mb-5 rounded-2xl border border-[#0A0A0A]/20 bg-white p-4 shadow-lg">
            <div className="flex flex-col gap-3 text-xs font-semibold tracking-wider text-[#0A0A0A]">
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
        <div className="relative w-full lg:h-[660px] xl:h-[700px]">
          {/* Dynamic Pixel-Exact SVG Clip Paths for Desktop */}
          <svg width="0" height="0" className="absolute pointer-events-none">
            <defs>
              <clipPath id="hero-corner-exact" clipPathUnits="userSpaceOnUse">
                <path d={computeCornerCardPath(size.width, size.height)} />
              </clipPath>
            </defs>
          </svg>

          {/* TOP-LEFT EDITORIAL & CTA BLOCK */}
          <div className="relative z-20 w-full lg:w-[49%] pt-1 pb-7 lg:pb-0">
            {/* Brand Lockup: Logo + Vertical Name */}
            <div className="flex items-center gap-4 sm:gap-6 select-none mb-6">
              <Image
                src="/images/logo/bakyson-logo.svg"
                alt="Bakyson"
                width={132}
                height={30}
                className="h-[75%] w-auto text-[#0A0A0A]"
                priority
              />
              <div className="h-18 sm:h-22 w-[1.5px] bg-[#0A0A0A]/30" />
              <span className="text-[#f3694f] font-black text-sm sm:text-base tracking-tight uppercase">
                {slide.model}
              </span>
            </div>

            {/* Sub-row: Thumbnail + Description + Pill Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              <div className="relative h-[138px] w-[144px] sm:h-[156px] sm:w-[168px] shrink-0 overflow-hidden rounded-[20px] bg-[#f4f5f4] shadow-sm">
                <Image
                  src={slide.thumbnail}
                  alt={`${slide.model} thumbnail`}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col justify-between max-w-[340px]">
                <p className="text-[16px] sm:text-[17px] leading-[1.5] font-medium text-[#0A0A0A]/90">
                  {slide.subhead}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <a
                    href="#contact"
                    className="rounded-full border border-[#0A0A0A]/40 px-5 py-2.5 text-[11px] font-bold tracking-[0.06em] text-[#0A0A0A] transition-all duration-300 hover:bg-[#f3694f] hover:border-[#f3694f] hover:text-white"
                  >
                    {slide.primaryCta}
                  </a>

                  <a
                    href={slide.secondaryHref}
                    className="rounded-full border border-[#0A0A0A]/40 px-6 py-2.5 text-[11px] font-bold tracking-[0.06em] text-[#0A0A0A] transition-all duration-300 hover:bg-[#f3694f] hover:border-[#f3694f] hover:text-white"
                  >
                    {slide.secondaryCta}
                  </a>

                  <a
                    href={slide.secondaryHref}
                    aria-label={`Explore ${slide.model} Systems`}
                    className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] text-white transition-all duration-300 hover:bg-[#f3694f] hover:scale-105"
                  >
                    <ArrowUpRight className="h-4 w-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN HERO IMAGE */}
          <div className="relative lg:absolute lg:inset-0 w-full h-[380px] sm:h-[460px] lg:h-full">
            <HeroMainPlaceholder imageSrc={slide.media} imageAlt={slide.model} />
          </div>

          {/* BOTTOM-RIGHT DIAGONAL FEATURE CARD (Desktop) */}
          <div
            style={{
              clipPath:
                typeof window !== 'undefined' && window.innerWidth >= 1024
                  ? 'url(#hero-corner-exact)'
                  : undefined,
            }}
            className="hidden lg:block absolute inset-0 z-20 pointer-events-none"
          >
            <div className="absolute bottom-0 right-0 w-[32%] h-[44%] bg-[#f4f5f4]/50 overflow-hidden pointer-events-auto group">
              {/* Close-Up Product / Equipment Render */}
              <Image
                src={slide.detailMedia}
                alt={`${slide.model} detail`}
                className="relative z-10 h-full w-full object-contain object-bottom translate-y-2 translate-x-2 scale-105 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_18px_28px_rgba(0,0,0,0.4)]"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>
          </div>

          {/* Mobile / Tablet Fallback Feature Strip */}
          <div className="mt-5 lg:hidden relative overflow-hidden rounded-[24px] bg-[#f4f5f4] p-6 flex items-center justify-between border border-[#0A0A0A]/20">
            <div className="z-10 max-w-[60%]">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#f3694f]">
                Bakyson · {slide.model}
              </span>
              <h2 className="mt-1 text-lg font-bold text-[#0A0A0A]">
                {slide.headline}
              </h2>
              <p className="mt-1 text-xs text-[#0A0A0A]/70">
                {slide.subhead}
              </p>
            </div>
            <Image
              src={slide.detailMedia}
              alt={`${slide.model} detail`}
              className="h-28 w-28 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
