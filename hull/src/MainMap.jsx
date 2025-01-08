import React, { useState, useEffect, useRef } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import Papa from 'papaparse';
import 'mapbox-gl/dist/mapbox-gl.css';

const MainMap = () => {

  const mapRef = useRef(null);

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
    <MapGL
      ref={mapRef}
      initialViewState={{
        latitude: 38.192799,
        longitude: 20.960850,
        zoom: 6.5,
        pitch: 20,
        // bearing: -17.6,
      }}
      style={{
        width: '100%',
        height: '100vh',
      }}
      // light={{
      //   anchor: 'viewport', // Light follows the camera
      //   position: [-90, 0, 80], // [azimuth, altitude, radius] in degrees
      //   color: 'white',
      //   intensity: 0.7 // Adjust for stronger or softer lighting
      // }}
      mapStyle="mapbox://styles/panosov/cm5nmivl400cp01rz4uwe6l1r"
      // terrain={{ source: 'mapbox-dem'}}
      projection={"globe"}
      mapboxAccessToken="pk.eyJ1IjoicGFub3NvdiIsImEiOiJjbGp2NjUwaXIwNmJqM2NvNm51dXplZTh3In0.q9o_JnLNTSr-m3vEI7VwQg"
    >
      {/* <Source
        id="mapbox-dem"
        type="raster-dem"
        url="mapbox://mapbox.mapbox-terrain-dem-v1"
        tileSize={512}
      /> */}

      {/* <Source id="composite" type="vector" url="mapbox://mapbox.mapbox-streets-v8">
        <Layer
          id="3d-buildings"
          type="fill-extrusion"
          source="composite"
          source-layer="building"
          paint={{
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15, 0,
              16.05, ['get', 'height']
            ],
            'fill-extrusion-opacity': 0.6
          }}
        />
      </Source> */}

      {geojson && (
        <Source id="track" type="geojson" data={geojson} lineMetrics={true}>
          <Layer
            id="line"
            type="line"
            paint={{
              // "line-color": "blue",
              "line-width": 4,
              "line-blur": 1,
              'line-gradient': [
                'interpolate',
                ['linear'],
                ['line-progress'],
                0, 'purple',
                1, 'blue'
              ]
            }}
            layout={{
              "line-join": "round",
              "line-cap": "round",

            }}
          />
        </Source>
      )}
    </MapGL>
  );
};

export default MainMap;
