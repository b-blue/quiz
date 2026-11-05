import { useContext, useRef, useState } from 'react';
import type { ReactNode, TouchEventHandler } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import StyleIcon from '@mui/icons-material/StyleOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBookOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import FullscreenIcon from '@mui/icons-material/FullscreenOutlined';
import LightGrid from './LightGrid';
import { NavContext } from '../lib/NavContext';

const MODES = ['system', 'light', 'dark'] as const;
const MODE_LABEL = { system: 'System', light: 'Light', dark: 'Dark' } as const;

export const PAGE_WIDTH = 960;

interface Props {
  title: string;
  subtitle?: string;
  extra?: ReactNode; // rendered inside the sticky app bar, under the title row
  actions?: ReactNode; // sticky bottom action bar
  children: ReactNode;
  onTouchStart?: TouchEventHandler;
  onTouchMove?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
  onTouchCancel?: TouchEventHandler;
}

export default function AppShell({ title, subtitle, extra, actions, children, ...touch }: Props) {
  const nav = useContext(NavContext);
  const { mode, setMode } = useColorScheme();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const pressStart = useRef<{ t: number; x: number; y: number } | null>(null);
  const longPressed = useRef(false);

  function onTouchStart(e: React.TouchEvent) {
    e.stopPropagation();
    const t = e.touches[0];
    pressStart.current = { t: e.timeStamp, x: t.clientX, y: t.clientY };
    longPressed.current = false;
  }

  // Fullscreen needs a user gesture, so toggle when the finger lifts after a long hold.
  function onTouchEnd(e: React.TouchEvent) {
    e.stopPropagation();
    const s = pressStart.current;
    pressStart.current = null;
    if (!s || e.timeStamp - s.t < 500) return;
    const t = e.changedTouches[0];
    if (Math.hypot(t.clientX - s.x, t.clientY - s.y) > 10) return;
    longPressed.current = true;
    toggleFullscreen();
  }

  function toggleFullscreen() {
    if (!document.fullscreenEnabled) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => {});
  }

  function onGridClick(e: React.MouseEvent<HTMLElement>) {
    if (longPressed.current) { longPressed.current = false; return; }
    setAnchor(e.currentTarget);
  }

  const close = () => setAnchor(null);
  const run = (fn: () => void) => () => { close(); fn(); };
  const nextMode = MODES[(MODES.indexOf((mode ?? 'system') as typeof MODES[number]) + 1) % MODES.length];
  const ModeIcon = mode === 'dark' ? DarkModeIcon : mode === 'light' ? LightModeIcon : SettingsBrightnessIcon;

  return (
    <Box {...touch} sx={{ minHeight: '100dvh', bgcolor: 'background.default', color: 'text.primary', pb: actions ? 11 : 4 }}>
      <AppBar position="sticky" elevation={2} sx={{ pt: 'calc(env(safe-area-inset-top, 0px) + var(--app-top-inset, 0px))' }}>
        <Container maxWidth={false} disableGutters sx={{ maxWidth: PAGE_WIDTH }}>
          <Toolbar sx={{ gap: 1.5, minHeight: 64 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" component="h1" sx={{ fontWeight: 500, lineHeight: 1.25, overflowWrap: 'anywhere' }}>{title}</Typography>
              {subtitle && <Typography variant="caption" sx={{ opacity: 0.85, display: 'block' }}>{subtitle}</Typography>}
            </Box>
            <ButtonBase
              onClick={onGridClick}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onContextMenu={e => e.preventDefault()}
              aria-label="Open menu"
              aria-haspopup="menu"
              sx={{ borderRadius: 2, flex: 'none', WebkitTouchCallout: 'none', userSelect: 'none' }}
            >
              <LightGrid />
            </ButtonBase>
          </Toolbar>
          {extra && <Box sx={{ px: 2, pb: 1.5 }}>{extra}</Box>}
        </Container>
      </AppBar>

      <Menu anchorEl={anchor} open={!!anchor} onClose={close} slotProps={{ paper: { sx: { minWidth: 220 } } }}>
        <MenuItem onClick={run(nav.openHub)}><ListItemIcon><HomeIcon /></ListItemIcon><ListItemText>Hub</ListItemText></MenuItem>
        <MenuItem onClick={run(() => nav.openQuiz('aws'))}><ListItemIcon><StyleIcon /></ListItemIcon><ListItemText>Quiz · CLF-C02</ListItemText></MenuItem>
        <MenuItem onClick={run(() => nav.openQuiz('saa'))}><ListItemIcon><StyleIcon /></ListItemIcon><ListItemText>Quiz · SAA-C03</ListItemText></MenuItem>
        <MenuItem onClick={run(nav.openStudy)}><ListItemIcon><MenuBookIcon /></ListItemIcon><ListItemText>Study guide</ListItemText></MenuItem>
        <Divider />
        <MenuItem onClick={() => setMode(nextMode)}><ListItemIcon><ModeIcon /></ListItemIcon><ListItemText>Theme: {MODE_LABEL[(mode ?? 'system') as typeof MODES[number]]}</ListItemText></MenuItem>
        <MenuItem onClick={run(toggleFullscreen)}><ListItemIcon><FullscreenIcon /></ListItemIcon><ListItemText>Fullscreen</ListItemText></MenuItem>
      </Menu>

      <Container maxWidth={false} sx={{ maxWidth: PAGE_WIDTH, pt: 2 }}>{children}</Container>

      {actions && (
        <Paper elevation={8} square sx={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 1100, pb: 'env(safe-area-inset-bottom)' }}>
          <Container maxWidth={false} sx={{ maxWidth: PAGE_WIDTH, py: 1.25, display: 'flex', gap: 1, alignItems: 'center' }}>
            {actions}
          </Container>
        </Paper>
      )}
    </Box>
  );
}
