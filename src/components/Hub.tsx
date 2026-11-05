import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';
import { SHOW_SECTION_KEY, showSectionEnabled } from '../lib/studySections';
import { showScoreEnabled, saveShowScore, loadTopInset, applyTopInset, MAX_TOP_INSET } from '../lib/appState';
import { PRACTICE_TEST_NUMBERS } from '../lib/practiceTests';
import AppShell from './AppShell';

type QuizMode = 'aws' | 'saa';

const QUIZZES: { mode: QuizMode; label: string }[] = [
  { mode: 'aws', label: 'CLF-C02' },
  { mode: 'saa', label: 'SAA-C03' },
];

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.1em' }}>{title}</Typography>
      {hint && <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{hint}</Typography>}
      {children}
    </Paper>
  );
}

function SwitchRow({ label, hint, checked, onChange }: { label: string; hint: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 0.5 }}>
      <Box>
        <Typography>{label}</Typography>
        <Typography variant="body2" color="text.secondary">{hint}</Typography>
      </Box>
      <Switch checked={checked} onChange={e => onChange(e.target.checked)} slotProps={{ input: { 'aria-label': label } }} />
    </Box>
  );
}

export default function Hub({ onStartQuiz, onStartPractice }: { onStartQuiz: (mode: QuizMode) => void; onStartPractice: (test: number) => void }) {
  const [showSection, setShowSection] = useState(showSectionEnabled());
  const [muted, setMutedState] = useState(localStorage.getItem('quiz:muted') === '1');
  const [showScore, setShowScore] = useState(showScoreEnabled());
  const [topInset, setTopInset] = useState(loadTopInset());
  const { mode, setMode } = useColorScheme();

  function setMuted(next: boolean) {
    try { localStorage.setItem('quiz:muted', next ? '1' : '0'); } catch { /* storage unavailable */ }
    setMutedState(next);
  }

  return (
    <AppShell title="AWS Test Hub">
      <Section title="Quiz mode" hint="Flashcard-style: match each clue to the right service">
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
          {QUIZZES.map(q => (
            <Button key={q.mode} variant="contained" size="large" onClick={() => onStartQuiz(q.mode)}>{q.label}</Button>
          ))}
        </Box>
      </Section>

      <Section title="Practice test mode" hint="Take a full 65-question practice test in random order">
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
          {PRACTICE_TEST_NUMBERS.map(n => (
            <Button key={n} variant="outlined" size="large" onClick={() => onStartPractice(n)}>Test {n}</Button>
          ))}
        </Box>
      </Section>

      <Section title="Settings">
        <SwitchRow label="Practice test score" hint="Show the running score in the header during a practice test" checked={showScore} onChange={v => { saveShowScore(v); setShowScore(v); }} />
        <SwitchRow label="Study guide topic" hint="Show each practice question's study-guide section" checked={showSection} onChange={v => { try { localStorage.setItem(SHOW_SECTION_KEY, v ? '1' : '0'); } catch { /* storage unavailable */ } setShowSection(v); }} />
        <SwitchRow label="Sound effects" hint="Quiz sounds and confetti" checked={!muted} onChange={v => setMuted(!v)} />
        <Box sx={{ py: 0.5 }}>
          <Typography>Top spacing</Typography>
          <Typography variant="body2" color="text.secondary">Add space above the header if it sits too close to the top of the screen ({topInset}px)</Typography>
          <Slider
            value={topInset}
            min={0}
            max={MAX_TOP_INSET}
            step={2}
            onChange={(_, v) => { const n = v as number; setTopInset(n); applyTopInset(n, true); }}
            aria-label="Top spacing"
            sx={{ mx: 1, width: 'calc(100% - 16px)' }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, pt: 1 }}>
          <Box>
            <Typography>Theme</Typography>
            <Typography variant="body2" color="text.secondary">Light, dark, or follow the device</Typography>
          </Box>
          <ToggleButtonGroup size="small" exclusive value={mode ?? 'system'} onChange={(_, v) => v && setMode(v)} aria-label="Theme">
            <ToggleButton value="light">Light</ToggleButton>
            <ToggleButton value="dark">Dark</ToggleButton>
            <ToggleButton value="system">System</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Section>
    </AppShell>
  );
}
