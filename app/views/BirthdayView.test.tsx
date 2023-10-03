import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BirthdayView } from './BirthdayView'; // Adjust the import path as needed

test('renders BirthdayWelcome when hasFetched is false', () => {
  render(<BirthdayView />);

  // Ensure that the BirthdayWelcome component is rendered initially
  const birthdayWelcomeElement = screen.getByText('Welcome to the BirthdayView');
  expect(birthdayWelcomeElement).toBeInTheDocument();

  // Ensure that the BirthdayList component is not rendered initially
  const birthdayListElement = screen.queryByText('Birthday List Content');
  expect(birthdayListElement).not.toBeInTheDocument();
});

test('renders BirthdayList when hasFetched is true', () => {
  render(<BirthdayView />);

  // Click a button or trigger an event that sets hasFetched to true
  // For example, you can simulate a button click
  const fetchButton = screen.getByText('Fetch Data');
  userEvent.click(fetchButton);

  // Ensure that the BirthdayList component is rendered after setting hasFetched to true
  const birthdayListElement = screen.getByText('Birthday List Content');
  expect(birthdayListElement).toBeInTheDocument();

  // Ensure that the BirthdayWelcome component is no longer rendered
  const birthdayWelcomeElement = screen.queryByText('Welcome to the BirthdayView');
  expect(birthdayWelcomeElement).not.toBeInTheDocument();
});
