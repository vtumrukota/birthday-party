import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { BirthdayList } from './BirthdayList';
import { DateSelectorContext } from '@/app/contexts/DateSelectorContext';

const server = setupServer(
  // Define your API mocking here using rest
  rest.get('/api/onthisday', (req: any, res: (arg0: any) => any, ctx: { json: (arg0: { births: { name: string; birthYear: number; description: string; }[]; }) => any; }) => {
    // Mock your API response here
    return res(
      ctx.json({
        births: [
          {
            name: 'John Doe',
            birthYear: 1990,
            description: 'Lorem ipsum',
          },
          // Add more mock data as needed
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());
describe('Birthday', () => {

})
test('renders the component', async () => {
  render(<BirthdayList />);
  // Assert that your component is initially rendered as expected
  expect(screen.getByText('View Birthdays on')).toBeInTheDocument();
});

test('fetches and displays birthdays on button click', async () => {
  render(<BirthdayList />);

  // Simulate a button click to fetch birthdays
  const button = screen.getByText('View Birthdays on');
  fireEvent.click(button);

  // Wait for the loading state to resolve
  await waitFor(() => screen.getByText('John Doe'));

  // Assert that the fetched birthday data is displayed
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  // You can add more assertions as needed
});

test('searches and filters birthdays', async () => {
  render(
    <DateSelectorContext.Provider value={{ day: 1, month: 1 }}>
      <BirthdayList />
    </DateSelectorContext.Provider>
  );

  // Simulate a button click to fetch birthdays
  const button = screen.getByText('View Birthdays on');
  fireEvent.click(button);

  // Wait for the loading state to resolve
  await waitFor(() => screen.getByText('John Doe'));

  // Enter a search term in the input field
  const searchInput = screen.getByLabelText('Search by name, year of birth, or description');
  userEvent.type(searchInput, 'John');

  // Wait for the search results to update
  await waitFor(() => screen.getByText('John Doe'));

  // Assert that the filtered result is displayed
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  // You can add more assertions to test the filtering logic
});
