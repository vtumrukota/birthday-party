import { OnThisDayResponse } from "../hooks/hooks.definitions";

// Helper to format incosistent API data for our Birthday card
const stripDeathYear = (text: string): string => {
  const pattern = /\(d(?:\.|ied) \d{4}\)/g;
  return text.replace(pattern, '');
}

/**
 * Birthday class we will use to extract data from the API
 */
export class Birthday {
  birthYear: number;
  name: string;
  deathYear: string | null; // if the string contains '(d. <Year>)' we will extract it
  description: string;
  externalLink: string;
  additionalDetails: string
  thumbnail: string;
  image: string;

  constructor(data: OnThisDayResponse) {
    // We assume first page always exists and only one with information about person
    // The second page is always about the date/year itself
    this.birthYear = data.year;
    const person = data.text.split(', ');
    const about = data.text.split('(d. ');
    this.deathYear = about?.length > 1 ? about[1].replace(')', '') : null;
    const info = data.pages[0];
    const desc = info.description?.split('(')
    // Sometimes the description property doesn't exist on the model
    // We will use the first sentence of the extract instead
    if (desc?.length) {
      this.description = desc[0];
    } else {
      delete person[0];
      this.description = person.join(' ');
    }
    this.description = stripDeathYear(this.description).trim();
    this.externalLink = info.content_urls?.desktop?.page;
    this.name = info.normalizedtitle;
    this.additionalDetails = info.extract;
    this.thumbnail = info.thumbnail?.source;
    this.image = info.originalimage?.source;
  }
}