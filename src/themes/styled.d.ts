import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors
    textColors: Colors
  }

  type Colors = Record<Color, string>
  export type Color = 'primary' | 'secondary'
}
