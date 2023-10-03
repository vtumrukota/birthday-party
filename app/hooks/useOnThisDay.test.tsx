import '@testing-library/jest-dom'
import { waitFor, renderHook } from '@testing-library/react';
import { useOnThisDay } from './useOnThisDay';

describe('useOnThisDay hook', () => {
  afterAll(() => jest.resetAllMocks())

  test('handles isLoading state properly', async () => {
    const { result } = renderHook(() => useOnThisDay({ day: '01', month: '01' }));
   
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    })
  });
  
  test('handles errors correctly', async () => {
    // Use an invalid month to force a failure in the API
    const { result } = renderHook(() => useOnThisDay({ day: '01', month: '45' }));
  
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeTruthy();
    })
  });
});
