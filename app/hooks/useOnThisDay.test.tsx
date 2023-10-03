// Import the necessary testing utilities
import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useOnThisDay } from './useOnThisDay';
import { OnThisDayLanguages, OnThisDayTypes } from './hooks.definitions';

// Create a mock server
const server = setupServer(
  rest.get(
    'https://api.wikimedia.org/feed/v1/wikipedia/:language/onthisday/:type/:month/:day',
    (req, res, ctx) => {
      // Mock the API response here
      return res(
        ctx.status(200),
        ctx.json({ yourTestData: 'some data' }) // Replace with your test data
      );
    }
  )
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

test('useOnThisDay hook fetches data correctly', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useOnThisDay({
      day: '01',
      month: '01',
      triggerFetch: true,
      type: OnThisDayTypes.Birthday,
      language: OnThisDayLanguages.English,
    })
  );

  // Check initial loading state
  expect(result.current.isLoading).toBe(true);

  // Wait for the API call to complete
  await waitForNextUpdate();

  // Check that data has been fetched successfully
  expect(result.current.data).toEqual({ yourTestData: 'some data' });
  expect(result.current.error).toBe(null);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isValidating).toBe(false);
});

test('useOnThisDay hook handles API error correctly', async () => {
  // Mock an error response from the API
  server.use(
    rest.get(
      'https://api.wikimedia.org/feed/v1/wikipedia/:language/onthisday/:type/:month/:day',
      (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ error: 'API Error' })
        );
      }
    )
  );

  const { result, waitForNextUpdate } = renderHook(() =>
    useOnThisDay({
      day: '01',
      month: '01',
      triggerFetch: true,
      type: OnThisDayTypes.Birthday,
      language: OnThisDayLanguages.English,
    })
  );

  // Wait for the API call to complete
  await waitForNextUpdate();

  // Check that error is handled correctly
  expect(result.current.data).toBe(null);
  expect(result.current.error).toEqual({ error: 'API Error' });
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isValidating).toBe(false);
});
