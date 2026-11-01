import Swatch from './Swatch';

type Story = { quote: string; who: string; item: string; from: number[]; to: number };

export default function StoryCard({ s }: { s: Story }) {
  return (
    <figure className="story" style={{ margin: 0 }}>
      <div className="story-swatch" aria-hidden>
        <div className="from">{s.from.map((f, i) => <Swatch key={i} i={f} />)}</div>
        <Swatch i={s.to} className="to" />
      </div>
      <blockquote>{s.quote}</blockquote>
      <figcaption>{s.who} · {s.item}</figcaption>
    </figure>
  );
}
