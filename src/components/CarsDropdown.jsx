import Select from "react-select";

const styles = {
  valueContainer: (css) => ({
    ...css,
    flexWrap: "nowrap",
    role: "menuitemcheckbox",
  }),
  multiValueRemove: () => {
    return {
      display: "none",
    };
  },
  multiValue: () => {
    return {
      "background-color": "white",
    };
  },
};

const CarsDropdown = (props) => {
  return (
    <Select
      isClearable={true}
      styles={styles}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      className="select"
      value={props.selectedOptions}
      onChange={props.setselectedOptions}
      placeholder="მწარმოებელი"
      isMulti
      options={props.options}
    />
  );
};

export default CarsDropdown;
