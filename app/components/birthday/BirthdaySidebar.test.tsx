import '@testing-library/jest-dom'
import React, { use } from 'react';
import { render, screen, fireEvent, renderHook, waitFor, act } from '@testing-library/react';
import { BirthdaySidebar } from './BirthdaySidebar';
import { useOnThisDay } from '../../hooks/useOnThisDay';

const setHasFetched = jest.fn();

describe('BirthdaySidebar component', () => {
  it('renders the component without error', () => {
    render(<BirthdaySidebar hasFetched={false} setHasFetched={setHasFetched} />);
    
    expect(screen.getByText(/Birthday Party/i)).toBeInTheDocument();
  });

  it(`renders the "See Today's Birthdays" button when hasFetched is false`, () => {
    render(<BirthdaySidebar hasFetched={false} setHasFetched={setHasFetched} />);
    
    expect(screen.getByLabelText('See Birthdays')).toBeInTheDocument();
  });

  it('renders the DateSelector when hasFetched is true', () => {
    render(<BirthdaySidebar hasFetched={true} setHasFetched={setHasFetched} />);
    
    expect(screen.getByText(/Current Date:/i)).toBeInTheDocument();
  });

  it(`calls fetchBirthdays when the "See Today's Birthdays" button is clicked`, async () => {
    render(<BirthdaySidebar hasFetched={false} setHasFetched={setHasFetched} />);
    
    fireEvent.click(screen.getByLabelText('See Birthdays'));
    
    await waitFor(async () => {
      expect(setHasFetched).toHaveBeenCalledWith(true);
    })
  });

  it(`removes "See Today's Birthdays" button after fetching`, async () => {
    render(<BirthdaySidebar hasFetched={false} setHasFetched={setHasFetched} />);

    const { result } = renderHook(() => useOnThisDay({ day: '10', month: '03', triggerFetch: false }));

    fireEvent.click(screen.getByLabelText('See Birthdays'));
    
    await waitFor(async () => {
      expect(await screen.queryByLabelText('See Birthdays')).not.toBeInTheDocument();
    })
  });

  it('renders BirthdayError modal when there is an error fetching data', async () => {
    render(<BirthdaySidebar hasFetched={false} setHasFetched={setHasFetched} />);

    const { result } = renderHook(() => useOnThisDay({ day: '01', month: '45', triggerFetch: true }));


    fireEvent.click(screen.getByLabelText('See Birthdays'));
    
    await waitFor(async () => {
      expect(await screen.queryByText(`Sorry, we couldn't fetch any Birthdays!`)).toBeInTheDocument();
    })
  });
});
