import '@testing-library/jest-dom'
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BirthdayList } from './BirthdayList'; // Adjust the import path as needed

// Mock the useOnThisDay hook response
const server = setupServer(
  rest.get('https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/Birthday/01/01', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        births: [
          {
            year: 1990,
            text: 'John Doe, (d. 2020)',
            pages: [
              {
                description: 'A description of John Doe (d. 2020)',
                normalizedtitle: 'John_Doe',
                extract: 'Some additional details about John Doe.',
                thumbnail: { source: 'thumbnail.jpg' },
                originalimage: { source: 'image.jpg' },
              },
            ],
          },
          // Add more mock data as needed
        ],
      })
    );
  })
);

beforeAll(() => {
  server.listen(); // Start the mock server
});

afterEach(() => {
  server.resetHandlers(); // Reset any request handlers after each test
});

afterAll(() => {
  server.close(); // Close the server after all tests
});

test('renders BirthdayLoader when data is loading', async () => {
  render(<BirthdayList />);
  
  // Ensure that BirthdayLoader is displayed while data is loading
  const birthdayLoaderElement = screen.getByText('Loading...');
  expect(birthdayLoaderElement).toBeInTheDocument();

  // Wait for data loading to complete
  await screen.findByText('John Doe');
});

test('renders BirthdayRow when data is loaded', async () => {
  render(<BirthdayList />);
  
  // Wait for data loading to complete
  await screen.findByText('John Doe');
  
  // Ensure that BirthdayRow is displayed after data is loaded
  const birthdayRowElement = screen.getByText('John Doe');
  expect(birthdayRowElement).toBeInTheDocument();
});

test('search functionality works', async () => {
  render(<BirthdayList />);
  
  // Wait for data loading to complete
  await screen.findByText('John Doe');
  
  // Search for a specific birthday
  const searchInput = screen.getByLabelText('Search Birthdays');
  fireEvent.change(searchInput, { target: { value: 'John' } });

  // Ensure that the search result is displayed
  const searchResultElement = screen.getByText('John Doe');
  expect(searchResultElement).toBeInTheDocument();
});