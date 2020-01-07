import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

export const WebMapView = () =>
{
  const mapRef = useRef(null);



  useEffect(
    () =>
    {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/BasemapGallery'], { css: true })
        .then(([ArcGISMap, MapView, BasemapGallery]) =>
        {
          const map = new ArcGISMap({
            basemap: 'osm'
          });

          // load the map view at the ref's DOM node
          const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-81.80, 29.950],
            zoom: 11
          });

          var basemapGallery = new BasemapGallery({
            view: view,
            container: document.getElementById("basemap_selector_container"),
            source: {
              portal: {
                url: "http://www.arcgis.com",
                useVectorBasemaps: false, // Load vector tile basemap group
              },
            }
          });

          view.when(() =>
          {
            console.log('view.then running');



          });
          //view.ui.add(basemapGallery, "top-right");

          return () =>
          {
            if (view)
            {
              // destroy the map view
              view.container = null;
            }
          };
        });
    }, []
  );

  return <div className="webmap" ref={mapRef} />;
};