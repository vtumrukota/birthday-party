import { Birthday } from './Birthday'; // Adjust the import path as needed

// Mock data for testing
const mockData = {
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
    // ... other page data if needed
  ],
};

describe('Birthday class', () => {
  it('should create a Birthday instance with correct properties', () => {
    const birthday = new Birthday(mockData);

    expect(birthday.birthYear).toBe(1990);
    expect(birthday.name).toBe('John_Doe');
    expect(birthday.deathYear).toBe('2020');
    expect(birthday.description).toBe('A description of John Doe');
    expect(birthday.additionalDetails).toBe('Some additional details about John Doe.');
    expect(birthday.thumbnail).toBe('thumbnail.jpg');
    expect(birthday.image).toBe('image.jpg');
  });

  it('should handle missing description property in the input data', () => {
    const dataWithNoDescription = { ...mockData };
    dataWithNoDescription.pages[0].description = undefined;
    const birthday = new Birthday(dataWithNoDescription);

    expect(birthday.description).toBe('John Doe');
  });

  it('should handle missing death year in the input text', () => {
    const dataWithNoDeathYear = { ...mockData };
    dataWithNoDeathYear.text = 'Jane Doe';
    const birthday = new Birthday(dataWithNoDeathYear);

    expect(birthday.deathYear).toBeNull();
  });

  it('should strip death year from description', () => {
    const dataWithDeathYear = { ...mockData };
    const birthday = new Birthday(dataWithDeathYear);

    expect(birthday.description).toBe('A description of John Doe');
  });
});
