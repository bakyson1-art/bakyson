# Bakyson Page Specifications

## Page 1: Home (/)

### Purpose
Hero landing page that communicates Bakyson's value proposition, services, proven work, and clear CTAs.

### Sections (Top to Bottom)

#### 1. Navigation Bar (Sticky)
- Logo: "B" mark + "Bakyson" wordmark (italic)
- Links: Home, About, Services, Portfolio, Case Studies, Blog, Careers, Contact, Client Portal
- CTA: "Client Portal" button (orange, primary variant)
- Mobile: hamburger menu

#### 2. Hero Section
- Badge: "Now Serving 15+ Countries Across Sub-Saharan Africa" (orange pill)
- H1: "Reinvent Your Business with Cutting-Edge ICT Solutions" (orange/black gradient text)
- Subhead: 2-3 sentence description of Bakyson's mission
- CTAs: "Explore Services" (primary orange), "Client Portal" (outline black)
- Visual: Hero image with overlay badge showing "99.9% System Uptime SLA"

#### 3. Services Section
- Section header: "Powering Africa's Smart Buildings"
- 6 service cards in responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Each card: icon, title, subtitle, description, feature list (4-5 items)
- Hover: border orange, shadow lift

#### 4. About Section
- Split layout: text left, image right
- Heading: "Designing and Building ELV Solutions for Sub-Saharan Africa"
- 2 paragraphs about mission and coverage
- Cornerstone tags: Innovation, Experience, Knowledge, Commitment, Coverage

#### 5. Case Studies Section
- Heading: "Proven Impact Across the Continent"
- 4 case study cards with image, title, location, solution, "Read story" link
- Hover: shadow-xl, border orange

#### 6. Portfolio Map Section
- Heading: "Where We've Built Across Africa"
- Interactive map visualization (left), project details panel (right)
- Map pins clickable to select project
- Country chips: NG, KE, ZA, GH

#### 7. CTA Section
- Dark background (black) with orange accent border
- Heading: "Ready to Transform Your Business?"
- CTAs: "Get a Free Quote" (primary), "Client Portal" (outline white)

### Footer
- Logo, description, social links (Facebook, Instagram)
- Services links (6 categories)
- Industries links (6 categories)
- Contact: phone, email, locations
- Legal: Terms, Cookie Policy, Privacy Policy
- Copyright: © {year} Bakyson

---

## Page 2: About (/about)

### Sections
1. **Hero**: Dark background, heading "Designing and Building ELV Solutions for Sub-Saharan Africa"
2. **Who We Are**: Split layout, image + text about mission and focus sectors
3. **Cornerstones**: 5 cards (Innovation, Experience, Knowledge, Commitment, Coverage)
4. **Stats**: 4 stat cards (15+ Countries, 500+ Projects, 3 Hubs, 24/7 Support)
5. **CTA**: Orange background, "Partner With Us", contact link

---

## Page 3: Services (/services)

### Sections
1. **Hero**: Dark background, "Affordable, Cutting-Edge ICT Solutions for Africa"
2. **Service Families**: 6 cards (Infotainment, Network, Safety & Security, Audio Visual, Green Solutions, Back of House)
   - Each: icon, title, subtitle, description, 5 features list
3. **Industries We Serve**: 6 chips (Hotels, Hospitals, Corporates, Learning Institutions, Events & Stadia, Telcos & ISPs)
4. **CTA**: Orange background, "Let's Design Your ICT Solution"

---

## Page 4: Portfolio (/portfolio)

### Purpose
Map-oriented project showcase with interactive map visualization.

### Sections
1. **Hero**: "Where We've Built Across Africa"
2. **Map + Details Split**:
   - Left: Map visualization with clickable pins (8 projects)
   - Right: Selected project details (sector badge, title, location, solution, "View Case Study" link)
   - Bottom: Quick project list (first 4)
3. **Country Presence**: Grid of 5 countries (Nigeria, Kenya, South Africa, Ghana, DRC) with project counts and cities
4. **CTA**: "Schedule a Visit"

### Map Data (8 Projects)
- JW Marriott Nairobi (Hospitality, Kenya)
- Aga Khan University Hospital Kisumu (Healthcare, Kenya)
- African Reagent Accra (Corporate, Ghana)
- Hilton Accra Cantonments (Hospitality, Ghana)
- Kertel Suites Kinshasa (Hospitality, DRC)
- John Wood Abuja (Corporate, Nigeria)
- Peduase Valley Resort (Hospitality, Ghana)
- The Pearl Abuja (Hospitality, Nigeria)

---

## Page 5: Case Studies (/case-studies)

### Purpose
Detailed project stories with results and metrics.

### Listing Page
- Hero: "Proven Impact Across the Continent"
- Grid of 4 case study cards
- Each: image, sector badge, title, location, duration, team size, date, "Read story" link
- CTA: "Contact Sales"

### Detail Pages (/case-studies/[id])
- Hero image
- Client, location, sector, solution badges
- Challenge paragraph
- Solution paragraph
- Results: 4 bullet points with metrics
- Meta: duration, team size, date

### Case Studies (4):
1. JW Marriott Nairobi — Hospitality — Interactive IPTV & Digital Signage
2. Aga Khan University Hospital Kisumu — Healthcare — Nurse Call & Access Control
3. African Reagent Accra — Corporate — Network Infrastructure & HSIA
4. Hilton Accra Cantonments — Hospitality — Audio Visual & Meeting Rooms

---

## Page 6: Blog (/blog)

### Purpose
Industry insights and technology trends.

### Sections
1. **Hero**: "Industry Insights & Technology Trends"
2. **Post Grid**: 4 posts with image, category badge, title, excerpt, read time, author, date
3. **Newsletter CTA**: Orange background, email input + subscribe button

### Posts (4):
1. Smart Hotel Technology Trends Shaping 2025 (Hospitality, Nov 15, 2024)
2. Why Nurse Call Systems Are Critical for Modern Hospitals (Healthcare, Oct 28, 2024)
3. Structured Cabling: The Foundation of Corporate IT (Corporate, Oct 10, 2024)
4. Green Building Solutions for African Schools (Education, Sep 20, 2024)

---

## Page 7: Careers (/careers)

### Purpose
Job listings + application form.

### Sections
1. **Hero**: "Build the Future of ICT in Africa"
2. **Open Positions**: 4 job cards (Senior Network Engineer, Sales Executive, Security Systems Technician, Project Coordinator)
   - Each: department badge, title, location, type, description, requirements list, "Apply for this role" button
3. **Open Application CTA**: "Don't See a Match?" section
4. **Application Modal**: Form with name, email, phone, cover letter, resume upload

### Jobs:
1. Senior Network Engineer — Nairobi, Kenya — Engineering — Full-time
2. Sales Executive — Lagos, Nigeria — Sales — Full-time
3. Security Systems Technician — Johannesburg, South Africa — Technical — Full-time
4. Project Coordinator — Accra, Ghana — Operations — Full-time

---

## Page 8: Contact (/contact)

### Purpose
Contact information + quote request form.

### Sections
1. **Hero**: "Ready to Transform Your Business?"
2. **Two-column layout**:
   - Left: Contact Information (3 office cards: Lagos, Nairobi, Johannesburg) + Live Chat Support
   - Right: Request a Quote form (name, email, phone, company, service select, message)
3. Form submits to /api/contact

### Offices:
- Nigeria Office — Lagos — Victoria Island — +234 1 234 5678 — lagos@bakyson.com
- Kenya Office (HQ) — Nairobi — Westlands — +254 706 897 778 — nairobi@bakyson.com
- South Africa Office — Johannesburg — Sandton — +27 10 123 4567 — johannesburg@bakyson.com

---

## Page 9: Client Portal — Login (/portal/login)

### Purpose
Secure customer login with 2FA.

### Elements
- Logo: "Bakyson Portal"
- Form: Email (required), Password (required with show/hide toggle)
- Submit: "Sign In"
- Demo credentials displayed: demo@bakyson.com / demo123
- Link: Contact account manager for access
- On success: redirect to /portal/2fa

---

## Page 10: Client Portal — 2FA (/portal/2fa)

### Purpose
Two-factor authentication.

### Elements
- 6-digit code input (separate boxes)
- Error message for invalid code
- "Resend code" with countdown timer (60s)
- "Back to login" link
- On success: redirect to /portal/dashboard

---

## Page 11: Client Portal — Dashboard (/portal/dashboard)

### Purpose
Client project management dashboard.

### Sections
1. **Top Navigation**: My Projects, Support Tickets, Documents tabs + notifications + user profile + sign out
2. **Welcome**: "Welcome back, John" + subtitle
3. **Quick Stats**: 4 stat cards (Active Projects, Open Tickets, Completed, Account Manager)
4. **Tab Content**:
   - My Projects: grid of project cards (status badge, progress bar, dates, manager, view link)
   - Support Tickets: table (ID, subject, status, priority, date) + "New Ticket" button
   - Documents: grid of downloadable files (contract, certificate, SOW)
5. **New Ticket Modal**: subject, description, priority select, submit

---

## Component Inventory

### Existing Components (to be rebuilt with design system)
- Navbar → ClientShell (sticky, responsive, mobile menu)
- Footer → Footer component
- Buttons → primary, secondary, outline, ghost variants
- Cards → service cards, case study cards, project cards, portal cards
- Forms → contact form, careers form, login form, 2FA form, ticket form
- Modals → careers application, new support ticket
- Maps → portfolio map visualization
- Live chat widget

### New Components (to add)
- shadcn/ui Button, Card, Dialog, Form, Input, Badge, Alert, Toast, Skeleton
- motion/react animated components
- Service card with icon + features list
- Case study card with metrics
- Map pin component
- Portal navigation sidebar
- Stat card
- Project card with progress bar

### Accessibility Requirements (All Pages)
- Skip to main content link
- Semantic HTML (header, nav, main, section, footer)
- Heading hierarchy (h1 → h2 → h3)
- Focus rings on all interactive elements
- Alt text on all meaningful images
- Aria-labels on icon-only buttons
- Form labels with htmlFor/id pairing
- Error messages with role="alert" and aria-describedby
- Keyboard navigation testable
- Contrast ratios 4.5:1 minimum
- Touch targets min 44x44px

### Motion Requirements (All Pages)
- Page transitions with AnimatePresence mode="wait"
- Hover states on buttons/cards/links
- Stagger on list entrances
- Scroll reveals on key sections
- Reduced motion support (useReducedMotion)
- No layout property animations (width, height, top, left)
