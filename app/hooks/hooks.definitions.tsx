/**
 * Options for the OnThisDay API
 * 
 * Allow for future types to be added in v2
 */
export enum OnThisDayTypes {
  All = 'all',
  Selected = 'selected',
  Birthday = 'births',
  Deaths = 'deaths',
  Holidays = 'holidays',
  Events = 'events',
};

export enum OnThisDayLanguages {
  English = 'en',
  German = 'de',
  French = 'fr',
  Swedish = 'sv',
  Portuguese = 'pt',
  Russian = 'ru',
  Spanish = 'es',
  Arabic = 'ar',
  Bosnian = 'bs',
}

// Data interface from the OnThisDay API
interface OnThisDayPage {
  description?: string,
  normalizedtitle: string,
  thumbnail: {
    source: string,
    width: number,
    height: number,
  },
  originalimage: {
    source: string,
    width: number,
    height: number,
  },
  extract: string,
  type: string,
  // TODO: Add more properties as needed
  [key: string]: any,
};

export interface OnThisDayResponse {
  year: number,
  text: string,
  pages: OnThisDayPage[],
};