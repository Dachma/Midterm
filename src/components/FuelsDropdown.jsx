import Select from "react-select";

const styles = {
  valueContainer: (css) => ({
    ...css,
    flexWrap: "nowrap",
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

const FuelsDropdown = (props) => {
  return (
    <Select
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      isClearable={true}
      styles={styles}
      className="select"
      value={props.selectedOptions}
      onChange={props.setselectedOptions}
      placeholder="საწვავი"
      isMulti
      options={props.options}
    />
  );
};

export default FuelsDropdown;
