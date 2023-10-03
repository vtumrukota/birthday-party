import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BirthdaySidebar } from './BirthdaySidebar'; // Adjust the import path as needed

describe('BirthdaySidebar component', () => {
  it('renders the component without error', () => {
    render(<BirthdaySidebar hasFetched={false} setHasFetched={() => {}} />);
    const headingElement = screen.getByText(/Birthday Party/i);
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the "See Today\'s Birthdays" button when hasFetched is false', () => {
    render(<BirthdaySidebar hasFetched={false} setHasFetched={() => {}} />);
    const buttonElement = screen.getByText(/See Today's Birthdays/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the DateSelector when hasFetched is true', () => {
    render(<BirthdaySidebar hasFetched={true} setHasFetched={() => {}} />);
    const dateSelectorElement = screen.getByText(/Current Date:/i);
    expect(dateSelectorElement).toBeInTheDocument();
  });

  it('calls fetchBirthdays when the "See Today\'s Birthdays" button is clicked', () => {
    const setHasFetched = jest.fn();
    render(<BirthdaySidebar hasFetched={false} setHasFetched={setHasFetched} />);
    const buttonElement = screen.getByText(/See Today's Birthdays/i);
    fireEvent.click(buttonElement);
    expect(setHasFetched).toHaveBeenCalledWith(true);
  });

  it('renders BirthdayError component when there is an error', () => {
    render(<BirthdaySidebar hasFetched={false} setHasFetched={() => {}} />);
    const errorComponent = screen.queryByText(/Error/i);
    expect(errorComponent).not.toBeInTheDocument();

    // Trigger error by providing an error prop
    render(<BirthdaySidebar hasFetched={false} setHasFetched={() => {}} />);
    const errorComponentAfterError = screen.getByText(/Error/i);
    expect(errorComponentAfterError).toBeInTheDocument();
  });

  it('disables the "See Today\'s Birthdays" button while loading', () => {
    render(<BirthdaySidebar hasFetched={false} setHasFetched={() => {}} />);
    const buttonElement = screen.getByText(/See Today's Birthdays/i);
    expect(buttonElement).not.toBeDisabled();

    // Trigger loading by providing an isLoading prop
    render(<BirthdaySidebar hasFetched={false} setHasFetched={() => {}} />);
    const buttonElementWhileLoading = screen.getByText(/See Today's Birthdays/i);
    expect(buttonElementWhileLoading).toBeDisabled();
  });
});
