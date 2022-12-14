import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highmaps";
import mapData from "./mapData";
import DISTRICTMAPS from "./districtMaps";
import HighchartsReact from "highcharts-react-official";

const MapOfIndia = (porps) => {
  const mappedState = {
    11: "gujarat",
    1: "uttar-pradesh",
  };
  let selectedState = porps.param.selected_state_id;
  //selectedState = mappedState[selectedState];

  const [districtOptionsData, setDistrictOptionsData] = useState({});
  var data = Highcharts.geojson(
    Highcharts.maps["countries/in/custom/in-all-disputed"]
  );
  window.Highcharts = Highcharts;

  const nationalOptions = {
    title: { text: "" },
    mapNavigation: { enabled: !0, buttonOptions: { verticalAlign: "top" } },
    legend: { enabled: !1 },
    credits: { enabled: !1 },
    plotOptions: {
      map: {
        states: { hover: { color: "#fcfc03" }, select: { color: "#ff921e" } },
      },
    },
    series: [
      {
        data: data,
        name: "India",
        borderColor: "#fff",
        color: "#0088AB",
        dataLabels: { enabled: !0, format: "{point.properties.postal-code}" },
        events: {
          click(e) {
            console.info(
              "national click event: ",
              e,
              e.srcElement.classList.value.split(" ")[1].split("name-")[1],
              Object.values(mappedState),
              Object.keys(mappedState),
              selectedState
            );

            const dd = DISTRICTMAPS.filter((t) => {
              return t.id === selectedState;
            });
            initDistrictOptions(dd[0].data[0].mapData);
          },
        },
      },
    ],
  };

  const initDistrictOptions = (e) => {
    setDistrictOptionsData({
      title: { text: "" },
      series: [
        {
          type: "map",
          data: e,
          borderColor: "#fff",
          color: "#0088AB",
          name: "District",
          allowPointSelect: !0,
          events: {
            click(e) {
              console.log("eeee:", e);
            },
          },
        },
      ],
      plotOptions: {
        map: {
          states: { hover: { color: "#fcfc03" }, select: { color: "#ff921e" } },
        },
      },
      legend: { enabled: !1 },
      credits: { enabled: !1 },
      mapNavigation: { enabled: !0, buttonOptions: { verticalAlign: "top" } },
    });
  };

  useEffect(() => {
    const dd = DISTRICTMAPS.filter((t) => {
      return t.id === selectedState;
    });
    initDistrictOptions(dd[0].data[0].mapData);
  }, []);

  const showNational = () => {
    setDistrictOptionsData({});
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {!districtOptionsData.hasOwnProperty("series") && (
        <HighchartsReact
          highcharts={Highcharts}
          options={nationalOptions}
          constructorType={"mapChart"}
        />
      )}

      {districtOptionsData.hasOwnProperty("series") && (
        <>
          <span
            style={{
              float: "right",
              color: "#0088AB",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={showNational}
          >
            &larr; Back
          </span>
          <HighchartsReact
            highcharts={Highcharts}
            options={districtOptionsData}
            constructorType={"mapChart"}
          />
        </>
      )}
    </div>
  );
};

export default MapOfIndia;
