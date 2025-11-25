import { getSections } from '../lib/terms';
import styles from './Quiz.module.css';
import LightGrid from './LightGrid';

export default function Settings({ onBack }: { onBack?: () => void }) {
  const sections = getSections();

  const muted = localStorage.getItem('quiz:muted') === '1';
  const selectedSection = (() => {
    const v = localStorage.getItem('aws:selectedSection') || '';
    return typeof v === 'string' ? v.trim() : v;
  })();
  const startMode = localStorage.getItem('app:startMode') === 'bio' ? 'bio' : 'aws';

  function setMuted(next: boolean) {
    try { localStorage.setItem('quiz:muted', next ? '1' : '0'); } catch (e) {}
    window.location.reload();
  }
  
  function setStartMode(next: 'aws'|'bio') {
    try { localStorage.setItem('app:startMode', next); } catch (e) {}
    window.location.reload();
  }
  function setSection(val: string) {
    try {
      const v = typeof val === 'string' ? val.trim() : val;
      if (!v) localStorage.removeItem('aws:selectedSection');
      else localStorage.setItem('aws:selectedSection', v as string);
    } catch (e) {}
    window.location.reload();
  }

  return (
    <div className={styles.quizContainer} data-variant="settings">
      <div className={styles.headerBar}>
        <div className={styles.gizmoWell} aria-hidden>
          <LightGrid variant="settings" />
        </div>
        <div className={styles.headerDivider} />
        <div className={styles.questionWell}>
          <div className={styles.questionText}>Settings</div>
          <div className={styles.terminalLine}><span className={styles.terminalPrompt}>#</span>Customize quiz behavior, filters, and audio</div>
        </div>
      </div>

      <div className={styles.settingsCard} style={{ marginTop: 12, padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700 }}>Start Mode</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Choose which quiz starts when the app loads</div>
          </div>
          <div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className={startMode === 'aws' ? `${styles.timedBtn} ${styles.timedBtnActive} ${styles.btn3d}` : `${styles.timedBtn} ${styles.btn3d}`} onClick={() => setStartMode('aws')}>AWS</button>
              <button className={startMode === 'bio' ? `${styles.timedBtn} ${styles.timedBtnActive} ${styles.btn3d}` : `${styles.timedBtn} ${styles.btn3d}`} onClick={() => setStartMode('bio')}>BIO</button>
            </div>
          </div>
        </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16 }}>
              <button className={`${styles.muteBtn} ${styles.btn3d}`} onClick={() => setMuted(!muted)}>{muted ? 'Unmute' : 'Mute'}</button>
              {/* Ambient pulse feature removed — pulsing disabled globally */}
            </div>

        <div style={{ marginTop: 16 }}>
          <label style={{ color: 'var(--muted)', marginRight: 8 }}>Filter by section:</label>
          <div className={styles.filterRow}>
            <select className={styles.filterSelect} value={selectedSection} onChange={(e) => setSection(e.target.value)}>
              <option value="">All sections</option>
              {sections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {selectedSection && <button className={styles.clearFilter} onClick={() => setSection('')}>Clear</button>}
          </div>
        </div>

        <p style={{ color: 'var(--muted)', marginTop: 12 }}>Changes are applied immediately; the quiz will reload to pick up settings.</p>

        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
          <button className={`${styles.timedBtn} ${styles.btn3d}`} onClick={() => onBack ? onBack() : window.location.reload()}>Back</button>
        </div>
      </div>
    </div>
  );
}
