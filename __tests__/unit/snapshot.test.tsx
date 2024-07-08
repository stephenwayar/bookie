import '@testing-library/jest-dom'
import Login from '@/pages/login'
import Register from '@/pages/register'
import { render } from '../utils/MockProviders';

describe('Snapshots', () => {
  it('renders login unchanged', () => {
    const { container } = render(<Login />)

    expect(container).toMatchSnapshot()
  })

  it('renders register unchanged', () => {
    const { container } = render(<Register />)

    expect(container).toMatchSnapshot()
  })
})