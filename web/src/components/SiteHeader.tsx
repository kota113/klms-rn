import {s, responsiveCss} from './styles';

interface Props {
  activePage: 'privacy' | 'terms';
}

export default function SiteHeader({activePage}: Props) {
  return (
    <>
      <style>{responsiveCss}</style>
      <header style={s.siteHeader}>
        <div style={s.siteHeaderInner} className="site-header-inner-rsp">
          <a style={s.brand} href="/terms">
            <img style={s.brandLogo} src="/icon.png" alt="K-app ロゴ" width={36} height={36}/>
            K-app
          </a>
          <nav style={s.nav} className="nav-rsp" aria-label="主要ナビゲーション">
            <a style={activePage === 'privacy' ? s.navLinkActive : s.navLink} href="/privacy">プライバシーポリシー</a>
            <a style={activePage === 'terms' ? s.navLinkActive : s.navLink} href="/terms">利用規約</a>
          </nav>
        </div>
      </header>
    </>
  );
}
