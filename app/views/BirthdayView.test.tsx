import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BirthdayView } from './BirthdayView';

describe('BirthdayView Component', () => {
  it('renders <BirthdayWelcome /> when hasFetched is false', () => {
    render(<BirthdayView />);

    // ensure view has rendered w/ welcome text
    expect(screen.getByText('Welcome to Birthday Party!')).toBeInTheDocument();
    expect(screen.getByText('Please select a month and day to start the fun!')).toBeInTheDocument();

    // ensure that the BirthdayList is not rendered
    expect(screen.queryByLabelText('Search Birthdays')).not.toBeInTheDocument();
  });

  it('renders <BirthdayList /> when hasFetched is true', () => {
    render(<BirthdayView />);
    
    // ensure view has rendered w/ sidebar
    expect(screen.getByText('Welcome to Birthday Party!')).toBeInTheDocument();

    // click on intial trigger to fetch birthdays
    fireEvent.click(screen.getByLabelText('See Birthdays'));

    waitFor(() => {
      // Ensure that the BirthdayList component is rendered after setting hasFetched to true
      expect(screen.queryByLabelText('Search Birthdays')).toBeInTheDocument();
  
      // Ensure that the BirthdayWelcome component is no longer rendered
      expect(screen.queryByText('Welcome to Birthday Party!')).not.toBeInTheDocument();
    })
  });
});
