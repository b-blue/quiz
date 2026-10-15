import { getSections, getSaaTerms } from '../lib/terms';
import styles from './Quiz.module.css';
import LightGrid from './LightGrid';

export default function Settings({ onBack }: { onBack?: () => void }) {
  const muted = localStorage.getItem('quiz:muted') === '1';
  const startMode = (() => {
    const v = localStorage.getItem('app:startMode');
    return v === 'bio' || v === 'aws' || v === 'saa' ? v : 'saa';
  })();
  const sectionMode = startMode === 'saa' ? 'saa' : 'aws';
  const sections = sectionMode === 'saa' ? getSections(getSaaTerms()) : getSections();
  const selectedSection = (() => {
    const v = localStorage.getItem(`${sectionMode}:selectedSection`) || '';
    return typeof v === 'string' ? v.trim() : v;
  })();

  function setMuted(next: boolean) {
    try { localStorage.setItem('quiz:muted', next ? '1' : '0'); } catch (e) {}
    window.location.reload();
  }
  
  function setStartMode(next: 'aws'|'saa'|'bio') {
    try { localStorage.setItem('app:startMode', next); } catch (e) {}
    window.location.reload();
  }
  function setSection(val: string) {
    try {
      const v = typeof val === 'string' ? val.trim() : val;
      if (!v) localStorage.removeItem(`${sectionMode}:selectedSection`);
      else localStorage.setItem(`${sectionMode}:selectedSection`, v as string);
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
        </div>
      </div>

      <div className={styles.settingsCard} style={{ marginTop: 12, padding: '1rem' }}>
        {/* Filter moved above Start Mode to prioritize section selection */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: 'var(--muted)', marginRight: 8 }}>Filter by section:</label>
          <div className={styles.filterRow}>
            <select className={styles.filterSelect} value={selectedSection} onChange={(e) => setSection(e.target.value)}>
              <option value="">All sections</option>
              {sections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {selectedSection && <button className={styles.clearFilter} onClick={() => setSection('')}>Clear</button>}
          </div>
        </div>

        <div className={styles.settingsStartMode}>
          <div>
            <div style={{ fontWeight: 700 }}>Start Mode</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Choose which quiz starts when the app loads</div>
          </div>
          <div className={styles.settingsModeButtons}>
            <button className={`${styles.timedBtn} ${styles.settingsModeButton} ${startMode === 'aws' ? styles.timedBtnActive : ''} ${styles.btn3d}`} onClick={() => setStartMode('aws')}>CLF-C02</button>
            <button className={`${styles.timedBtn} ${styles.settingsModeButton} ${startMode === 'saa' ? styles.timedBtnActive : ''} ${styles.btn3d}`} onClick={() => setStartMode('saa')}>SAA-C03</button>
          </div>
        </div>

        <div className={styles.settingsMuteSection}>
          <div>
            <div style={{ fontWeight: 700 }}>Audio</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Toggle quiz sound effects</div>
          </div>
          <button
            className={`${styles.muteBtn} ${styles.settingsMuteButton} ${styles.btn3d}`}
            onClick={() => setMuted(!muted)}
            aria-label={muted ? 'Sound is muted. Click to unmute.' : 'Sound is on. Click to mute.'}
            title={muted ? 'Sound is muted' : 'Sound is on'}
          >
            <span aria-hidden="true">{muted ? '🔇' : '🔊'}</span>
            {muted ? 'Muted' : 'Sound on'}
          </button>
        </div>

        <p style={{ color: 'var(--muted)', marginTop: 12 }}>Changes are applied immediately; the quiz will reload to pick up settings.</p>

        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
          <button className={`${styles.timedBtn} ${styles.btn3d}`} onClick={() => onBack ? onBack() : window.location.reload()}>Back</button>
        </div>
      </div>
    </div>
  );
}
