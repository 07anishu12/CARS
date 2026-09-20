'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'kerb_cookie_consent_v1';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Show after a brief delay so it doesn't block initial LCP render
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage not available or restricted
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {}
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    });
  };

  const handleRejectAll = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      essential: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
      timestamp: new Date().toISOString()
    });
  };

  if (!isVisible) return null;

  return (
    <>
      <style jsx>{`
        .consent-banner-wrapper {
          position: fixed;
          bottom: 72px; /* Clears mobile bottom nav if open */
          left: 16px;
          right: 16px;
          max-width: 540px;
          margin-left: auto;
          z-index: 1000;
          background: rgba(17, 24, 33, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .consent-title {
          font-size: 1rem;
          font-weight: 700;
          color: #F3F4F6;
          margin: 0 0 6px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .consent-desc {
          font-size: 0.85rem;
          color: rgba(243, 244, 246, 0.75);
          line-height: 1.45;
          margin: 0 0 16px 0;
        }

        .consent-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .btn-consent {
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          border: none;
          outline: none;
        }

        .btn-primary {
          background-color: #22C55E;
          color: #0B0F12;
        }
        .btn-primary:hover {
          background-color: #16A34A;
        }

        .btn-secondary {
          background-color: rgba(255, 255, 255, 0.1);
          color: #F3F4F6;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.16);
        }

        .btn-link {
          background: transparent;
          color: rgba(243, 244, 246, 0.65);
          text-decoration: underline;
        }
        .btn-link:hover {
          color: #F3F4F6;
        }

        /* Preference Modal Overlay */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 1100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .modal-content {
          background: #111821;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 16px;
          padding: 24px;
          max-width: 480px;
          width: 100%;
          color: #F3F4F6;
          max-height: 90vh;
          overflow-y: auto;
        }

        .pref-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 16px;
        }

        .pref-title {
          font-size: 0.92rem;
          font-weight: 600;
          margin-bottom: 3px;
        }

        .pref-desc {
          font-size: 0.78rem;
          color: rgba(243, 244, 246, 0.65);
          line-height: 1.35;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 22px;
          flex-shrink: 0;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 22px;
          transition: .2s;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          border-radius: 50%;
          transition: .2s;
        }

        input:checked + .toggle-slider {
          background-color: #22C55E;
        }

        input:checked + .toggle-slider:before {
          transform: translateX(18px);
        }

        input:disabled + .toggle-slider {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      {/* Main Cookie Banner */}
      <div 
        role="region" 
        aria-label="Privacy & Cookie Preferences" 
        className="consent-banner-wrapper"
      >
        <div className="consent-title">
          <span>🔒</span> Privacy & Transparent Data
        </div>
        <p className="consent-desc">
          KERB respects your privacy. We use essential cookies to remember your vehicle comparisons, shortlist, and dark mode. You can customize analytics and personalization cookies anytime in accordance with our{' '}
          <Link href="/privacy" style={{ color: '#22C55E', textDecoration: 'underline' }}>
            Privacy Policy
          </Link>.
        </p>
        <div className="consent-actions">
          <button onClick={handleAcceptAll} className="btn-consent btn-primary">
            Accept All
          </button>
          <button onClick={handleRejectAll} className="btn-consent btn-secondary">
            Essential Only
          </button>
          <button 
            onClick={() => setShowPreferences(true)} 
            className="btn-consent btn-link"
          >
            Customize
          </button>
        </div>
      </div>

      {/* Granular Preferences Modal */}
      {showPreferences && (
        <div className="modal-overlay" onClick={() => setShowPreferences(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 700 }}>
              Cookie & Data Preferences
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'rgba(243, 244, 246, 0.7)', margin: '0 0 16px 0' }}>
              Choose which cookies you allow. Essential cookies are necessary for core platform security and vehicle shortlists.
            </p>

            <div className="pref-row">
              <div>
                <div className="pref-title">Strictly Necessary (Always Active)</div>
                <div className="pref-desc">Required for theme selection, comparison state, security, and session routing.</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked disabled />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="pref-row">
              <div>
                <div className="pref-title">Analytics & Performance</div>
                <div className="pref-desc">Enables aggregate measurement of page load speed and discovery search popularity without identifying you.</div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={analyticsEnabled} 
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="pref-row">
              <div>
                <div className="pref-title">Personalized Recommendations</div>
                <div className="pref-desc">Allows KERB AI to remember your selected city and budget preferences for tailored vehicle comparisons.</div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={marketingEnabled} 
                  onChange={(e) => setMarketingEnabled(e.target.checked)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
              <button 
                onClick={() => setShowPreferences(false)} 
                className="btn-consent btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveCustom} 
                className="btn-consent btn-primary"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
