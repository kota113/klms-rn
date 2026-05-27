import {s} from './styles';

interface Props {
  title: string;
  lead: string;
  updatedAt?: string;
}

export default function HeroSection({title, lead, updatedAt}: Props) {
  return (
    <section style={s.hero}>
      <div style={s.heroInner} className="hero-inner-rsp">
        <h1 style={s.h1}>{title}</h1>
        <p style={s.lead}>{lead}</p>
        {updatedAt && (
          <p style={s.heroUpdatedAt}>最終更新日：{updatedAt}</p>
        )}
      </div>
    </section>
  );
}
