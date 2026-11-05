import { createTheme } from '@mui/material/styles';

function build(light: string, dark: string) {
  return createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: {
    light: { palette: { primary: { main: light }, background: { default: '#f5f7fa', paper: '#ffffff' } } },
    dark: { palette: { primary: { main: dark }, background: { default: '#121212', paper: '#1e1e1e' } } },
  },
  shape: { borderRadius: 10 },
  typography: { button: { fontWeight: 500 } },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 20 } } },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => theme.applyStyles('dark', {
          backgroundColor: theme.vars!.palette.background.paper,
          color: theme.vars!.palette.primary.main,
          backgroundImage: 'none',
          borderBottom: `1px solid ${theme.vars!.palette.divider}`,
        }),
      },
    },
  },
});
}

export const blueTheme = build('#1976d2', '#90caf9');
export const greenTheme = build('#2e7d32', '#81c784');
