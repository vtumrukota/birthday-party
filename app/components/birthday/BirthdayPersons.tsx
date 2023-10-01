import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Grid from 'react-virtualized/dist/commonjs/Grid';
import { Birthday } from "../../models/Birthday";
import { BirthdayRow } from "./BirthdayRow";
import WindowScroller from 'react-virtualized/dist/es/WindowScroller';

const colCount = 3;
const COL_WIDTH = 300;
const ROW_HEIGHT = 175;
const GAP_SIZE = 5;

export const BirthdayPersons = ({ birthdays }: { birthdays: Birthday[] }): JSX.Element => {
  const cellRenderer = ({ columnIndex, key, rowIndex, style }: any) => {
    const index = rowIndex * colCount + columnIndex;
    const card = birthdays[index];

    if (!card) return null; // Return null for cells that are out of range

    return (
      <div key={key} style={{
          ...style,
          left: style.left + GAP_SIZE,
          top: style.top + GAP_SIZE,
          width: style.width - GAP_SIZE,
          height: style.height - GAP_SIZE
        }}
        className="m-5 w-6">
        <BirthdayRow birthday={card} />
      </div>
    );
  };

  return (
    <>
      {birthdays.length === 0 ?
        // We should not expect to ever see this message ;)
        <h1 className="text-3xl">Wow, looks like you are the only legend born today!</h1> :
        // use virtualized grid to render the list of birthday cards since this API is not paginated
        // NOTE: we are assuming the list is never more than a thousand items (<= 600 max)
        <div className="block h-[600px]">
          <AutoSizer>
            {({ width, height }) => (
              <Grid
                className="grid"
                cellRenderer={cellRenderer}
                columnCount={colCount} // Number of columns in the grid
                columnWidth={width / colCount} // Adjust column width based on available width
                rowCount={Math.ceil(birthdays.length / colCount)} // Number of rows in the grid
                rowHeight={200} // Set an appropriate row height
                width={width}
                height={height}
              />
            )}
          </AutoSizer>
        </div>
      }
    </>
  )
}
