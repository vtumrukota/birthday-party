import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BirthdayList } from './BirthdayList';
import { useOnThisDay } from '@/app/hooks/useOnThisDay';
import { DateSelectorContext } from '@/app/contexts/DateSelectorContext';

jest.mock('../../hooks/useOnThisDay');
const useOnThisDayMock = useOnThisDay as jest.MockedFunction<typeof useOnThisDay>;

const loadingDataMock = {
  data: null,
  isLoading: true,
  isValidating: false,
  error: null,
  mutate: jest.fn(),
};
const noDataMock = {
  data: null,
  isLoading: false,
  isValidating: false,
  error: null,
  mutate: jest.fn(),
};
const errorDataMock = {
  data: null,
  isLoading: false,
  isValidating: false,
  error: new Error('Error fetching data'),
  mutate: jest.fn(),
};
const successDataMock = {
  data: {
    births: [{
      year: 1989,
      text: 'Vivek Tumrukota',
      pages: [{
        description: 'A description of a Legend (d. 2020)',
        normalizedtitle: 'Vivek Tumrukota',
        extract: 'Some additional details about Vivek Tumrukota.',
        thumbnail: { source: 'thumbnail.jpg', width: 100, height: 100 },
        originalimage: { source: 'image.jpg', width: 200, height: 200 },
        type: 'person',
      }]
    }]
  },
  isLoading: false,
  isValidating: false,
  error: null,
  mutate: jest.fn(),
};

describe('BirthdayList', () => {

  beforeEach(() => {
    useOnThisDayMock.mockRestore();
  })

  it('renders BirthdayLoader when data is loading', () => {
    useOnThisDayMock.mockReturnValue(loadingDataMock);

    render(<BirthdayList />);
    
    // ensure that <BirthdayLoader /> is displayed while data is loading
    expect(screen.getByText('Have some cake while you wait!')).toBeInTheDocument();
  });

  it('shows a message if no birthdays are found', () => {
    useOnThisDayMock.mockReturnValue(noDataMock);
    
    render(
      <DateSelectorContext.Provider value={{ day: '10', month: '10', setDay: jest.fn(), setMonth: jest.fn() }}>
        <BirthdayList />
      </DateSelectorContext.Provider>
    );

    // ensure the correct message is displayed when no birthdays are found
    waitFor(() => {
      expect(screen.getByText(/Sorry, no Birthdays matched/)).toBeInTheDocument();
    })
  });

  it('doesnt render content when data is errored', () => {
    useOnThisDayMock.mockReturnValue(errorDataMock);

    render(<BirthdayList />);

    // ensure that <BirthdayLoader /> is displayed while data is loading
    expect(screen.queryByText('Have some cake while you wait!')).not.toBeInTheDocument();
  });

  it('renders BirthdayRow when data is loaded', () => {
    useOnThisDayMock.mockReturnValue(successDataMock);

    render(
      <DateSelectorContext.Provider value={{ day: '10', month: '10', setDay: jest.fn(), setMonth: jest.fn() }}>
        <BirthdayList />
      </DateSelectorContext.Provider>
    );

    // ensure that <BirthdayRow /> is displayed after data is loaded
    waitFor(() => {
      expect(screen.getByText('Vivek Tumrukota')).toBeInTheDocument();
    })
  });

  it('should be able to see paginate handler', () => {
    useOnThisDayMock.mockReturnValue(successDataMock);

    render(
      <DateSelectorContext.Provider value={{ day: '10', month: '10', setDay: jest.fn(), setMonth: jest.fn() }}>
        <BirthdayList />
      </DateSelectorContext.Provider>
    );

    // ensure the pagination buttons are displayed
    expect(screen.getByLabelText('pagination navigation')).toBeInTheDocument();
    // TODO: add more items to mockData to allow full pagination test
  })

  it('should be able to search results', () => {
    useOnThisDayMock.mockReturnValue(successDataMock);

    render(
      <DateSelectorContext.Provider value={{ day: '10', month: '10', setDay: jest.fn(), setMonth: jest.fn() }}>
        <BirthdayList />
      </DateSelectorContext.Provider>
    );

    // ensure the search box is displayed
    const searchBox = screen.getByLabelText('Search Birthdays').querySelector('input') as HTMLInputElement;
    expect(searchBox).toBeInTheDocument();

    // ensure that the search box is debounced
    fireEvent.change(searchBox, { target: { value: 'Vivek' } });
    expect(searchBox).toHaveValue('Vivek');

    waitFor(() => {
      expect(screen.getByText('Vivek Tumrukota')).toBeInTheDocument();
    })

    // ensure that no results message shows properly
    fireEvent.change(searchBox, { target: { value: 'Not anyone here' } });
    expect(screen.getByText(/Sorry, no Birthdays matched/)).toBeInTheDocument();
  })
});