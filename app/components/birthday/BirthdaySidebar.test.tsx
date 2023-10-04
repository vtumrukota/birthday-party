import '@testing-library/jest-dom'
import { render, screen, fireEvent, renderHook, waitFor } from '@testing-library/react';
import { useOnThisDay } from '../../hooks/useOnThisDay';
import { DateSelectorContext } from '@/app/contexts/DateSelectorContext';
import { BirthdaySidebar } from './BirthdaySidebar';
import { use } from 'react';

const setHasFetched = jest.fn();
jest.mock('../../hooks/useOnThisDay');
const useOnThisDayMock = useOnThisDay as jest.MockedFunction<typeof useOnThisDay>;

const loadingDataMock = {
  data: null,
  isLoading: true,
  isValidating: false,
  error: null,
  mutate: jest.fn(),
};
const successDataMock = {
  data: { births: [] },
  isLoading: false,
  isValidating: false,
  error: null,
  mutate: jest.fn(),
}
const errorDataMock = {
  data: null,
  isLoading: false,
  isValidating: false,
  error: new Error('Error fetching data'),
  mutate: jest.fn(),
};

describe('BirthdaySidebar', () => {

  beforeEach(() => {
    useOnThisDayMock.mockRestore();
  })

  it('renders the component without error', () => {
    useOnThisDayMock.mockReturnValue(loadingDataMock);

    render(
      <DateSelectorContext.Provider value={{ day: '10', month: '10', setDay: jest.fn(), setMonth: jest.fn() }}>
        <BirthdaySidebar hasFetched={false} setHasFetched={setHasFetched} />
      </DateSelectorContext.Provider>
    );
    
    expect(screen.getByText(/Birthday Party/)).toBeInTheDocument();
    expect(screen.getByText(/Who else shares your Birthday/)).toBeInTheDocument();
    expect(screen.getByText('Current Date: 10/10')).toBeInTheDocument();
  });

  it(`renders the "See Today's Birthdays" button when hasFetched is false`, () => {
    useOnThisDayMock.mockReturnValue(successDataMock);

    render(<BirthdaySidebar hasFetched={false} setHasFetched={setHasFetched} />);
    
    expect(screen.getByLabelText('See Birthdays')).toBeInTheDocument();
  });

  it('renders the DateSelector when hasFetched is true', () => {
    useOnThisDayMock.mockReturnValue(successDataMock);

    render(<BirthdaySidebar hasFetched={true} setHasFetched={setHasFetched} />);
    
    expect(screen.getByLabelText('Select a Date')).toBeInTheDocument();
  });

  it('disables the DateSelector when the hook is loading data', () => {
    useOnThisDayMock.mockReturnValue(loadingDataMock);

    render(<BirthdaySidebar hasFetched={true} setHasFetched={setHasFetched} />);
    
    const datePicker = screen.getByLabelText('Loading...');
    expect(datePicker).toBeInTheDocument();
    expect(datePicker).toBeDisabled();
  });

  it(`calls fetchBirthdays when the "See Today's Birthdays" button is clicked`, () => {
    useOnThisDayMock.mockReturnValue(successDataMock);

    render(<BirthdaySidebar hasFetched={false} setHasFetched={setHasFetched} />);
    
    fireEvent.click(screen.getByLabelText('See Birthdays'));
    
    waitFor(() => {
      expect(setHasFetched).toHaveBeenCalledWith(true);
    })
  });

  it(`removes "See Today's Birthdays" button after fetching`, () => {
    useOnThisDayMock.mockReturnValue(successDataMock);

    render(<BirthdaySidebar hasFetched={false} setHasFetched={setHasFetched} />);

    fireEvent.click(screen.getByLabelText('See Birthdays'));
    
    waitFor(async () => {
      expect(await screen.queryByLabelText('See Birthdays')).not.toBeInTheDocument();
    })
  });

  it('renders BirthdayError modal when there is an error fetching data', () => {
    useOnThisDayMock.mockReturnValue(errorDataMock);

    render(<BirthdaySidebar hasFetched={false} setHasFetched={setHasFetched} />);
    
    waitFor(() => {
      expect(screen.getByText(`Sorry, we couldn't fetch any Birthdays!`)).toBeInTheDocument();
    })
  });
});
