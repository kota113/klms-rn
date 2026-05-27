import type React from 'react';

export const colors = {
  bg: '#f4f6fb',
  surface: '#ffffff',
  text: '#18202a',
  muted: '#5b6472',
  border: '#c8d0e0',
  accent: '#081f6f',
  accentStrong: '#050f3a',
  section: '#eaedfa',
} as const;

export const s: Record<string, React.CSSProperties> = {
  siteHeader: {
    background: colors.surface,
    borderBottom: `1px solid ${colors.border}`,
  },
  siteHeaderInner: {
    alignItems: 'center',
    display: 'flex',
    gap: 18,
    justifyContent: 'space-between',
    margin: '0 auto',
    maxWidth: 1040,
    padding: '18px 24px',
  },
  brand: {
    alignItems: 'center',
    color: colors.text,
    display: 'flex',
    fontSize: 18,
    fontWeight: 800,
    gap: 10,
    textDecoration: 'none',
  },
  brandLogo: {
    borderRadius: 8,
    display: 'block',
    height: 36,
    width: 36,
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-end',
  },
  navLink: {
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    color: colors.text,
    fontSize: 14,
    fontWeight: 700,
    padding: '7px 11px',
    textDecoration: 'none',
  },
  navLinkActive: {
    border: `1px solid ${colors.accent}`,
    borderRadius: 8,
    color: colors.surface,
    background: colors.accent,
    fontSize: 14,
    fontWeight: 700,
    padding: '7px 11px',
    textDecoration: 'none',
  },
  hero: {
    background: colors.accent,
    color: 'white',
  },
  heroInner: {
    margin: '0 auto',
    maxWidth: 1040,
    padding: '56px 24px 48px',
  },
  h1: {
    fontSize: 'clamp(22px, 4vw, 40px)',
    letterSpacing: 0,
    lineHeight: 1.2,
    margin: 0,
    maxWidth: 820,
  },
  lead: {
    color: 'rgba(255,255,255,0.86)',
    fontSize: 17,
    margin: '20px 0 0'
  },
  heroUpdatedAt: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13,
    margin: '12px 0 0',
  },
  main: {
    margin: '0 auto',
    maxWidth: 1040,
    padding: '30px 24px 56px',
  },
  summary: {
    background: colors.section,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    display: 'grid',
    gap: 16,
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginBottom: 28,
    padding: 18,
  },
  summaryDiv: {
    minWidth: 0,
  },
  summaryDt: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 3,
  },
  summaryDd: {
    fontSize: 15,
    fontWeight: 800,
    margin: 0,
  },
  doc: {
    padding: '0 0 12px',
  },
  h2: {
    borderBottom: `1px solid ${colors.border}`,
    fontSize: 26,
    lineHeight: 1.3,
    margin: '0 0 24px',
    paddingBottom: 12,
  },
  h3: {
    fontSize: 18,
    lineHeight: 1.45,
    margin: '30px 0 8px',
  },
  p: {
    margin: '0 0 14px',
  },
  ul: {
    margin: '8px 0 18px',
    paddingLeft: '1.35em',
  },
  note: {
    background: '#fff8e1',
    border: '1px solid #f0d887',
    borderRadius: 8,
    color: '#554308',
    marginTop: 24,
    padding: '14px 16px',
  },
  siteFooter: {
    borderTop: `1px solid ${colors.border}`,
    color: colors.muted,
    fontSize: 13,
    padding: '22px 24px 34px',
    textAlign: 'center' as const,
  },
};

export const responsiveCss = `
  @media (max-width: 720px) {
    .site-header-inner-rsp { align-items: flex-start !important; flex-direction: column !important; }
    .nav-rsp { justify-content: flex-start !important; }
    .hero-inner-rsp { padding-top: 42px !important; }
    .summary-rsp { grid-template-columns: 1fr !important; }
    .doc-rsp { padding: 22px 18px !important; }
  }
`;
