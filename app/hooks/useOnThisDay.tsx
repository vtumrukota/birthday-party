import useSWR, { SWRResponse } from 'swr'
import { OnThisDayTypes } from '../app.definitions'

/**
  Securely grab the auth token from the environment variable in Vercel
  
  In a true production app, we should technically be hitting an internal API so we 
  never expose the key to the client as headers can be sniffed
 */
const wikiBearerToken = `Bearer ${process.env.WIKI_ACCESS_TOKEN}`
const wikiUserAgent = `${process.env.WIKI_USER_AGENT}`

// Ensure we pass required headers to the API
const wikiFetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': wikiBearerToken,
      'Api-User-Agent': wikiUserAgent,
    },
  }).then((response) => response.json());

// We will only support english users for v1, hence the /en path
const WIKI_API = 'https://api.wikimedia.org/feed/v1/wikipedia/en'

/**
 * This hook fetches notable events or persons that were born or died on a given date.
 * For v1, we will default type for birthdays
 * 
 * API Documentation: https://api.wikimedia.org/wiki/Feed_API/Reference/On_this_day
 * 
 * @param type: <OnThisDayTypes> type of content to fetch on the date
 * @param day: <string> zero-padded day of the month (01 - 31)
 * @param month: <string> zero-padded month of the year (01 - 12)
 * @returns: <SWRResponse>
 */

// TODO: Add guards for Date/Month range strings
export const useOnThisDay = (
  type: OnThisDayTypes = OnThisDayTypes.Birthday,
  day: string,
  month: string
): SWRResponse => {
  return useSWR(`${WIKI_API}/${type}/${month}/${day}`, wikiFetcher)
}