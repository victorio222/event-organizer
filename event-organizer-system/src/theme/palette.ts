import { PaletteColorOptions, PaletteOptions } from '@mui/material/styles';
import {
  gray,
  red,
  green,
  blue,
  skyblue,
  purple,
  yellow,
  white,
  transparentRed,
  transparentGreen,
  transparentYellow,
} from './colors';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    neutral?: PaletteColorOptions;
    transparent?: {
      success: PaletteColorOptions;
      warning: PaletteColorOptions;
      error: PaletteColorOptions;
    };
    uepBlue: PaletteColorOptions;
    gradients?: {
      primary: PaletteColorOptions;
      error: PaletteColorOptions; 
      green: PaletteColorOptions; 
      yellow: PaletteColorOptions;
      teal: PaletteColorOptions;
      tawny: PaletteColorOptions;
    };
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
    state?: string;
  }
  interface Palette {
    neutral: PaletteColor;
    gradients: {
      primary: PaletteColor;
      error: PaletteColor;
      green: PaletteColor;
      yellow: PaletteColor;
      teal: PaletteColor;
      tawny: PaletteColor;
      uepBlue: PaletteColor;
    };
    transparent: {
      success: PaletteColor;
      warning: PaletteColor;
      error: PaletteColor;
    };
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
    state: string;
  }
}

const palette: PaletteOptions = {
  neutral: {
    main: gray[500],
  },
  primary: {
    main: purple[500],
  },
  secondary: {
    light: skyblue[500],
    main: blue[500],
  },
  info: {
    light: white[100],
    main: white[200],
    dark: white[300],
  },
  success: {
    main: green[500],
  },
  warning: {
    main: yellow[500],
  },
  error: {
    main: red[500],
  },
  text: {
    primary: blue[500],
    secondary: blue[400],
    disabled: gray[500],
  },  
  uepBlue: {
    main: 'rgb(14, 55, 131)',
    state: 'rgba(14, 55, 131, 0.8)',
  },
  gradients: {
    primary: {
      main: purple[500],
      state: purple[300],
    },
    error: {
      main: red[500],
      state: 'rgba(255, 99, 71, 0.8)', // Tomato red for state
    },
    green: {
      main: 'rgb(28, 178, 28)',
      state: 'rgba(74, 217, 74, 0.8)',
    },
    yellow: {
      main: 'rgb(212, 159, 15)',
      state: 'rgba(248, 195, 51, 0.8)',
    },
    teal: {
      main: 'rgb(0, 128, 128)',
      state: 'rgba(57, 170, 170, 0.8)',
    },
    tawny: {
      main: 'rgb(205, 87, 0)',
      state: 'rgba(240, 130, 52, 0.8)',
    }
  },
  transparent: {
    success: {
      main: transparentGreen[500],
    },
    warning: {
      main: transparentYellow[500],
    },
    error: {
      main: transparentRed[500],
    },
  },
};

export default palette;
