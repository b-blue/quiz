import { Component } from 'react';
import type { ReactNode } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const RELOAD_FLAG = 'app:chunkReload';

// A deploy replaces the hashed chunk files, so an already-open app can fail to load the lazy study guide.
function isChunkError(e: Error) {
  return /dynamically imported module|Importing a module script failed|Loading chunk|error loading dynamically/i.test(`${e.name} ${e.message}`);
}

export default class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    try {
      if (isChunkError(error) && sessionStorage.getItem(RELOAD_FLAG) !== '1') {
        sessionStorage.setItem(RELOAD_FLAG, '1');
        location.reload();
      }
    } catch { /* storage unavailable */ }
  }

  render() {
    if (!this.state.error) {
      try { sessionStorage.removeItem(RELOAD_FLAG); } catch { /* storage unavailable */ }
      return this.props.children;
    }
    return (
      <div style={{ padding: 24 }}>
        <Typography variant="h6" gutterBottom>Something went wrong</Typography>
        <Typography sx={{ mb: 2 }} color="text.secondary">{this.state.error.message}</Typography>
        <Button variant="contained" onClick={() => location.reload()}>Reload</Button>
      </div>
    );
  }
}
