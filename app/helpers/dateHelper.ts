export const getCurrentDate = (): {
  day: string,
  month: string,
  year: string,
} => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = String(today.getFullYear());
  
  console.log('helper', day, month, year)

  return {
    day,
    month,
    year,
  }
}