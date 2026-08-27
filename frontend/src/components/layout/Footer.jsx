import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LEVELS, CATEGORIES } from '@/lib/constants';
import PlanModal from './PlanModal';

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/dogusuniv/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/DogusUniversity/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/DogusUniv',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.9 3H21l-6.5 7.4L22 21h-6.4l-5-6.4L4.7 21H2.6l6.9-7.9L2 3h6.5l4.5 5.8L18.9 3Zm-1.1 16h1.7L7.3 4.9H5.5L17.8 19Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCB5TDTCXPku-m7qQHSc1h0g',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M23 12s0-3.6-.46-5.3a2.9 2.9 0 0 0-2-2C18.9 4.2 12 4.2 12 4.2s-6.9 0-8.54.5a2.9 2.9 0 0 0-2 2C1 8.4 1 12 1 12s0 3.6.46 5.3a2.9 2.9 0 0 0 2 2C5.1 19.8 12 19.8 12 19.8s6.9 0 8.54-.5a2.9 2.9 0 0 0 2-2C23 15.6 23 12 23 12ZM9.7 15.4V8.6l6 3.4-6 3.4Z" />
      </svg>
    ),
  },
];

const INFO_LINKS = [
  { label: 'About us', slug: 'about-us' },
  { label: 'Terms of Use', slug: 'terms-of-use' },
  { label: 'Privacy Policy', slug: 'privacy-policy' },
  { label: 'Cookie Policy', slug: 'cookie-policy' },
  { label: 'Cookie Declaration', slug: 'cookie-declaration' },
];

const CONTACT_LINKS = [
  { label: 'Contact us', slug: 'contact-us' },
  { label: 'Request a topic for a lesson', slug: 'request-topic' },
  { label: 'Change your cookie consent', slug: 'cookie-consent' },
];

export default function Footer() {
  const isPremium = useSelector((state) => state.auth.user?.isPremium);
  const [planModalOpen, setPlanModalOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-9 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-8 flex-1">
          <div>
            <Link to="/" className="flex items-center gap-2 w-fit">
              <span className="text-2xl">🍃</span>
              <span className="text-lg font-bold text-white">
                learn<span className="text-emerald-400">english</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mt-3">
              © {new Date().getFullYear()} learnenglish.
              <br />
              All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Levels</h4>
            <ul className="space-y-1.5">
              {LEVELS.map((l) => (
                <li key={l.code}>
                  <Link
                    to={`/levels/${l.code}`}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {l.code} {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Categories</h4>
            <ul className="space-y-1.5">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/topics/${c.slug}`}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Info</h4>
            <ul className="space-y-1.5">
              {INFO_LINKS.map((info) => (
                <li key={info.slug}>
                  <Link
                    to={`/info/${info.slug}`}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {info.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Get in Touch</h4>
            <ul className="space-y-1.5">
              {CONTACT_LINKS.map((contact) => (
                <li key={contact.slug}>
                  <Link
                    to={`/info/${contact.slug}`}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {contact.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2.5 mt-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-white/20 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col gap-2.5">
          <Link
            to="/placement-test"
            className="inline-flex items-center justify-center rounded-lg border border-gray-600 text-white text-sm font-semibold px-5 py-2.5 hover:bg-white/5 transition-colors"
          >
            Take a level test
          </Link>
          {isPremium ? (
            <span className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-500/50 text-emerald-400 text-sm font-semibold px-5 py-2.5">
              ✓ Pro member
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setPlanModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg border border-gray-600 text-white text-sm font-semibold px-5 py-2.5 hover:bg-white/5 transition-colors"
            >
              Upgrade to pro
            </button>
          )}
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500" />

      <PlanModal open={planModalOpen} onClose={() => setPlanModalOpen(false)} />
    </footer>
  );
}
