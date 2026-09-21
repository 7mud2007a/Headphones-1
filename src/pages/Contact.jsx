import React, { useState } from 'react';
import RevealOnScroll from '../components/RevealOnScroll.jsx';
import MagneticButton from '../components/MagneticButton.jsx';

function Field({ label, className = '', textarea = false, ...props }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-ink-dim">{label}</span>
      <Tag {...props} className={`input-field ${textarea ? 'min-h-[140px] resize-y' : ''}`} />
    </label>
  );
}

const CONTACT_TOPICS = ['Order support', 'Product question', 'Press', 'Something else'];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState(CONTACT_TOPICS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32">
      <div className="container-px mx-auto max-w-3xl pb-24">
        <RevealOnScroll className="mb-10 text-center">
          <span className="eyebrow">Get in touch</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">We'd love to hear from you.</h1>
          <p className="mt-3 text-ink-dim">Questions about an order, a product, or anything else — reach out below.</p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-9">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-aura-gradient text-2xl text-white shadow-glow-sm">
                ✓
              </div>
              <h2 className="font-display text-xl font-semibold text-ink">Message sent</h2>
              <p className="max-w-sm text-sm text-ink-dim">
                Thanks for reaching out — our team typically replies within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" type="text" required placeholder="Jordan Lee" />
                <Field label="Email" type="email" required placeholder="jordan@email.com" />
              </div>

              <div>
                <span className="mb-2 block text-xs font-medium text-ink-dim">Topic</span>
                <div className="flex flex-wrap gap-2">
                  {CONTACT_TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-colors duration-200 ${
                        topic === t ? 'border-violet-500/60 bg-violet-500/10 text-ink' : 'border-white/10 text-ink-dim hover:text-ink'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Field label="Message" textarea required placeholder="How can we help?" />

              <MagneticButton type="submit" className="w-full sm:w-auto">
                Send message
              </MagneticButton>
            </form>
          )}
        </RevealOnScroll>
      </div>
    </div>
  );
}
