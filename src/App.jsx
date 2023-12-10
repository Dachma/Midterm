import { useEffect, useState } from "react";
import "./App.css";
import CarsDropdown from "./components/CarsDropdown";
import FuelsDropdown from "./components/FuelsDropdown";
import Switch from "@mui/material/Switch";
import clearFilter from "./icons/clear-filter.png";
import car from "./icons/car.png";
import tractor from "./icons/tractor.png";
import bike from "./icons/bike.png";
import Ganbajeba from "./components/Ganbajeba";
import Location from "./components/Location";
import SearchedCars from "./components/SearchedCars";
import { Link, Route, Routes } from "react-router-dom";
import Years from "./components/YearGap";

function App() {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setselectedOptions] = useState([]);
  const [count, setCount] = useState(0);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [ganbajebaType, setGanbajebaType] = useState("");
  const [locations, setlocations] = useState([]);
  const [yearRange, setYearRange] = useState("");
  const [searchedCarsNames, setSearchedCarsName] = useState([]);
  const [prodYears, setProdYears] = useState([]);
  const [engineVolumes, setEngineVolumes] = useState([]);
  const [searchedFuelTypes, setSearchedFuelTypes] = useState([]);
  const [gearTypes, setGearTypes] = useState([]);
  const [carRuns, setCarRuns] = useState([]);
  const [rightWheel, setRightWheel] = useState([]);
  const [searchedLocationIds, setSearchedLocationIds] = useState([]);
  const [searchedPrices, setSearchedPrices] = useState([]);
  const [searchedGanbajebaTypes, setSearchedGanbajebaTypes] = useState([]);
  const [orderDates, setOrderDates] = useState([]);
  const [views, setViews] = useState([]);
  const [photoIDs, setPhotoIDs] = useState([]);
  const [searchedCarIDs, setSearchedCarIDs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fuelOptions = [
    { value: 2, label: "ბენზინი" },
    { value: 3, label: "დიზელი" },
    { value: 6, label: "ჰიბრიდი" },
  ];

  const locationOptions = [
    {
      value: "2",
      label: "თბილისი",
    },
    { value: "23", label: "გზაში საქ.-სკენ" },
    { value: "21", label: "აშშ" },
  ];

  const fetchManufactors = async () => {
    const response = await fetch(
      "https://api2.myauto.ge/ka/services/quick-main-data/all/get"
    );
    const data = await response.json();
    const arrOfCars = JSON.parse(data.data.manufactors);
    let array = [];
    arrOfCars.map((el) => {
      array.push({ value: el.man_id, label: el.man_name });
    });
    setOptions(array);
  };

  const fetchCount = async () => {
    const response = await fetch(
      `https://api2.myauto.ge/ka/products/count?TypeID=0&ForRent=0&Mans=${selectedOptions
        ?.map((el) => {
          return el.value;
        })
        .join("-")}&ProdYearFrom=${
        yearRange?.startYear ? yearRange?.startYear.toString() : ""
      }&ProdYearTo=${
        yearRange?.endYear ? yearRange?.endYear.toString() : ""
      }&PriceFrom=&PriceTo=&CurrencyID=&MileageType=&FuelTypes=${fuelTypes
        ?.map((el) => {
          return el.value;
        })
        .join(".")}&Locs=${locations
        ?.map((el) => {
          return el.value;
        })
        .join(".")}&Customs=${ganbajebaType}&Page=1&undefined=`
    );

    const data = await response.json();
    const counter = data.data[0].count;
    setCount(counter);
  };

  const ganbajeba = (e) => {
    if (ganbajebaType !== "1") {
      let ganbajebaBtn = document.querySelector(".ganubajebeli");
      ganbajebaBtn.style.borderColor = "rgba(171, 171, 171, 0.5)";
      ganbajebaBtn.style.backgroundColor = "#F0F0F0";
      e.target.style.borderColor = "#1aba6b";
      e.target.style.backgroundColor = "#e8f8f0";
      setGanbajebaType("1");
    } else {
      e.target.style.borderColor = "rgba(171, 171, 171, 0.5)";
      e.target.style.backgroundColor = "#F0F0F0";
      setGanbajebaType("");
    }
  };

  const ganubajebeli = (e) => {
    if (ganbajebaType === "0") {
      e.target.style.borderColor = "rgba(171, 171, 171, 0.5)";
      e.target.style.backgroundColor = "#F0F0F0";
      setGanbajebaType("");
    } else {
      let ganbajebaBtn = document.querySelector(".ganbajebuli");
      ganbajebaBtn.style.borderColor = "rgba(171, 171, 171, 0.5)";
      ganbajebaBtn.style.backgroundColor = "#F0F0F0";
      e.target.style.borderColor = "#1aba6b";
      e.target.style.backgroundColor = "#e8f8f0";
      setGanbajebaType("0");
    }
  };

  const searchCars = async () => {
    const response = await fetch(
      `https://api2.myauto.ge/ka/products?TypeID=0&ForRent=0&Mans=${selectedOptions
        ?.map((el) => {
          return el.value;
        })
        .join(
          "-"
        )}&ProdYearFrom=${yearRange?.startYear?.toString()}&ProdYearTo=&PriceFrom=${yearRange?.endYear?.toString()}&PriceTo=&CurrencyID=&MileageType=&FuelTypes=${fuelTypes
        ?.map((el) => {
          return el.value;
        })
        .join(".")}&Locs=${locations
        ?.map((el) => {
          return el.value;
        })
        .join(".")}&Customs=${ganbajebaType}&Page=${currentPage}&undefined=`
    );
    const data = await response.json();
    const items = data.data.items;
    let arrOfSearchedCars = [];
    let arrOfProdYears = [];
    let arrOfEngineVolumes = [];
    let arrOfFuelTypes = [];
    let arrOfGearTypes = [];
    let arrOfCarRuns = [];
    let arrOfRightWeels = [];
    let arrOfLocations = [];
    let arrOfPrices = [];
    let arrOfGanbajebaTypes = [];
    let arrOfOrderDates = [];
    let arrOfViews = [];
    let arrOfPhotoIDs = [];
    let arrOfCarIDs = [];

    items.map((item) => {
      arrOfFuelTypes.push(item.fuel_type_id);
      arrOfProdYears.push(item.prod_year);
      arrOfEngineVolumes.push(item.engine_volume);
      arrOfGearTypes.push(item.gear_type_id);
      arrOfCarRuns.push(item.car_run_km);
      arrOfRightWeels.push(item.right_wheel);
      arrOfLocations.push(item.location_id);
      arrOfPrices.push(item.price_value);
      arrOfGanbajebaTypes.push(item.customs_passed);
      arrOfOrderDates.push(item.order_date);
      arrOfViews.push(item.views);
      arrOfPhotoIDs.push(item.photo);
      arrOfCarIDs.push(item.car_id);
      options.map((el) => {
        if (el.value == item.man_id) {
          arrOfSearchedCars.push(el.label);
        }
      });
    });
    setSearchedCarsName(arrOfSearchedCars);
    setProdYears(arrOfProdYears);
    setEngineVolumes(arrOfEngineVolumes);
    setSearchedFuelTypes(arrOfFuelTypes);
    setGearTypes(arrOfGearTypes);
    setCarRuns(arrOfCarRuns);
    setRightWheel(arrOfRightWeels);
    setSearchedLocationIds(arrOfLocations);
    setSearchedPrices(arrOfPrices);
    setSearchedGanbajebaTypes(arrOfGanbajebaTypes);
    setOrderDates(arrOfOrderDates);
    setViews(arrOfViews);
    setPhotoIDs(arrOfPhotoIDs);
    setSearchedCarIDs(arrOfCarIDs);
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
    window.scrollTo(0, 0);
  };

  // fetch car types and set them in state
  useEffect(() => {
    fetchManufactors();
  }, []);

  // count how many is in search after filter
  useEffect(() => {
    fetchCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions, fuelTypes, ganbajebaType, locations, yearRange]);

  // handle page change
  useEffect(() => {
    searchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <div className="container">
              <div className="header-container">
                <div className="iyideba">იყიდება</div>
                <Switch />
                <div style={{ opacity: 0.5 }}>ქირავდება</div>
                <div className="clear-filter">
                  <img
                    style={{ opacity: 0.5 }}
                    className="clear-button"
                    src={clearFilter}
                  />
                  <div>ფილტრების გასუფთავება</div>
                </div>
              </div>
              <hr style={{ opacity: 0.5 }} />
              <div className="filter-container">
                <div className="choose-auto-type">
                  <div className="car-type">
                    <img src={car} />
                    <div>ავტომობილები</div>
                    <hr color="red" className="car-hr" />
                  </div>
                  <div className="tractor-type">
                    <img src={tractor} />
                    <div>სპეცტექნიკა</div>
                  </div>
                  <div className="bike-type">
                    <img src={bike} />
                    <div>მოტოტექნიკა</div>
                  </div>
                </div>
                <div>
                  <hr className="hr" />
                </div>
                <div className="dropdowns">
                  <div className="dropdown-container">
                    <CarsDropdown
                      options={options}
                      selectedOptions={selectedOptions}
                      setselectedOptions={setselectedOptions}
                    />
                    <Location
                      options={locationOptions}
                      selectedOptions={locations}
                      setselectedOptions={setlocations}
                    />
                    <Ganbajeba
                      ganbajebuliButton={(e) => ganbajeba(e)}
                      ganubajebeliButton={(e) => ganubajebeli(e)}
                    />
                  </div>
                  <div className="dropdown-container">
                    <Years setYearRange={setYearRange} yearRange={yearRange} />
                    <FuelsDropdown
                      options={fuelOptions}
                      selectedOptions={fuelTypes}
                      setselectedOptions={setFuelTypes}
                    />
                    <Link to="/searched-cars">
                      <button
                        onClick={() => searchCars()}
                        className="count-button"
                      >
                        ძებნა ({count})
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="/searched-cars"
        element={
          <SearchedCars
            carNames={searchedCarsNames}
            prodYears={prodYears}
            engineVolumes={engineVolumes}
            fuelTypes={searchedFuelTypes}
            gearTypes={gearTypes}
            carRuns={carRuns}
            rightWheel={rightWheel}
            locationIDs={searchedLocationIds}
            prices={searchedPrices}
            ganbajebaTypes={searchedGanbajebaTypes}
            orderDates={orderDates}
            views={views}
            photoIDs={photoIDs}
            carIDs={searchedCarIDs}
            count={count}
            handlePageClick={(e) => handlePageClick(e)}
          />
        }
      />
    </Routes>
  );
}

export default App;
