import React, { useState } from 'react';
import Head from 'next/head';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { AppBar } from '@/components/layout/AppBar';

const FAQS = [
  {
    q: 'How does 1Fi Marketplace EMI work?',
    a: '1Fi Marketplace allows you to purchase gadgets and appliances using your pre-approved 1Fi Credit Limit. You select your preferred EMI tenure (3 to 24 months), and repayments are automatically debited from your linked bank account every month.',
  },
  {
    q: 'What is No Cost EMI?',
    a: 'No Cost EMI means you pay no interest or extra charges. The total price of the product is simply divided equally across your chosen tenure months.',
  },
  {
    q: 'How do I set up Auto-Debit?',
    a: 'Auto-Debit is automatically set up using e-NACH / UPI Autopay during your first purchase. Subsequent monthly EMIs will be automatically deducted on your due date.',
  },
  {
    q: 'Can I pay off my EMI early?',
    a: 'Yes! You can foreclose or make early EMI payments at any time directly from the 1Fi Wallet section without any foreclosure penalty fees.',
  },
  {
    q: 'What happens if my order fails or is cancelled?',
    a: 'If an order fails or is cancelled, any blocked credit limit is instantly released back to your 1Fi Credit Wallet within 24 hours.',
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [queryText, setQueryText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim()) return;
    setSubmitted(true);
    setQueryText('');
  };

  return (
    <>
      <Head>
        <title>Help & Support — 1Fi</title>
        <meta name="description" content="Find answers to FAQs and contact 1Fi customer support." />
      </Head>
      <MobileLayout>
        <AppBar title="Help & Support" showBack />

        <div style={{ padding: '16px' }}>
          {/* Support Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
            borderRadius: '16px',
            padding: '20px',
            color: 'white',
            marginBottom: '20px',
            boxShadow: '0 8px 24px rgba(124, 58, 237, 0.2)',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 6px' }}>
              How can we help you today?
            </h2>
            <p style={{ fontSize: '13px', opacity: 0.9, margin: 0 }}>
              24/7 dedicated assistance for 1Fi credit & marketplace orders
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <a href="tel:18001231347" className="card" style={{ padding: '14px', textAlign: 'center', textDecoration: 'none', color: 'inherit', border: '1px solid #E4DCF9' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>📞</div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Call Support</h4>
              <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>Toll-Free 1800-123-1FI</span>
            </a>

            <a href="mailto:support@1fi.app" className="card" style={{ padding: '14px', textAlign: 'center', textDecoration: 'none', color: 'inherit', border: '1px solid #E4DCF9' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>✉️</div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Email Us</h4>
              <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>support@1fi.app</span>
            </a>
          </div>

          {/* FAQs */}
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
            Frequently Asked Questions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="card"
                  style={{ overflow: 'hidden', border: '1px solid #E4DCF9', background: isOpen ? '#FAF8FF' : 'white' }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 700, marginLeft: '8px' }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 16px 14px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, borderTop: '1px solid #F1ECFD', paddingTop: '10px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Raise a Query Form */}
          <div className="card" style={{ padding: '18px', border: '1px solid #E4DCF9' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Still need help? Raise a Ticket
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Describe your query and our team will get back to you within 2 hours.
            </p>

            {submitted ? (
              <div className="alert alert-success" style={{ textAlignment: 'center', fontWeight: 600 }}>
                ✓ Ticket submitted! Our support specialist will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Type your question or order issue here..."
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '10px' }}>
                  Submit Query Ticket
                </button>
              </form>
            )}
          </div>
        </div>
      </MobileLayout>
    </>
  );
}
