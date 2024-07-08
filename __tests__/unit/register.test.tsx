import '@testing-library/jest-dom'
import Register from '@/pages/register';
import { render, screen } from '../utils/MockProviders';

describe('Register Page', () => {
  it('should have first name input', () => {
    render(<Register />);
    const input = screen.getByLabelText('First name');

    expect(input).toBeInTheDocument();
  })

  it('should have last name input', () => {
    render(<Register />);
    const input = screen.getByLabelText('Last name');

    expect(input).toBeInTheDocument();
  })

  it('should have email input', () => {
    render(<Register />);
    const input = screen.getByLabelText('Email');

    expect(input).toBeInTheDocument();
  })

  it('should have phone number input', () => {
    render(<Register />);
    const input = screen.getByLabelText('Phone number');

    expect(input).toBeInTheDocument();
  })

  it('should have password input', () => {
    render(<Register />);
    const input = screen.getByLabelText('Create password');

    expect(input).toBeInTheDocument();
  })

  it('should have submit button', () => {
    render(<Register />);
    const input = screen.getByText('Create Account');

    expect(input).toBeInTheDocument();
  })
})