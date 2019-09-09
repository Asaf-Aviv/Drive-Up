import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { MemoryRouter } from 'react-router-dom';

type InferProps<
  Component extends React.FC<any>
> = Component extends React.FC<infer Props>
  ? Props
  : never;

export const renderWithProviders = <T extends React.FC<any>>(
  Component: T,
  props: InferProps<T>
) => (
  <MemoryRouter>
    <MuiThemeProvider theme={createMuiTheme()}>
      <Component {...props} />
    </MuiThemeProvider>
  </MemoryRouter>
);
