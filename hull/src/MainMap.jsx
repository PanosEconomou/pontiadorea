import React, { useState, useEffect } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import Papa from 'papaparse';
import 'mapbox-gl/dist/mapbox-gl.css';

const MainMap = () => {

  const [geojson, setGeojson] = useState(null);

  useEffect(() => {
    // Fetch the CSV file from the public folder
    fetch('./track.csv')
      .then((response) => response.text())
      .then((csvText) => {
        // Parse the CSV data
        Papa.parse(csvText, {
          header: true, // No headers in the CSV
          skipEmptyLines: true,
          complete: (results) => {
            // Convert CSV rows to GeoJSON coordinates ([longitude, latitude])
            const coordinates = results.data.map((row) => [
              parseFloat(row.LON),
              parseFloat(row.LAT),
            ]);

            // Create GeoJSON object
            const geojsonData = {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates,
              },
            };

            setGeojson(geojsonData);
            // console.log(geojsonData);
          },
        });
      });
  }, []);


  return (
    <Map
      initialViewState={{
        latitude: 38.192799,
        longitude:  20.960850,
        zoom: 6.5,
      }}
      // onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      projection={"globe"}
      mapboxAccessToken="pk.eyJ1IjoicGFub3NvdiIsImEiOiJjbGp2NjUwaXIwNmJqM2NvNm51dXplZTh3In0.q9o_JnLNTSr-m3vEI7VwQg"
    >
      {geojson && (
        <Source id="track" type="geojson" data={geojson}>
          <Layer
            id="line"
            type="line"
            paint={{
              "line-color": "blue",
              "line-width": 3,
              "line-cap": "round",
              "line-join": "round",
              "line-blur": 2 
            }}
          />
        </Source>
      )}
    </Map>
  );
};

export default MainMap;
