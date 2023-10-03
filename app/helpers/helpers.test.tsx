import { Birthday } from '../models/Birthday';
import { filterBirthdays } from './filterBirthdays'; // Adjust the import path as needed

// Mock data for testing
const mockBirthdays: Birthday[] = [
  {
    birthYear: 1990,
    name: 'John Doe',
    deathYear: '2020',
    description: 'A description of John Doe',
    additionalDetails: 'Some additional details',
    thumbnail: 'thumbnail.jpg',
    image: 'image.jpg',
  },
  {
    birthYear: 1985,
    name: 'Jane Smith',
    deathYear: null,
    description: 'A description of Jane Smith',
    additionalDetails: 'More details about Jane',
    thumbnail: 'thumbnail.jpg',
    image: 'image.jpg',
  },
];

describe('filterBirthdays function', () => {
  it('filters birthdays by name', () => {
    const filteredBirthdays = filterBirthdays('John', mockBirthdays);
    expect(filteredBirthdays).toHaveLength(1);
    expect(filteredBirthdays[0].name).toBe('John Doe');
  });

  it('filters birthdays by birth year', () => {
    const filteredBirthdays = filterBirthdays('1985', mockBirthdays);
    expect(filteredBirthdays).toHaveLength(1);
    expect(filteredBirthdays[0].name).toBe('Jane Smith');
  });

  it('filters birthdays by description', () => {
    const filteredBirthdays = filterBirthdays('description of Jane', mockBirthdays);
    expect(filteredBirthdays).toHaveLength(1);
    expect(filteredBirthdays[0].name).toBe('Jane Smith');
  });

  it('returns an empty array when no matches are found', () => {
    const filteredBirthdays = filterBirthdays('No Match', mockBirthdays);
    expect(filteredBirthdays).toHaveLength(0);
  });

  it('handles case-insensitive filtering', () => {
    const filteredBirthdays = filterBirthdays('jOhN', mockBirthdays);
    expect(filteredBirthdays).toHaveLength(1);
    expect(filteredBirthdays[0].name).toBe('John Doe');
  });
});
