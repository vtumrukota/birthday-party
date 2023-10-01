/**
 * Birthday class we will use to extract data from the API
 */
export class Birthday {
  birthYear: number;
  name: string;
  deathYear: string | null; // if the string contains '(d. <Year>)' we will extract it
  description: string;
  additionalDetails: string
  thumbnail: string;
  image: string;

  // TODO: cleanup type below
  constructor(data: any) {
    // We assume first page always exists and only one with information about person
    // The second page is always about the date/year itself
    const person = data.text.split(', ');
    this.birthYear = data.year;
    const about = person[1].split('(d. ');
    this.description = about[0];
    this.deathYear = about.length > 1 ? about[1].replace(')', '') : null;
    const info = data.pages[0];
    this.name = info.normalizedtitle;
    this.additionalDetails = info.extract;
    this.thumbnail = info.thumbnail?.source;
    this.image = info.originalimage?.source;
  }
}