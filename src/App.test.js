import { render, screen } from '@testing-library/react';
import App from './App';

test('renders book registration title', () => {
  render(<App />);
  // Procuramos pelo título que realmente existe
  const titleElement = screen.getByText(/cadastro de livros/i);
  expect(titleElement).toBeInTheDocument();
});