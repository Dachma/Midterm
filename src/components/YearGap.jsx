import { YearRangePicker } from "react-year-range-picker";

const Years = (props) => {
  return (
    <div>
      <YearRangePicker
        width="196px"
        classNames="yearRange"
        startText="წლიდან"
        endText="წლამდე"
        spacer="-"
        minYear={"1900"}
        maxYear={new Date().getFullYear()}
        onSelect={(startYear, endYear) => {
          props.setYearRange({ startYear, endYear });
        }}
        startYear={props.yearRange?.startYear}
        endYear={props.yearRange?.endYear}
      />
    </div>
  );
};

export default Years;
