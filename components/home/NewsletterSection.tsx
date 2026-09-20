'use client';

import React, { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSent(true);
      try {
        localStorage.setItem('kerb_newsletter_subscriber', email);
      } catch (err) {}
    }
  };

  return (
    <section className="newsletter-section" aria-labelledby="stay-updated-title">
      <div className="kerb-page-container">
        <div className="newsletter-card">
          <div className="newsletter-text">
            <h2 id="stay-updated-title" className="newsletter-title">
              Stay updated
            </h2>
            <p className="newsletter-subtitle">
              Get the latest car news, launches and guides in your inbox.
            </p>
          </div>

          {isSent ? (
            <div className="newsletter-success" role="status">
              <span className="success-check">✓</span>
              <span>You&apos;re subscribed to KERB updates.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                required
                aria-label="Email address for car updates"
              />
              <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .newsletter-section {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 32px;
        }

        .newsletter-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 24px 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .newsletter-card {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 32px 36px;
          }
        }

        .newsletter-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .newsletter-title {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 0;
        }

        .newsletter-subtitle {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
        }

        .newsletter-form {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 380px;
        }

        .newsletter-input {
          width: 100%;
          height: 48px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 9999px;
          padding: 0 54px 0 20px;
          color: #FFFFFF;
          font-size: 14px;
          outline: none;
          transition: border-color 150ms ease;
        }

        .newsletter-input:focus {
          border-color: var(--kerb-green-primary, #00E887);
          box-shadow: 0 0 0 3px rgba(0, 232, 135, 0.2);
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.45);
        }

        .newsletter-submit-btn {
          position: absolute;
          right: 4px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--kerb-green-primary, #00E887);
          color: #050A09;
          border: none;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: transform 150ms ease, box-shadow 150ms ease;
          box-shadow: 0 2px 10px rgba(0, 232, 135, 0.4);
        }

        .newsletter-submit-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 4px 16px rgba(0, 232, 135, 0.6);
        }

        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--kerb-green-primary, #00E887);
          font-size: 14px;
          font-weight: 600;
          padding: 10px 0;
        }

        .success-check {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(0, 232, 135, 0.2);
          display: grid;
          place-items: center;
          font-size: 12px;
        }
      `}</style>
    </section>
  );
}
