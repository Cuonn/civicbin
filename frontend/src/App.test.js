import { render, screen } from '@testing-library/react';
import { AuthProvider } from './context/AuthContext';
import App from './App';

test('renders logic page by default when not authenticated', () => {
  render(
    <AuthProvider>
        <App />
    </AuthProvider>
  );
  const loginHeading = screen.getByText(/login/i);
  expect(loginHeading).toBeInTheDocument();
});
