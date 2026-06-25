import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  ShieldCheck,
  X,
} from "lucide-react";
import Preloader from "./components/Preloader";
import { Button } from "@/components/ui/button";
import { Map, MapPopup } from "@/components/ui/map";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const heroImage = new URL("../ChatGPT Image Jun 23, 2026, 04_07_03 PM.png", import.meta.url).href;
const heroVideo = "/videos/hero.mp4";
const aboutImage = new URL("../ChatGPT Image Jun 23, 2026, 04_35_12 PM.png", import.meta.url).href;
const markLogo = new URL("../logo.jpeg", import.meta.url).href;
const starboardPosition = [73.8053755, 18.5658104];
const starboardDirectionsUrl = "https://maps.app.goo.gl/odvkAjdkLbd5YDaz7";

const iconFiles = [
  "ChatGPT Image Jun 23, 2026, 04_19_01 PM.png",
  "ChatGPT Image Jun 23, 2026, 04_16_09 PM.png",
  "ChatGPT Image Jun 23, 2026, 04_21_15 PM.png",
  "ChatGPT Image Jun 23, 2026, 04_23_37 PM.png",
  "ChatGPT Image Jun 23, 2026, 04_28_33 PM.png",
  "ChatGPT Image Jun 23, 2026, 04_28_49 PM.png",
];

const serviceImageFiles = [
  "ChatGPT Image Jun 25, 2026, 10_55_09 AM.png",
  "ChatGPT Image Jun 25, 2026, 10_55_57 AM.png",
  "ChatGPT Image Jun 25, 2026, 10_56_03 AM.png",
  "ChatGPT Image Jun 25, 2026, 10_56_09 AM.png",
  "ChatGPT Image Jun 25, 2026, 10_56_16 AM.png",
  "ChatGPT Image Jun 25, 2026, 10_57_59 AM.png",
];

const achievementIconFiles = [
  "ChatGPT Image Jun 23, 2026, 04_31_58 PM.png",
  "ChatGPT Image Jun 23, 2026, 04_38_02 PM.png",
  "ChatGPT Image Jun 23, 2026, 04_48_12 PM.png",
  "ChatGPT Image Jun 23, 2026, 04_50_49 PM.png",
  "ChatGPT Image Jun 23, 2026, 05_07_59 PM.png",
  "ChatGPT Image Jun 23, 2026, 04_16_09 PM.png",
];

const builderLogos = [
  { name: "Panchshil Realty", file: "panchshil-logo.png" },
  { name: "Amar Builders", file: "amar-dark.png" },
  { name: "Kasturi Housing", file: "kasturi-logo.svg" },
  { name: "Lodha Group", file: "png-clipart-brand-logo-product-design-font-group-logo-text-logo-thumbnail.png" },
  { name: "Kolte Patil Developers", file: "kolte_patil-removebg-preview.png" },
  { name: "Supreme Universal", file: "Screenshot 2026-06-23 173027.jpg" },
  { name: "Kalpataru", file: "kalpataru.png" },
  { name: "Gera Developments", file: "gera builder.webp" },
  { name: "Godrej Properties", file: "Godraje_-removebg-preview.png" },
  { name: "Kohinoor Group", file: "Kohinoor_Group-removebg-preview.png" },
  { name: "Kumar Properties", file: "Kumar_Properties_New_Logo_02.png" },
  { name: "Shapoorji Pallonji", file: "shapoorji pallonji.png" },
  { name: "ANP Corp", file: "ANP-removebg-preview.png" },
  { name: "VTP Realty", file: "VTP.jpg" },
  { name: "Omicron Group", file: "Omnicom_Group_Logo.png" },
  { name: "Adani Realty", file: "Adani.png" },
  { name: "Solitaire Group", file: "solitar.webp" },
  { name: "Pride Group", file: "pride.png" },
  { name: "Yashada Realty", file: "Yashada-Realty-Logo.webp" },
  { name: "Nandan Buildcon", file: "nandan.png" },
];

const opportunityImages = {
  "57 Avenue Mundhwa": "Panchashil.png",
  "The Balmoral Hillside": "Kasturi.jpg",
  "Jayka Baner": "Jayaka.jpg",
  "7 Modibaug Suma Shilp": "Suma Shilpa.jpg",
  "Amar Oasis Baner": "Amar.jpg",
  "Malpani Premium Residences": "Malpani.jpg",
};

const iconAsset = (file) => new URL(`../icons/${file}`, import.meta.url).href;
const serviceAsset = (file) => new URL(`../Services/${file}`, import.meta.url).href;
const builderAsset = (file) => new URL(`../Builders Logo/${file}`, import.meta.url).href;
const opportunityAsset = (file) => new URL(`../FEATURED OPPORTUNITIES/${file}`, import.meta.url).href;
const pdfAsset = (file) => `/PDF/${encodeURIComponent(file)}`;

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/starboard-realtors/",
    path: "M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.36 7.89h4.28V21H.36V7.89ZM7.24 7.89h4.1v1.79h.06c.57-1.08 1.96-2.22 4.04-2.22 4.32 0 5.12 2.84 5.12 6.54V21h-4.27v-6.22c0-1.48-.03-3.39-2.07-3.39-2.07 0-2.39 1.62-2.39 3.28V21H7.24V7.89Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/starboardrealtors",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.91.33 4.14.63c-.8.31-1.48.73-2.15 1.41C1.31 2.71.89 3.39.58 4.19.28 4.96.08 5.83.02 7.1-.04 8.38-.05 8.79-.05 12.05s.01 3.67.07 4.95c.06 1.27.26 2.14.56 2.91.31.8.73 1.48 1.41 2.15.67.68 1.35 1.1 2.15 1.41.77.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.14-.26 2.91-.56.8-.31 1.48-.73 2.15-1.41.68-.67 1.1-1.35 1.41-2.15.3-.77.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.14-.56-2.91-.31-.8-.73-1.48-1.41-2.15-.67-.68-1.35-1.1-2.15-1.41-.77-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8.01 4 4 0 0 1 0 8.01Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@starboardrealtors2646",
    path: "M23.5 6.2a3 3 0 0 0-2.11-2.12C19.53 3.58 12 3.58 12 3.58s-7.53 0-9.39.5A3 3 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3 3 0 0 0 2.11 2.12c1.86.5 9.39.5 9.39.5s7.53 0 9.39-.5a3 3 0 0 0 2.11-2.12c.5-1.87.5-5.8.5-5.8s0-3.93-.5-5.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/message/DSNUILFNWD23N1",
    path: "M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.43 0 .05 5.38.05 11.99c0 2.11.55 4.18 1.6 6L0 24l6.16-1.62a11.94 11.94 0 0 0 5.88 1.5h.01c6.61 0 11.99-5.38 11.99-11.99 0-3.2-1.25-6.21-3.52-8.41ZM12.05 21.86h-.01a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.65.96.98-3.56-.23-.37a9.9 9.9 0 0 1-1.52-5.3c0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c-.01 5.45-4.45 9.87-9.91 9.87Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.07c.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z",
  },
];

function SocialIcon({ path }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor">
      <path d={path} />
    </svg>
  );
}

const navItems = ["Home", "About", "Services", "Properties", "Why Us", "Testimonials", "Contact"];

const services = [
  {
    title: "Commercial Leasing",
    image: serviceImageFiles[0],
    icon: iconFiles[0],
    copy: "Grade-A office and retail leasing guided by location intelligence, negotiation clarity, and end-to-end documentation.",
  },
  {
    title: "Commercial Sales",
    image: serviceImageFiles[1],
    icon: iconFiles[1],
    copy: "Curated commercial assets for occupiers and investors seeking strong visibility, access, and long-term value.",
  },
  {
    title: "Retail Leasing",
    image: serviceImageFiles[2],
    icon: iconFiles[2],
    copy: "High-street, mall, and destination retail placements aligned with footfall, frontage, and brand positioning.",
  },
  {
    title: "Investment Advisory",
    image: serviceImageFiles[3],
    icon: iconFiles[3],
    copy: "Research-backed advisory for premium real estate investments, portfolio goals, and discreet acquisition strategy.",
  },
  {
    title: "Luxury Residential",
    image: serviceImageFiles[4],
    icon: iconFiles[4],
    copy: "Luxury homes shortlisted through lifestyle fit, developer reputation, location strength, and future appreciation.",
  },
  {
    title: "Property Consulting",
    image: serviceImageFiles[5],
    icon: iconFiles[5],
    copy: "Personalized consulting across selection, pricing, due diligence, negotiation, and transaction coordination.",
  },
];

const opportunities = [
  {
    title: "57 Avenue Mundhwa",
    meta: "Premium 3.5 & 4.5 BHK Residences",
    price: "Rs 4.50 Cr* Onwards",
    image: opportunityImages["57 Avenue Mundhwa"],
  },
  {
    title: "The Balmoral Hillside",
    meta: "Ultra Luxury Living, 4.5 & 5.5 BHK",
    price: "Rs 5.67 Cr* Onwards",
    image: opportunityImages["The Balmoral Hillside"],
    brochure: pdfAsset("The Balmoral Hillside Brochure Tower A & B.pdf"),
  },
  {
    title: "Jayka Baner",
    meta: "Grade A+ Commercial Icon, Offices | Retail",
    price: "Rs 5.69 Cr* Onwards",
    image: opportunityImages["Jayka Baner"],
    brochure: pdfAsset("JST  E brochure.pdf"),
  },
  {
    title: "7 Modibaug Suma Shilp",
    meta: "Exclusive 4 BHK Residences, Ready Possession",
    price: "Rs 8.46 Cr* Onwards",
    image: opportunityImages["7 Modibaug Suma Shilp"],
    brochure: pdfAsset("7 Modibaug Brochure_03 Digital.pdf"),
  },
  {
    title: "Amar Oasis Baner",
    meta: "Ultra Luxury Twin Towers, 4 BHK Residences",
    price: "Rs 8.10 Cr* Onwards",
    image: opportunityImages["Amar Oasis Baner"],
    brochure: pdfAsset("Amar Oasis Digital Brochure (Tower B).pdf"),
  },
  {
    title: "Malpani Premium Residences",
    meta: "Premium lifestyle homes with curated amenities",
    price: "Price On Request",
    image: opportunityImages["Malpani Premium Residences"],
    brochure: pdfAsset("M-RAMANUJAN - Brochure.pdf"),
  },
];

const reasons = [
  "Client-centric advisory approach",
  "Strong market intelligence and research",
  "Transparent and ethical transactions",
  "Access to premium commercial and luxury assets",
  "End-to-end transaction management",
  "Dedicated post-sales support",
];

const achievements = [
  { value: "Rs 75+ Cr", label: "Worth of Transactions Facilitated", icon: achievementIconFiles[0] },
  { value: "150+", label: "Happy Clients", icon: achievementIconFiles[1] },
  { value: "Mandates", label: "Exclusive Sales Mandates Executed", icon: achievementIconFiles[2] },
  { value: "6+", label: "Years of Real Estate Expertise", icon: achievementIconFiles[3] },
  { value: "CXO", label: "Trusted by CXOs, HNIs and Business Owners", icon: achievementIconFiles[4] },
  { value: "Top", label: "Strategic Partnerships with Leading Developers", icon: achievementIconFiles[5] },
];

const testimonials = [
  {
    name: "Dr. Kanchan Sawant",
    role: "Eye Specialist",
    firm: "Shree Ram Netralaya",
    quote:
      "Mr. Sandesh Rolston is a highly professional real estate consultant. He understood our requirements perfectly and made the process smooth.",
  },
  {
    name: "Geetha Garud",
    role: "Associate Director - Pre-Sales",
    firm: "LTIMindtree",
    quote:
      "Sandesh and his team were instrumental in assisting with the sale of my property. Their transparency and professionalism made everything seamless.",
  },
  {
    name: "Murali Nayak",
    role: "Sr. Vice President",
    firm: "Samvardhana Motherson International Ltd.",
    quote:
      "Sandesh Rolston is a true professional and an absolute gentleman. His ability to understand client requirements and preferences is exceptional.",
  },
];

const credentials = [
  ["Founder", "Sandesh Rolston"],
  ["MahaRERA", "A52100030663"],
  ["GST", "27BUSPR1519J1Z1"],
  ["Experience", "6+ Years"],
];

const faqs = [
  {
    question: "What kind of properties does Starboard Realtors specialize in?",
    answer:
      "We focus on premium commercial real estate, retail leasing, investment opportunities, and luxury residential properties across Pune's leading micro-markets.",
  },
  {
    question: "Do you help with both buying and leasing?",
    answer:
      "Yes. Our advisory covers commercial leasing, commercial sales, luxury residential purchases, investment mandates, and end-to-end property consulting.",
  },
  {
    question: "How do you shortlist the right property?",
    answer:
      "We begin with location, budget, business goals, lifestyle needs, and long-term value. Then we curate suitable options, compare market data, and guide the transaction with transparent advice.",
  },
  {
    question: "Can you assist HNIs and business owners with investment advisory?",
    answer:
      "Yes. We work with CXOs, HNIs, founders, and business owners who need discreet, research-backed guidance for premium real estate decisions.",
  },
  {
    question: "Do you provide support after the transaction?",
    answer:
      "Yes. Our team supports documentation coordination, possession assistance, developer communication, and post-sale or post-lease handover needs.",
  },
];

function Logo({ compact = false }) {
  return (
    <a href="#home" className="flex items-center gap-3">
      <img src={markLogo} alt="Starboard Realtors mark" className={compact ? "h-12 w-12 object-cover" : "h-12 w-12 object-cover sm:h-16 sm:w-16"} />
      <div className="leading-none">
        <div className="font-serif text-[1.08rem] uppercase tracking-[0.12em] text-gold sm:text-[1.45rem]">Starboard</div>
        <div className="mt-1 text-[0.58rem] uppercase tracking-[0.32em] text-white sm:text-[0.7rem] sm:tracking-[0.45em]">Realtors</div>
      </div>
    </a>
  );
}

function App() {
  const rootRef = useRef(null);
  const lenisRef = useRef(null);
  const opportunitiesRef = useRef(null);
  const introPlayedRef = useRef(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isPageReady, setIsPageReady] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMapPopup, setShowMapPopup] = useState(true);

  const scrollOpportunities = (direction) => {
    const track = opportunitiesRef.current;
    if (!track) return;

    const firstCard = track.querySelector("article");
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 20 : 380;

    track.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      const headingTargets = gsap.utils
        .toArray("h1, h2, h3, footer h3")
        .filter((item) => {
          const text = item.textContent.trim();
          return text && !item.closest(".site-navbar, .mobile-menu-panel, .preloader, .maplibregl-popup, .leaflet-control-container");
        });

      ScrollTrigger.batch(headingTargets, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 42, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
            {
              y: 0,
              autoAlpha: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.95,
              ease: "power4.out",
              stagger: 0.08,
              clearProps: "transform,opacity,visibility,clipPath",
            },
          );
        },
      });

      gsap.utils.toArray(".reveal").forEach((item) => {
        gsap.from(item, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 86%",
          },
        });
      });

      const compassWatermark = gsap.utils.toArray(".compass-watermark");
      if (compassWatermark.length) {
        gsap.to(compassWatermark, {
          rotate: 360,
          duration: 60,
          repeat: -1,
          ease: "none",
        });
      }
    }, rootRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  useEffect(() => {
    if (!isPageReady || introPlayedRef.current) return;
    const root = rootRef.current;
    if (!root) return;
    introPlayedRef.current = true;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const navbar = q(".site-navbar");
      const heroVisual = q(".hero-visual");
      const heroCopyItems = q(".hero-copy > *");
      const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

      tl.fromTo(
        root,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.05 },
      );

      if (navbar.length) {
        tl.fromTo(navbar, { y: -28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.86 }, "-=0.62");
      }

      if (heroVisual.length) {
        tl.fromTo(heroVisual, { scale: 1.045, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.28 }, "-=0.56");
      }

      if (heroCopyItems.length) {
        tl.fromTo(heroCopyItems, { y: 46, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12 }, "-=0.7");
      }
    }, root);

    return () => ctx.revert();
  }, [isPageReady]);

  const serviceCards = useMemo(
    () =>
      services.map((service) => (
        <article key={service.title} className="service-premium-card reveal group">
          <img src={serviceAsset(service.image)} alt={service.title} className="service-premium-image" />
          <div className="service-premium-overlay" />
          <div className="service-premium-content">
            <span className="service-premium-icon">
              <img src={iconAsset(service.icon)} alt="" />
            </span>
            <h3>{service.title}</h3>
            <p>{service.copy}</p>
          </div>
        </article>
      )),
    [],
  );

  return (
    <>
      {showPreloader && (
        <Preloader
          logoSrc={markLogo}
          onComplete={() => {
            setIsPageReady(true);
            setShowPreloader(false);
          }}
        />
      )}
      <main ref={rootRef} className="site-shell min-h-screen overflow-hidden bg-royal text-white">
      <header className="site-navbar fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-royal/78 backdrop-blur-xl">
        <div className="flex h-[86px] w-full items-center justify-between px-6 lg:px-12">
          <Logo />
          <nav className="hidden items-center gap-8 xl:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/88 transition hover:text-gold">
                {item}
              </a>
            ))}
          </nav>
          <a href="#contact" className="hidden bg-gold px-7 py-4 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-royal shadow-gold transition hover:bg-goldLight xl:inline-flex">
            Consultation
          </a>
          <button
            type="button"
            className="mobile-menu-toggle xl:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className={`mobile-menu-panel xl:hidden ${isMobileMenuOpen ? "is-open" : ""}`}>
          <div className="mb-5 flex items-center gap-3 border-b border-gold/18 pb-5">
            <img src={markLogo} alt="" className="h-11 w-11 object-cover" />
            <div>
              <p className="font-serif text-lg uppercase tracking-[0.13em] text-gold">Starboard</p>
              <p className="text-[0.58rem] uppercase tracking-[0.38em] text-white/70">Realtors</p>
            </div>
          </div>
          <nav className="grid gap-2">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="mobile-nav-link"
                style={{ "--item-index": index }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </a>
            ))}
          </nav>
          <div className="mobile-menu-socials">
            {socialLinks.map(({ label, href, path }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="mobile-social-link" onClick={() => setIsMobileMenuOpen(false)}>
                <SocialIcon path={path} />
              </a>
            ))}
          </div>
          <a href="#contact" className="mobile-consultation" onClick={() => setIsMobileMenuOpen(false)}>
            Book Consultation <ArrowRight size={15} />
          </a>
        </div>
      </header>

      <section id="home" className="relative min-h-[860px] border-b border-gold/25 pt-[86px]">
        <div className="hero-visual absolute inset-0">
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={heroImage} aria-label="Luxury real estate skyline video">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#020E1E_0%,rgba(2,14,30,0.92)_20%,rgba(2,14,30,0.42)_43%,transparent_68%)]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,#020E1E_100%)]" />
        </div>

        <div className="compass-watermark pointer-events-none absolute -left-28 top-64 h-72 w-72 border border-gold/10 opacity-30 [clip-path:polygon(50%_0,58%_42%,100%_50%,58%_58%,50%_100%,42%_58%,0_50%,42%_42%)]" />

        <div className="relative grid min-h-[774px] w-full content-center px-6 py-16 lg:px-12">
          <div className="hero-copy max-w-[620px]">
            <h1 className="hero-title-premium text-[3.9rem] uppercase leading-[0.98] text-white sm:text-[5.4rem]">
              Curating Exceptional <span className="block text-gold">Spaces</span>
            </h1>
            <p className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-white/90">
              <span>Commercial Real Estate</span>
              <span className="text-gold">.</span>
              <span>Luxury Residences</span>
              <span className="text-gold">.</span>
              <span>Investment Advisory</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-5">
              <a href="#properties" className="bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-royal shadow-gold transition hover:bg-goldLight">
                Explore Opportunities
              </a>
              <a href="#contact" className="premium-border px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:border-gold hover:text-gold">
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-8">
        <div className="w-full px-6 lg:px-12">
          <div className="mb-7 flex items-center justify-center gap-4">
            <span className="h-px w-20 bg-gold/40" />
            <h2 className="text-center text-xs font-semibold uppercase tracking-[0.42em] text-gold">Verified Advisory Credentials</h2>
            <span className="h-px w-20 bg-gold/40" />
          </div>
          <div className="credentials-grid reveal">
            {credentials.map(([label, value]) => (
              <div key={label} className="credential-tile">
                <ShieldCheck size={20} className="text-gold" />
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative border-b border-white/10 py-14">
        <div className="grid w-full items-center gap-12 px-6 lg:grid-cols-[1fr_1.1fr_0.6fr] lg:px-12">
          <img src={aboutImage} alt="Pune skyline at night" className="reveal h-[250px] w-full rounded-md object-cover opacity-90 shadow-2xl" />
          <div className="reveal border-x border-gold/18 px-0 lg:px-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-gold">About Starboard Realtors</p>
            <h2 className="faq-gold-heading font-serif text-4xl leading-tight md:text-5xl">Pune's Boutique Real Estate Advisory Firm</h2>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-white/76">
              We specialize in commercial real estate, retail spaces, investment opportunities, and luxury residential properties across Pune. With deep market knowledge and a client-centric approach, we deliver tailored real estate solutions that create long-term value.
            </p>
            <a href="#why-us" className="mt-7 inline-flex items-center gap-3 border border-gold/55 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-royal">
              Know More About Us <ArrowRight size={15} />
            </a>
          </div>
          <div className="reveal hidden justify-center lg:flex">
            <img src={markLogo} alt="" className="h-64 w-64 object-cover mix-blend-screen xl:h-72 xl:w-72" />
          </div>
        </div>
      </section>

      <section id="founder" className="w-full border-b border-white/10 px-6 py-10 lg:px-12">
        <div className="founder-panel premium-border reveal">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-gold">A Word From The Founder</p>
            <h2 className="faq-gold-heading mt-4 font-serif text-4xl leading-tight md:text-5xl">Real estate guidance built on trust, clarity, and long-term value.</h2>
          </div>
          <div className="founder-copy">
            <p>
              At Starboard Realtors, we believe that real estate is more than just a transaction. It is one of the most important decisions individuals and businesses make.
            </p>
            <p>
              Our mission is to provide honest advice, market expertise, and a seamless experience throughout every client's real estate journey, whether it is finding the right commercial space, making a strategic investment, or securing a dream home.
            </p>
            <div className="founder-signature">
              <strong>Sandesh Rolston</strong>
              <span>Founder & Director</span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="w-full px-6 py-8 lg:px-12">
        <div className="services-premium-panel premium-border relative rounded-lg bg-white/[0.018] px-5 pb-6 pt-10 md:px-7 md:pb-8">
          <p className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-royal px-5 text-center text-xs font-semibold uppercase tracking-[0.36em] text-gold">Our Services</p>
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="faq-gold-heading font-serif text-3xl leading-tight md:text-5xl">Discreet real estate advisory for premium decisions.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/64">
              From commercial strategy to luxury residences, every mandate is handled with research, discretion, and a sharp eye for long-term value.
            </p>
          </div>
          <div className="services-flow">{serviceCards}</div>
        </div>
      </section>

      <section id="developer-network" className="developer-network-section border-b border-white/10 px-6 py-10 lg:px-12">
        <div className="developer-network-panel premium-border rounded-lg px-5 py-9 md:px-8">
          <div className="reveal mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-gold">Developer Network & Strategic Partnerships</p>
            <h2 className="faq-gold-heading mt-4 font-serif text-4xl leading-tight md:text-5xl">Trusted Access to Pune's Leading Developers</h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-white/68">
              Access to 100+ premium projects across Pune through our extensive developer network, spanning residential, commercial, retail, and investment opportunities.
            </p>
          </div>
          <div className="developer-marquee reveal mt-9">
            <div className="developer-marquee-track">
              {[...builderLogos, ...builderLogos].map((logo, index) => (
                <div key={`${logo.name}-${index}`} className="developer-logo" aria-hidden={index >= builderLogos.length}>
                  <img src={builderAsset(logo.file)} alt={index < builderLogos.length ? logo.name : ""} />
                  <span>{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="reveal mx-auto mt-7 max-w-4xl text-center text-[0.72rem] uppercase leading-6 tracking-[0.18em] text-white/46">
            Network access communicates market reach, channel relationships, and project availability. It does not imply exclusive representation or formal affiliation unless specifically authorized.
          </p>
        </div>
      </section>

      <section id="properties" className="grid w-full gap-7 px-6 py-4 lg:grid-cols-[0.9fr_2.2fr] lg:px-12">
        <aside id="why-us" className="why-compact-panel reveal premium-border relative overflow-hidden rounded-lg bg-white/[0.018] p-6">
          <div className="absolute right-2 top-20 h-40 w-40 border border-gold/10 opacity-25 [clip-path:polygon(50%_0,58%_42%,100%_50%,58%_58%,50%_100%,42%_58%,0_50%,42%_42%)]" />
          <p className="relative text-[0.62rem] font-bold uppercase tracking-[0.32em] text-gold">Why Clients Choose Us</p>
          <h2 className="faq-gold-heading relative mt-3 font-serif text-2xl leading-tight">Premium advisory with discreet execution.</h2>
          <ul className="why-compact-list relative mt-5">
            {reasons.map((reason) => (
              <li key={reason} className="why-compact-item">
                <CheckCircle2 className="shrink-0 text-gold" size={16} />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
          <div className="why-trust-strip relative mt-5">
            <span>RERA Registered</span>
            <strong>A52100030663</strong>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.36em] text-gold">Featured Opportunities</h2>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous opportunities" onClick={() => scrollOpportunities(-1)} className="premium-border grid h-10 w-10 place-items-center rounded text-gold transition hover:border-gold hover:bg-gold/10"><ChevronLeft size={20} /></button>
              <button type="button" aria-label="Next opportunities" onClick={() => scrollOpportunities(1)} className="premium-border grid h-10 w-10 place-items-center rounded text-gold transition hover:border-gold hover:bg-gold/10"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div ref={opportunitiesRef} className="opportunities-carousel">
            {opportunities.map((item) => (
              <article key={item.title} className="opportunity-card reveal group premium-border shrink-0 overflow-hidden rounded-lg bg-[#041733] shadow-card">
                <div className="relative h-72 overflow-hidden">
                  <img src={opportunityAsset(item.image)} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal via-royal/10 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold uppercase leading-tight tracking-[0.04em]">{item.title}</h3>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-white/64">{item.meta}</p>
                  <p className="mt-5 font-serif text-2xl text-gold">{item.price}</p>
                  {item.brochure && (
                    <a href={item.brochure} target="_blank" rel="noreferrer" className="opportunity-brochure mt-5 inline-flex items-center justify-center gap-2 px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em]">
                      View Brochure <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-4 lg:px-12">
        <div className="achievements-grid premium-border grid gap-0 rounded-lg bg-white/[0.018] md:grid-cols-2 xl:grid-cols-6">
          {achievements.map(({ value, label, icon }) => (
            <div key={label} className="reveal border-gold/15 p-7 text-center xl:border-r last:border-r-0">
              <img src={iconAsset(icon)} alt="" className="mx-auto mb-3 h-24 w-24 object-cover mix-blend-screen brightness-125 contrast-125" />
              <div className="font-serif text-4xl text-gold">{value}</div>
              <p className="mx-auto mt-2 max-w-44 text-sm leading-5 text-white/78">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="w-full px-6 py-8 lg:px-12">
        <h2 className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.36em] text-gold">Client Testimonials</h2>
        <div className="testimonial-marquee reveal">
          <div className="testimonial-marquee-track">
            {[...testimonials, ...testimonials].map((item, index) => (
              <article key={`${item.name}-${index}`} className="premium-border relative min-h-[240px] w-[420px] shrink-0 rounded-lg bg-white/[0.025] p-7">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gold/16 text-xl font-bold text-gold">{item.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
                  <div>
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-xs text-gold">{item.role}</p>
                    <p className="text-xs text-white/55">{item.firm}</p>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-7 text-white/76">{item.quote}</p>
                <div className="mt-5 flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={`${index}-${starIndex}`} size={14} fill="currentColor" />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="w-full px-6 py-8 lg:px-12">
        <div className="faq-gold-panel premium-border relative overflow-hidden rounded-lg px-6 py-10 md:px-10">
          <div className="relative grid gap-9 lg:grid-cols-[0.8fr_1.35fr]">
            <div className="reveal">
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-gold">FAQ</p>
              <h2 className="faq-gold-heading mt-4 font-serif text-4xl leading-tight md:text-5xl">Premium Real Estate Guidance, Clearly Answered</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/68">
                Helpful answers for clients exploring commercial, investment, and luxury residential opportunities with Starboard Realtors.
              </p>
            </div>
            <div className="reveal space-y-4">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="faq-gold-item group rounded-md px-5 py-4" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left">
                    <span className="text-sm font-semibold uppercase tracking-[0.08em] text-white">{faq.question}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/35 font-serif text-2xl leading-none text-gold transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact-form" className="w-full px-6 py-8 lg:px-12">
        <div className="contact-royal-panel premium-border relative overflow-hidden rounded-lg px-6 py-10 md:px-10">
          <div className="relative grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="reveal">
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-gold">Private Consultation</p>
              <h2 className="faq-gold-heading mt-4 font-serif text-4xl leading-tight md:text-5xl">
                Begin Your Premium Property Conversation
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/68">
                Share your requirement and our advisory team will help curate commercial, investment, or luxury residential opportunities aligned to your goals.
              </p>
              <div className="mt-8 grid gap-4 text-sm text-white/78">
                <p className="flex items-center gap-3"><Phone className="text-gold" size={18} /> +91 9769494723</p>
                <p className="flex items-center gap-3"><Mail className="text-gold" size={18} /> connect@starboardrealtors.co.in</p>
                <p className="flex items-start gap-3"><MapPin className="mt-0.5 text-gold" size={18} /> Aundh, Pune - premium advisory by appointment</p>
              </div>
            </div>

            <form className="reveal contact-form-grid" onSubmit={(event) => event.preventDefault()}>
              <label className="contact-field">
                <span>Full Name</span>
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <label className="contact-field">
                <span>Phone Number</span>
                <input type="tel" name="phone" placeholder="+91 00000 00000" />
              </label>
              <label className="contact-field">
                <span>Email Address</span>
                <input type="email" name="email" placeholder="you@example.com" />
              </label>
              <label className="contact-field">
                <span>Requirement</span>
                <select name="requirement" defaultValue="">
                  <option value="" disabled>Select interest</option>
                  <option>Commercial Leasing</option>
                  <option>Commercial Sales</option>
                  <option>Luxury Residential</option>
                  <option>Investment Advisory</option>
                  <option>Property Consulting</option>
                </select>
              </label>
              <label className="contact-field contact-field-wide">
                <span>Message</span>
                <textarea name="message" rows="5" placeholder="Tell us about your preferred location, budget, timeline, and property goals." />
              </label>
              <button type="submit" className="contact-submit contact-field-wide">
                Request Royal Consultation <ArrowRight size={17} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section id="location-map" className="w-full px-6 py-8 lg:px-12">
        <div className="premium-border overflow-hidden rounded-lg bg-[#020B18]">
          <div className="flex flex-col gap-3 border-b border-gold/55 px-6 py-5 md:flex-row md:items-end md:justify-between lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-gold">Location</p>
              <h2 className="faq-gold-heading mt-2 font-serif text-3xl md:text-4xl">Visit Starboard Realtors, Aundh</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/64">201, 2nd Floor, Nandan Aspira, Opp. Ankura Hospital, Nagras Road, Aundh, Pune - 411007</p>
          </div>
          <div className="full-map">
            <Map center={starboardPosition} zoom={15} className="h-full min-h-[440px] w-full" theme="dark">
              {showMapPopup && (
                <MapPopup
                  longitude={starboardPosition[0]}
                  latitude={starboardPosition[1]}
                  onClose={() => setShowMapPopup(false)}
                  closeButton
                  focusAfterOpen={false}
                  closeOnClick={false}
                  className="starboard-map-popup"
                >
                  <div className="space-y-3 pr-5">
                    <h3 className="font-serif text-lg font-semibold uppercase tracking-[0.08em] text-gold">Starboard Realtors</h3>
                    <p className="text-sm leading-6 text-white/72">
                      201, 2nd Floor, Nandan Aspira, Opp. Ankura Hospital, Nagras Road, Aundh, Pune - 411007
                    </p>
                    <a
                      href={starboardDirectionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded border border-gold/45 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-gold transition hover:bg-gold hover:text-royal"
                    >
                      Get Directions <MapPin size={14} />
                    </a>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-gold/45 bg-transparent text-gold hover:bg-gold hover:text-royal"
                      onClick={() => setShowMapPopup(false)}
                    >
                      Close
                    </Button>
                  </div>
                </MapPopup>
              )}
            </Map>

            {!showMapPopup && (
              <Button
                size="sm"
                className="absolute bottom-4 left-4 z-10 bg-gold text-royal hover:bg-goldLight"
                onClick={() => setShowMapPopup(true)}
              >
                Show Popup
              </Button>
            )}
          </div>
        </div>
      </section>

      <footer id="contact" className="w-full px-6 pb-6 pt-3 lg:px-12">
        <div className="footer-royal premium-border relative overflow-hidden rounded-lg p-8 lg:p-10">
          <div className="grid gap-9 lg:grid-cols-[1.05fr_1.2fr_0.75fr_1.05fr]">
          <div className="footer-column">
            <Logo compact />
            <p className="mt-5 text-xs uppercase tracking-[0.26em] text-gold">Curating Exceptional Spaces</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/62">
              Boutique real estate advisory for premium commercial, investment, and luxury residential opportunities across Pune.
            </p>
            <div className="mt-7 flex gap-4 text-gold">
              {socialLinks.map(({ label, href, path }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="footer-social grid h-10 w-10 place-items-center rounded-full border border-gold/35">
                  <SocialIcon path={path} />
                </a>
              ))}
            </div>
          </div>
          <div className="footer-column">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Contact Us</h3>
            <div className="space-y-4 text-sm text-white/80">
              <p className="footer-info"><Phone className="shrink-0 text-gold" size={18} />+91 9769494723</p>
              <p className="footer-info"><Mail className="shrink-0 text-gold" size={18} />connect@starboardrealtors.co.in</p>
              <p className="footer-info"><MapPin className="shrink-0 text-gold" size={18} />201, 2nd Floor, Nandan Aspira Opp. Ankura Hospital, Nagras Road, Aundh, Pune - 411007</p>
            </div>
          </div>
          <div className="footer-column">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Working Hours</h3>
            <p className="footer-info"><Clock className="shrink-0 text-gold" size={18} /><span>All 7 Days<br />9:00 AM - 7:00 PM</span></p>
            <a href={starboardDirectionsUrl} target="_blank" rel="noreferrer" className="footer-direction mt-7 inline-flex items-center gap-3 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-gold transition hover:text-royal">
              <MapPin size={15} /> Get Directions
            </a>
          </div>
          <div className="footer-compliance">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Compliance</h3>
            <div className="footer-credential-card">
              <span>MahaRERA</span>
              <strong>A52100030663</strong>
            </div>
            <div className="footer-credential-card">
              <span>GST</span>
              <strong>27BUSPR1519J1Z1</strong>
            </div>
          </div>
          </div>
        </div>
        <p className="py-5 text-center text-[0.68rem] uppercase tracking-[0.3em] text-white/42">© 2026 Starboard Realtors. All Rights Reserved.</p>
      </footer>
    </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
