import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors
    textColors: Pick<Colors, 'primary' | 'secondary'>
  }

  type Colors = Record<
    | 'primary'
    | 'primaryLight'
    | 'primaryDark'
    | 'secondary'
    | 'body'
    | 'black'
    | 'white',
    string
  >

  export type Color = keyof Colors
}
