'use client';

import React, { useState } from 'react';
import HomeHeader from './HomeHeader';
import Hero from './Hero';
import SearchBar from './SearchBar';
import QuickActions from './QuickActions';
import BodyTypeExplorer from './BodyTypeExplorer';
import EVSection from './EVSection';
import PopularCarsSection from './PopularCarsSection';
import BudgetExplorer from './BudgetExplorer';
import BrandGrid from './BrandGrid';
import CompareSection from './CompareSection';
import ToolsGrid from './ToolsGrid';
import ResearchSection from './ResearchSection';
import RoadTestsSection from './RoadTestsSection';
import LeadCapture from './LeadCapture';
import FAQSection from './FAQSection';
import MidPageHeroCard from './MidPageHeroCard';
import WhyKerbSection from './WhyKerbSection';
import NewLaunchesSection from './NewLaunchesSection';
import NewsletterSection from './NewsletterSection';
import FinalCTA from './FinalCTA';
import QuickNavigationList from './QuickNavigationList';
import Footer from './Footer';

import { CarModel, Make, City } from '../../types/vehicle';
import { Article } from '../../types';

export interface HomePageClientProps {
  models: CarModel[];
  makes: Make[];
  cities: City[];
  articles: Article[];
}

export default function HomePageClient({
  models,
  makes,
  cities,
  articles
}: HomePageClientProps) {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [modalCarContext, setModalCarContext] = useState<string | undefined>(undefined);

  const handleOpenLeadModal = (carName?: string) => {
    setModalCarContext(carName);
    setLeadModalOpen(true);
  };

  const handleCloseLeadModal = () => {
    setLeadModalOpen(false);
    setModalCarContext(undefined);
  };

  return (
    <div className="kerb-homepage-root">
      {/* =========================================================================
          SCREEN 1 (Hero, Search, Quick Tools, Body Types, EV Promo)
          ========================================================================= */}
      {/* 1. Header / Navigation */}
      <HomeHeader onOpenLeadModal={() => handleOpenLeadModal()} />

      {/* 2. Cinematic Hero Section with Carousel */}
      <Hero
        models={models}
        makes={makes}
        cities={cities}
        onOpenLeadModal={handleOpenLeadModal}
      />

      {/* 3. Search Bar with Glass Pill, Mic Action Button & Popular Search Chips */}
      <section className="kerb-search-section-slot" aria-label="Quick search">
        <div className="kerb-page-container">
          <SearchBar models={models} makes={makes} cities={cities} />
        </div>
      </section>

      {/* 4. Quick Actions 5-Card Grid */}
      <QuickActions />

      {/* 5. Explore by Body Type */}
      <BodyTypeExplorer />

      {/* 6. Electric Mobility Promo Banner (Screen 1) */}
      <EVSection variant="banner" />

      {/* =========================================================================
          SCREEN 2 (Popular Cars, Budget Explorer, Brand Grid, Side-by-Side Compare)
          ========================================================================= */}
      {/* 7. Popular in India (with Category Filter Tabs & Horizontal Cards) */}
      <PopularCarsSection
        models={models}
        makes={makes}
        onOpenLeadModal={handleOpenLeadModal}
      />

      {/* 8. Find by Budget (5 Pastel Tinted Glass Cards) */}
      <BudgetExplorer models={models} />

      {/* 9. Popular Brands (8 Authentic Brand Emblem Cards) */}
      <BrandGrid />

      {/* 10. Side-by-Side Compare Card (Creta vs Nexon) */}
      <CompareSection models={models} makes={makes} />

      {/* =========================================================================
          SCREEN 3 (Tools & Calculators, Research, Road Tests, Lead Capture)
          ========================================================================= */}
      {/* 11. Tools & Calculators Grid */}
      <ToolsGrid />

      {/* 11b. Big EV Showcase Card (Screen 3) */}
      <EVSection variant="showcase" />

      {/* 12. Research & Guides (Editorial Cards) */}
      <ResearchSection articles={articles} />

      {/* 13. Instrumented Road Test Reviews */}
      <RoadTestsSection />

      {/* 14. Lead Capture Form (Full Section Conversion Block) */}
      <div id="lead-cta">
        <LeadCapture
          variant="full-section"
          title="Get personalised car options"
          subtitle="Tell us your details and we'll show the best cars for you."
        />
      </div>

      {/* =========================================================================
          SCREEN 4 (FAQ, Mid-Page Hero Card, Why KERB, New Launches, Newsletter)
          ========================================================================= */}
      {/* 15. Frequently Asked Questions (Glass Accordions) */}
      <FAQSection />

      {/* 16. Mid-Page Hero Cinematic Card */}
      <MidPageHeroCard />

      {/* 17. Why KERB (4 Pillars) */}
      <WhyKerbSection />

      {/* 18. New Launches 2026 */}
      <NewLaunchesSection />

      {/* 19. Newsletter Subscription Block */}
      <NewsletterSection />

      {/* =========================================================================
          SCREEN 5 (Final CTA, Quick Links List, App Download, Footer)
          ========================================================================= */}
      {/* 20. Final CTA Banner */}
      <FinalCTA />

      {/* 21. Quick Navigation Links List + App Store / Play Store Badges */}
      <QuickNavigationList />

      {/* 22. Global Automotive Footer */}
      <Footer />

      {/* Reusable Lead Capture Modal Triggered from Header / "Get Offer" */}
      <LeadCapture
        variant="modal"
        isOpen={leadModalOpen}
        onClose={handleCloseLeadModal}
        selectedCarName={modalCarContext}
      />

      <style jsx>{`
        .kerb-homepage-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--kerb-bg-primary, #050A09);
          color: var(--kerb-text-primary, #FFFFFF);
          padding-bottom: calc(76px + env(safe-area-inset-bottom, 0px)); /* Space for MobileBottomNav */
          overflow-x: hidden;
        }

        .kerb-search-section-slot {
          position: relative;
          z-index: 20;
          margin-top: -20px;
          margin-bottom: 32px;
          padding-inline: 4px;
        }

        @media (min-width: 769px) {
          .kerb-homepage-root {
            padding-bottom: 0;
          }

          .kerb-search-section-slot {
            margin-top: -28px;
            margin-bottom: 44px;
          }
        }
      `}</style>
    </div>
  );
}
