import '@testing-library/jest-dom'
import Login from '@/pages/login';
import { render, screen } from '../utils/MockProviders';

describe('Login Page', () => {
  it('should have email input', () => {
    render(<Login />);
    const input = screen.getByLabelText('Email');

    expect(input).toBeInTheDocument();
  })

  it('should have password input', () => {
    render(<Login />);
    const input = screen.getByLabelText('Password');

    expect(input).toBeInTheDocument();
  })

  it('should have submit button', () => {
    render(<Login />);
    const input = screen.getByText('Login');

    expect(input).toBeInTheDocument();
  })
})