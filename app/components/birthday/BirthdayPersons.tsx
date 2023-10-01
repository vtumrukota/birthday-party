import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Grid from 'react-virtualized/dist/commonjs/Grid';
import { Birthday } from "../../models/Birthday";
import { BirthdayRow } from "./BirthdayRow";

export const BirthdayPersons = ({ birthdays }: { birthdays: Birthday[] }): JSX.Element => {
  const cellRenderer = ({ columnIndex, key, rowIndex, style }: any) => {
    const index = rowIndex * 5 + columnIndex;
    const card = birthdays[index];

    if (!card) {
      return null; // Return null for cells that are out of range
    }

    return (
      <div key={key} style={style} className="card">
        <BirthdayRow birthday={card} />
      </div>
    );
  };

  return (
    <>
      {birthdays.length === 0 ?
        // We should not expect to ever see this message ;)
        <h1 className="text-3xl">Well, looks like you are the only legend born today!</h1> :
        // use virtualized grid to render the list of birthday cards since this API is not paginated
        // NOTE: we are assuming the list is never more than a few hundred items (<= 400)
        <AutoSizer>
          {({ width, height }) => (
            <Grid
              width={width}
              height={height}
              columnCount={5}
              columnWidth={width / 5}
              rowCount={Math.ceil(birthdays.length / 5)}
              rowHeight={150} // Adjust the card height as needed
              cellRenderer={cellRenderer}
            />
          )}
        </AutoSizer>
      }
    </>
  )
}
