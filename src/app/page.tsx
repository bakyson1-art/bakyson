import BakysonHero from '@/components/BakysonHero'
import AboutSection from '@/components/AboutSection'
import SystemsSection from '@/components/SystemsSection'
import IndustriesSection from '@/components/IndustriesSection'
import ContactSection from '@/components/ContactSection'

export default function HomePage() {
  return (
    <main>
      <BakysonHero />
      <AboutSection />
      <SystemsSection />
      <IndustriesSection />
      <ContactSection />
    </main>
  )
}
