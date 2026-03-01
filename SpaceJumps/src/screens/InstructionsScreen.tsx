import { useGame } from '../context/GameContext';
import { CHARACTERS } from '../data/characters';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-glass rounded-2xl p-4 border border-space-border">
      <h3 className="font-orbitron text-space-cyan text-base font-bold mb-3 text-right">{title}</h3>
      {children}
    </div>
  );
}

function ControlRow({ icon, label, desc }: { icon: string; label: string; desc: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-0">
      <p className="text-white/60 text-sm font-mono text-right flex-1">{desc}</p>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-orbitron text-white font-bold text-sm">{label}</span>
        <div className="w-10 h-10 rounded-xl bg-black/50 border border-space-border flex items-center justify-center text-xl flex-shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
}

export function InstructionsScreen() {
  const { goTo } = useGame();

  return (
    <div className="screen-container stars-bg" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-safe pb-3 border-b border-space-border">
        <div className="flex-1">
          <h2 className="font-syncopate font-bold text-white text-lg text-right">איך משחקים?</h2>
          <p className="text-space-muted text-xs font-mono text-right">מדריך המשחק</p>
        </div>
        <button onPointerDown={() => goTo('home')} className="text-white/60 text-2xl w-10 h-10 flex items-center justify-center flex-shrink-0">→</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-5 pb-6">

          {/* Overview */}
          <Section title="🚀 סיפור המשחק">
            <p className="text-white/70 text-sm font-mono leading-relaxed text-right">
              ברוכים הבאים ל-<span className="text-space-cyan font-bold">SPACE JUMPS</span>!<br /><br />
              תבחר גיבור, תבחר עולם, ותרוץ דרך החלל — תקפוץ מעל מכשולים, תלחם באויבים עם נשק ועם קסמים,
              ותאסוף מטבעות. בסוף כל עולם מחכה לך <span className="text-red-400 font-bold">בוס עצום</span> שצריך לנצח!
            </p>
          </Section>

          {/* Controls */}
          <Section title="🎮 שליטות">
            <div className="flex flex-col">
              <ControlRow icon="👆" label="הקשה / החלקה למעלה" desc="קפיצה" />
              <ControlRow icon="👇" label="החלקה למטה" desc="שקיעה / החלקה" />
              <ControlRow icon="⚔" label="כפתור תקיפה" desc="מכה את האויב" />
              <ControlRow icon="✦" label="לחיצה ארוכה" desc="קסם (כשהבר מלא)" />
            </div>
          </Section>

          {/* Running section */}
          <Section title="🏃 מצב ריצה">
            <div className="flex flex-col gap-2 text-sm font-mono text-white/70 text-right">
              <div className="flex items-start gap-2 justify-end">
                <p>הגיבור שלך רץ לבד. תקפוץ מעל <span className="text-yellow-400">אסטרואידים</span> ו<span className="text-red-400">מכשולים</span>.</p>
                <span className="text-xl flex-shrink-0">🪨</span>
              </div>
              <div className="flex items-start gap-2 justify-end">
                <p>אסוף <span className="text-yellow-400">מטבעות זהב</span> ו<span className="text-blue-400">אבני חן</span> לאורך הדרך.</p>
                <span className="text-xl flex-shrink-0">🪙</span>
              </div>
              <div className="flex items-start gap-2 justify-end">
                <p><span className="text-red-400">כדורי בריאות</span> אדומים ממלאים את הבריאות שלך.</p>
                <span className="text-xl flex-shrink-0">❤</span>
              </div>
              <div className="flex items-start gap-2 justify-end">
                <p><span className="text-purple-400">גבישי קסם</span> סגולים ממלאים את בר הקסם שלך.</p>
                <span className="text-xl flex-shrink-0">💎</span>
              </div>
            </div>
          </Section>

          {/* Combat */}
          <Section title="⚔ מצב קרב">
            <div className="flex flex-col gap-3 text-sm font-mono text-white/70 text-right">
              <p>כשאויבים מופיעים, המשחק עובר ל<span className="text-red-400 font-bold">מצב קרב</span>! הריצה עוצרת ואפשר ללחום.</p>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-300 font-bold mb-1">כפתור ⚔ תקיפה:</p>
                <p>מכה את האויב הקרוב. תקוף שוב ושוב כדי לעשות קומבו ולמלא את בר הקסם!</p>
              </div>
              <div className="rounded-xl p-3" style={{ background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.3)' }}>
                <p className="font-bold mb-1" style={{ color: '#c084fc' }}>כפתור ✦ קסם:</p>
                <p>כשבר הקסם מלא — לחץ לחיצה ארוכה לקסם חזק! כל גיבור יש לו קסם שונה.</p>
              </div>
              <p>כשכל האויבים מובסים — הריצה ממשיכה!</p>
            </div>
          </Section>

          {/* Boss */}
          <Section title="👹 מלחמת בוס">
            <div className="text-sm font-mono text-white/70 text-right flex flex-col gap-2">
              <p>בסוף כל עולם מחכה לך <span className="text-orange-400 font-bold">בוס עצום</span>!</p>
              <p>תראה בר הבריאות של הבוס בחלק העליון של המסך.</p>
              <p>השתמש ב<span className="text-red-400 font-bold">קומבואים</span> ו<span className="text-purple-400 font-bold">קסמים</span> כדי לנצח.</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="bg-black/30 rounded-xl p-2 text-center border border-orange-500/30">
                  <div className="text-2xl">🤖</div>
                  <div className="font-orbitron text-orange-400 text-xs font-bold">TITAN</div>
                  <div className="text-white/40 text-xs">עולם 1</div>
                </div>
                <div className="bg-black/30 rounded-xl p-2 text-center border border-green-500/30">
                  <div className="text-2xl">👾</div>
                  <div className="font-orbitron text-green-400 text-xs font-bold">QUEEN</div>
                  <div className="text-white/40 text-xs">עולם 2</div>
                </div>
                <div className="bg-black/30 rounded-xl p-2 text-center border border-purple-500/30">
                  <div className="text-2xl">🌑</div>
                  <div className="font-orbitron text-purple-400 text-xs font-bold">VOID</div>
                  <div className="text-white/40 text-xs">עולם 3</div>
                </div>
              </div>
            </div>
          </Section>

          {/* Characters */}
          <Section title="🦸 הגיבורים">
            <div className="flex flex-col gap-3">
              {CHARACTERS.map(char => (
                <div key={char.id} className="flex items-start gap-3 p-3 rounded-xl border"
                  style={{ background: `${char.colors.secondary}44`, borderColor: char.colors.primary + '40' }}>
                  <div className="flex-1 text-right min-w-0">
                    <div className="font-syncopate text-white font-bold text-sm">{char.name}</div>
                    <div className="font-mono text-xs mt-0.5" style={{ color: char.colors.primary }}>{char.tagline}</div>
                    <p className="font-mono text-xs text-white/50 mt-1.5 leading-relaxed">{char.tip}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${char.colors.secondary}, ${char.colors.primary}30)`, border: `1.5px solid ${char.colors.primary}` }}>
                    {char.ability.weaponType === 'sword' ? '⚔' : char.ability.weaponType === 'fists' ? '👊' : char.ability.weaponType === 'staff' ? '✨' : '🐾'}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Coins */}
          <Section title="🪙 מטבעות ושדרוגים">
            <div className="text-sm font-mono text-white/70 text-right flex flex-col gap-2">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-yellow-400">10 נקודות</span>
                <span>מטבע אחד</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-yellow-400">250 נקודות</span>
                <span>אבן חן כחולה</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-yellow-400">100 נקודות</span>
                <span>אויב מובס</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-yellow-400">150 נקודות</span>
                <span>קסם על אויב</span>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mt-2">
                <p className="text-yellow-300 font-bold">🛒 חנות:</p>
                <p className="mt-1">תשתמש במטבעות כדי לפתוח גיבורים חדשים ועולמות חדשים!</p>
              </div>
            </div>
          </Section>

          {/* Tips */}
          <Section title="💡 טיפים לאלופים">
            <div className="flex flex-col gap-2 text-sm font-mono text-white/70 text-right">
              <div className="flex items-start gap-2 justify-end">
                <p>השתמש בקסם ברגע שהבר מתמלא — זה עושה <span className="text-purple-400">הכי הרבה נזק</span>!</p>
                <span className="text-xl flex-shrink-0">⚡</span>
              </div>
              <div className="flex items-start gap-2 justify-end">
                <p>קסם של לירה הכי חזק, אבל יש לה <span className="text-red-400">פחות בריאות</span> — שמור עליה!</p>
                <span className="text-xl flex-shrink-0">💜</span>
              </div>
              <div className="flex items-start gap-2 justify-end">
                <p>אסוף <span className="text-red-400">כדורי בריאות</span> אדומים לפני מלחמת הבוס!</p>
                <span className="text-xl flex-shrink-0">❤</span>
              </div>
              <div className="flex items-start gap-2 justify-end">
                <p>השלם <span className="text-green-400">משימות</span> כדי להרוויח מטבעות בונוס!</p>
                <span className="text-xl flex-shrink-0">✅</span>
              </div>
              <div className="flex items-start gap-2 justify-end">
                <p>בוס הטיטאן ב<span className="text-cyan-400">שדה הנבולה</span> הכי קל — התחל משם!</p>
                <span className="text-xl flex-shrink-0">🚀</span>
              </div>
            </div>
          </Section>

          {/* CTA */}
          <button onPointerDown={() => goTo('character-select')} className="btn-primary w-full py-5 text-xl">
            🚀 בואו נשחק!
          </button>
        </div>
      </div>
    </div>
  );
}
