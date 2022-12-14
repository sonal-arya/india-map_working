import React, { useState } from "react";
import Highcharts from "highcharts/highmaps";
import mapData from "./mapData";
import DISTRICTMAPS from "./districtMaps";
import HighchartsReact from "highcharts-react-official";

const MapOfIndia = () => {
  const [districtOptionsData, setDistrictOptionsData] = useState({});
  var data = Highcharts.geojson(Highcharts.maps["countries/in/custom/in-all-disputed"]);
  window.Highcharts = Highcharts;

  const nationalOptions = {
    title:{
      text:''
  },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: "top",
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      map: {
        states: {
          hover: {
            color: "#fcfc03",
          },
          select: {
            color: "#ff921e",
          },
        },
      },
    },
    series: [
      {
        data: data,
        name: "India",
        borderColor: "#fff",
        color: "#0088AB",
        dataLabels: {
          enabled: true,
          format: "{point.properties.postal-code}",
        },
        events: {
          click: (e) => {
            initDistrictOptions(DISTRICTMAPS.filter((dm)=>{
              return dm.id === e.point.properties.id;
            })[0].data[0].mapData);
          },
        },
      },
    ],
  };

  const initDistrictOptions = (d) => {
    setDistrictOptionsData({
      title:{
        text:''
    },
      series: [
        {
          type: "map",
          data: d,
          borderColor: "#fff",
          color: "#0088AB",
          name: "District",
          allowPointSelect: true,
          events: {
            click: (e) => {
              // distring trigger point event 
              console.log("eeee:", e);
            },
          },
        },
      ],
      plotOptions: {
        map: {
          states: {
            hover: {
              color: "#fcfc03",
            },
            select: {
              color: "#ff921e",
            },
          },
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "top",
        },
      },
    });
  };

  const showNational=()=>{setDistrictOptionsData({})};
  return (
    <div style={{width:"100%", height:"100%"}}>
      {!districtOptionsData.hasOwnProperty("series") &&
      <HighchartsReact
        highcharts={Highcharts}
        options={nationalOptions}
        constructorType={"mapChart"}
      />
      }

    {districtOptionsData.hasOwnProperty("series") && 
     <>
     <span style={{float:"right", color:"#0088AB", fontWeight:"bold", cursor:"pointer"}} onClick={showNational}>&larr; Back</span>
     <HighchartsReact
     highcharts={Highcharts}
     options={districtOptionsData}
     constructorType={"mapChart"}
   /></>
    }
    </div>
  );
};

export default MapOfIndia;
