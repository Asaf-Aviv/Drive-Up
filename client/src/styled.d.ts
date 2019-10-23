import 'styled-components';

declare module 'styled-components' {
  export type Size = 'small' | 'normal' | 'big' | 'huge';
  export type Colors = 'primary' | 'secondary';

  export interface DefaultTheme {
    colors: {
      [key in Colors]: string;
    };
    textColors: {
      [key in Colors]: string;
    };
    button: {
      size: {
        [key in Size]: string;
      };
    };
  }
}
