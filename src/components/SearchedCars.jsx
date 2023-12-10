import engine from "../icons/engine.png";
import gear from "../icons/gear.png";
import speedometer from "../icons/speedometer.png";
import wheel from "../icons/wheel.png";
import moment from "moment";
import ReactPaginate from "react-paginate";

const SearchedCars = (props) => {
  const renderLocation = (i) => {
    if (props.locationIDs[i] == 2) {
      return "თბილისი";
    } else if (props.locationIDs[i] == 23) {
      return "გზაში საქ.-სკენ";
    } else if (props.locationIDs[i] == 21) {
      return "აშშ";
    } else {
      return "სხვა";
    }
  };

  const renderGanbajebaType = (i) => {
    if (props.ganbajebaTypes[i]) {
      return <div className="ganbajebuli-text">განბაჟებული</div>;
    } else {
      return <div className="ganubajebeli-text">გასანბაჟებელი</div>;
    }
  };

  const renderWheelType = (i) => {
    if (props.rightWheel[i]) {
      return "მარჯვენა";
    } else {
      return "მარცხენა";
    }
  };

  const renderFuelType = (i) => {
    if (props.fuelTypes[i] == 2) {
      return "ბენზინი";
    } else if (props.fuelTypes[i] == 3) {
      return "დიზელი";
    } else if (props.fuelTypes[i] == 6) {
      return "ჰიბრიდი";
    } else {
      return "სხვა";
    }
  };

  const renderGearType = (i) => {
    if (props.gearTypes[i] == 3) {
      return "ტიპტრონიკი";
    } else if (props.gearTypes[i] == 2) {
      return "ავტომატიკა";
    } else if (props.gearTypes[i] == 1) {
      return "მექანიკა";
    } else if (props.gearTypes[i] == 4) {
      return "ვარიატორი";
    } else {
      return "სხვა";
    }
  };

  const renderTimeDifference = (i) => {
    let timeDiff = moment(props.orderDates[i], "YYYY-MM-DD hh:mm:ss").fromNow();

    if (timeDiff.includes("minutes ago")) {
      return timeDiff.replace("minutes ago", "წუთის წინ");
    } else if (timeDiff.includes("a minute ago")) {
      return timeDiff.replace("a minute ago", "1 წუთის წინ");
    } else if (timeDiff.includes("an hour ago")) {
      return timeDiff.replace("an hour ago", "1 საათის წინ");
    } else if (timeDiff.includes("hours ago")) {
      return timeDiff.replace("hours ago", "საათის წინ");
    } else if (timeDiff.includes("a day ago")) {
      return timeDiff.replace("a day ago", "1 დღის წინ");
    } else if (timeDiff.includes("days ago")) {
      return timeDiff.replace("days ago", "დღის წინ");
    } else if (timeDiff.includes("a month ago")) {
      return timeDiff.replace("a month ago", "1 თვის წინ");
    } else if (timeDiff.includes("months ago")) {
      return timeDiff.replace("months ago", "თვის წინ");
    } else {
      return "წლების წინ";
    }
  };

  return (
    <div className="car-list">
      {props.carNames.map((el, index) => {
        return (
          <div className="car-info-container" key={index}>
            <img
              className="car-info-image"
              src={`https://static.my.ge/myauto/photos/${props.photoIDs[index]}/thumbs/${props.carIDs[index]}_1.jpg?v=4`}
            />
            <div className="car-info-details">
              <div className="car-info-top">
                <div className="car-info-name-year">
                  <div className="car-info-name">{el}</div>
                  <div className="prod-year">{props.prodYears[index]}</div>
                </div>
                <div className="car-info-location">{renderLocation(index)}</div>
                <div className="car-info-ganbajeba">
                  {renderGanbajebaType(index)}
                </div>
              </div>
              <br />
              <div className="middle-info">
                <div className="engine">
                  <img className="engine-img" src={engine} />
                  <div className="engine-number">
                    {(props.engineVolumes[index] / 1000).toFixed(1)}
                  </div>
                  <div className="engine-name">{renderFuelType(index)}</div>
                </div>
                <div className="gear">
                  <img className="gear-img" src={gear} />
                  <div className="gear-name">{renderGearType(index)}</div>
                </div>
                <div className="car-info-price">
                  {props.prices[index] != "0" ? (
                    `${props.prices[index]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₾`
                  ) : (
                    <div style={{ fontSize: "20px" }}>ფასი შეთანხმებით</div>
                  )}
                </div>
              </div>
              <div className="middle-info2">
                <div className="run-kms">
                  <img className="run-kms-img" src={speedometer} />
                  <div className="run-kms-text">{props.carRuns[index]} კმ</div>
                </div>
                <div className="wheel">
                  <img className="wheel-img" src={wheel} />
                  <div className="wheel-text">{renderWheelType(index)}</div>
                </div>
              </div>
              <div className="bottom-info">
                <div className="time-diff">
                  <div className="time-diff-text">
                    {renderTimeDifference(index)}
                  </div>
                </div>
                <div style={{ marginTop: "16px" }}>•</div>
                <div className="views">
                  <div className="views-text">{props.views[index]} ნახვა</div>
                </div>
              </div>
            </div>
            {/* <div>{props.carRuns[index]}</div> */}
          </div>
        );
      })}
      <div className="pagination">
        <ReactPaginate
          nextLabel=">"
          onPageChange={(e) => props.handlePageClick(e)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={Math.ceil(props.count / 30)}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default SearchedCars;
