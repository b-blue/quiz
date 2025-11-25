import { getSections } from '../lib/terms';
import styles from './Quiz.module.css';

export default function Settings() {
  const sections = getSections();

  const muted = localStorage.getItem('quiz:muted') === '1';
  const selectedSection = localStorage.getItem('aws:selectedSection') || '';
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
      if (!val) localStorage.removeItem('aws:selectedSection');
      else localStorage.setItem('aws:selectedSection', val);
    } catch (e) {}
    window.location.reload();
  }

  return (
    <div style={{ maxWidth: 720, margin: '1.5rem auto', padding: '1rem' }}>
      <h2>Settings</h2>

      <div className={styles.settingsCard} style={{ marginTop: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700 }}>Start Mode</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Choose which quiz starts when the app loads</div>
          </div>
          <div>
            <div className={styles.startSwitch}>
              <div className={`${styles.switchTrack} ${startMode === 'aws' ? styles.switchAws : styles.switchBio}`} onClick={() => setStartMode(startMode === 'aws' ? 'bio' : 'aws')}>
                <div className={`${styles.switchThumb} ${startMode === 'aws' ? styles.thumbRight : styles.thumbLeft}`} />
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
                <span className={styles.switchLabel}>Biology Quiz</span>
                <span className={styles.switchLabel}>AWS Quiz</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16 }}>
        <button className={styles.muteBtn} onClick={() => setMuted(!muted)}>{muted ? 'Unmute' : 'Mute'}</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <label style={{ color: 'var(--muted)', marginRight: 8 }}>Filter by section:</label>
        <select value={selectedSection} onChange={(e) => setSection(e.target.value)}>
          <option value="">All sections</option>
          {sections.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {selectedSection && <button className={styles.clearFilter} style={{ marginLeft: 8 }} onClick={() => setSection('')}>Clear</button>}
      </div>

      <p style={{ color: 'var(--muted)', marginTop: 12 }}>Changes are applied immediately; the quiz will reload to pick up settings.</p>
    </div>
  );
}
