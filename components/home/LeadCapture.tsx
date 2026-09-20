'use client';

import React, { useState, useEffect } from 'react';

export interface LeadCaptureProps {
  variant?: 'full-section' | 'inline-banner' | 'modal';
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  selectedCarName?: string;
}

export default function LeadCapture({
  variant = 'full-section',
  isOpen = false,
  onClose,
  title,
  subtitle,
  selectedCarName
}: LeadCaptureProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; pin?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedData, setSavedData] = useState<{ name: string; phone: string; pin: string } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kerb_lead_submission');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavedData(parsed);
        setName(parsed.name || '');
        setPhone(parsed.phone || '');
        setPin(parsed.pin || '');
      }
    } catch (e) {}
  }, []);

  const validate = () => {
    const newErrors: { name?: string; phone?: string; pin?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Please enter your mobile number';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }

    const cleanPin = pin.trim();
    if (!cleanPin) {
      newErrors.pin = 'Please enter your PIN code';
    } else if (!/^[1-9]\d{5}$/.test(cleanPin)) {
      newErrors.pin = 'Enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        name: name.trim(),
        phone: phone.replace(/[\s-]/g, ''),
        pin: pin.trim(),
        selectedCar: selectedCarName,
        timestamp: new Date().toISOString()
      };
      try {
        localStorage.setItem('kerb_lead_submission', JSON.stringify(payload));
      } catch (e) {}
      setSavedData(payload);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  const defaultTitle = title || (selectedCarName ? `Get Offers on ${selectedCarName}` : 'Get personalised car options');
  const defaultSubtitle = subtitle || "Tell us your details and we'll show the best cars for you.";

  const formContent = (
    <>
      {isSubmitted ? (
        <div className="lead-success-card" role="status" aria-live="polite">
          <div className="success-icon-badge" aria-hidden="true">✓</div>
          <h4 className="success-heading">Options personalised for {savedData?.name || name}</h4>
          <p className="success-message">
            We&apos;ll curate verified dealer-free on-road pricing and vehicle matches for PIN {savedData?.pin || pin}.
          </p>
          <div className="success-actions">
            <button type="button" onClick={resetForm} className="btn-glass-subtle">
              Update details
            </button>
            {onClose && (
              <button type="button" onClick={onClose} className="btn-green-submit">
                Close
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="lead-glass-form" noValidate>
          <div className="inputs-row">
            {/* Name Field */}
            <div className="input-field-wrap">
              <div className={`input-pill ${errors.name ? 'input-error' : ''}`}>
                <span className="input-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className="glass-native-input"
                  required
                />
              </div>
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            {/* Mobile Number Field */}
            <div className="input-field-wrap">
              <div className={`input-pill ${errors.phone ? 'input-error' : ''}`}>
                <span className="input-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Mobile number"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setPhone(val);
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  className="glass-native-input"
                  required
                />
              </div>
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            {/* PIN Code Field */}
            <div className="input-field-wrap">
              <div className={`input-pill ${errors.pin ? 'input-error' : ''}`}>
                <span className="input-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="PIN code"
                  value={pin}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setPin(val);
                    if (errors.pin) setErrors({ ...errors, pin: undefined });
                  }}
                  className="glass-native-input"
                  required
                />
              </div>
              {errors.pin && <span className="error-text">{errors.pin}</span>}
            </div>
          </div>

          <button type="submit" className="btn-green-submit">
            <span>Show My Options</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>
      )}

      <style jsx>{`
        .lead-glass-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .inputs-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }

        @media (min-width: 768px) {
          .inputs-row {
            flex-direction: row;
          }
        }

        .input-field-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .input-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          height: 48px;
          padding: 0 16px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        .input-pill:focus-within {
          border-color: var(--kerb-green-primary, #00E887);
          box-shadow: 0 0 0 3px rgba(0, 232, 135, 0.2);
        }

        .input-pill.input-error {
          border-color: #EF4444;
        }

        .input-icon {
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .glass-native-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-size: 14px;
          font-family: inherit;
        }

        .glass-native-input::placeholder {
          color: rgba(255, 255, 255, 0.45);
        }

        .error-text {
          font-size: 11px;
          color: #F87171;
          padding-left: 12px;
        }

        .btn-green-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--kerb-green-primary, #00E887);
          color: #050A09;
          font-size: 15px;
          font-weight: 750;
          border-radius: 9999px;
          height: 48px;
          width: 100%;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 232, 135, 0.4);
          transition: transform 150ms ease, box-shadow 150ms ease;
          margin-top: 4px;
        }

        .btn-green-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 26px rgba(0, 232, 135, 0.6);
        }

        .lead-success-card {
          padding: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .success-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 232, 135, 0.2);
          border: 1px solid var(--kerb-green-primary, #00E887);
          color: var(--kerb-green-primary, #00E887);
          font-size: 20px;
          display: grid;
          place-items: center;
        }

        .success-heading {
          font-size: 16px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
        }

        .success-message {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          max-width: 400px;
        }

        .success-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .btn-glass-subtle {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
          border-radius: 9999px;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </>
  );

  // Modal variant
  if (variant === 'modal') {
    if (!isOpen) return null;
    return (
      <div className="lead-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <div className="lead-modal-panel" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={onClose} className="modal-close-cross" aria-label="Close form">
            ✕
          </button>
          <div className="modal-header-text">
            <h3 className="modal-heading">{defaultTitle}</h3>
            <p className="modal-subheading">{defaultSubtitle}</p>
          </div>
          {formContent}
        </div>

        <style jsx>{`
          .lead-modal-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
          }

          .lead-modal-panel {
            position: relative;
            width: 100%;
            max-width: 480px;
            background: rgba(14, 24, 21, 0.95);
            border: 1px solid rgba(0, 232, 135, 0.35);
            border-radius: 24px;
            padding: 28px 24px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 232, 135, 0.2);
          }

          .modal-close-cross {
            position: absolute;
            top: 18px;
            right: 18px;
            background: rgba(255, 255, 255, 0.08);
            border: none;
            color: rgba(255, 255, 255, 0.6);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: grid;
            place-items: center;
            font-size: 14px;
          }

          .modal-header-text {
            margin-bottom: 20px;
            padding-right: 28px;
          }

          .modal-heading {
            font-size: 20px;
            font-weight: 800;
            color: #FFFFFF;
            margin: 0 0 6px;
          }

          .modal-subheading {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.7);
            margin: 0;
          }
        `}</style>
      </div>
    );
  }

  // Full section variant
  return (
    <section className="lead-section-wrapper" aria-labelledby="lead-heading">
      <div className="kerb-page-container">
        <div className="lead-box-container">
          <div className="lead-header-row">
            <h2 id="lead-heading" className="lead-box-title">
              {defaultTitle}
            </h2>
            <p className="lead-box-desc">{defaultSubtitle}</p>
          </div>

          <div className="lead-form-slot">
            {formContent}
          </div>
        </div>
      </div>

      <style jsx>{`
        .lead-section-wrapper {
          width: 100%;
          padding-top: 24px;
          padding-bottom: 32px;
        }

        .lead-box-container {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(0, 232, 135, 0.35);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 24px;
          padding: 24px 20px;
          box-shadow: 0 12px 36px -8px rgba(0, 0, 0, 0.5), 0 0 28px -4px rgba(0, 232, 135, 0.2);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .lead-box-container {
            padding: 36px 40px;
          }
        }

        .lead-header-row {
          text-align: left;
        }

        .lead-box-title {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 0 0 4px;
        }

        @media (min-width: 768px) {
          .lead-box-title {
            font-size: 24px;
          }
        }

        .lead-box-desc {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
        }

        .lead-form-slot {
          width: 100%;
        }
      `}</style>
    </section>
  );
}
