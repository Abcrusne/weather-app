import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './components/App';

test('renders Weather App text', () => {
  render(<App />);
  const linkElement = screen.getByText('Weather App');
  expect(linkElement).toBeInTheDocument();
});
