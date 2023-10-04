import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@/app/page'
 
describe('Home', () => {
  it('has content on the page', () => {
    render(<Home />)

    expect(screen.getByText('Welcome to Birthday Party!')).toBeInTheDocument()
  })
})