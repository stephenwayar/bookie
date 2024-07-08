import '@testing-library/jest-dom'
import Home from '@/pages'
import { render, screen } from '../utils/MockProviders';

describe('Home Page', () => {
  it('renders welcome text', () => {
    render(<Home />)
    const text = screen.getByText('Explore a world of books and knowledge from talented authors')

    expect(text).toBeInTheDocument()
  })
})