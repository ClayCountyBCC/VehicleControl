import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import { Store } from '../Store';
import AVLLayer from './AVLLayer';
import FCLayer from './FCLayer';
import CADLayer from './CADLayer';

export const WebMapView = () =>
{
  const mapRef = useRef(null);

  const { state, dispatch } = React.useContext(Store);

  useEffect(
    () =>
    {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/BasemapGallery',
        'esri/widgets/LayerList',
        'esri/widgets/Home'
      ], { css: true })
        .then(([ArcGISMap, MapView, BasemapGallery, LayerList, Home]) =>
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

          var layerlist = new LayerList({
            view: view,
            //container: document.getElementById("basemap_selector_container"),
            source: {
              portal: {
                url: "http://www.arcgis.com",
                useVectorBasemaps: false, // Load vector tile basemap group
              },
            }
          });

          var homeWidget = new Home({ view: view });
          view.ui.add(homeWidget, { position: "top-left" });

          view.ui.add(layerlist, { position: "top-right" });

          view.when(() =>
          {
            console.log('view.then running');
            dispatch({ type: 'save_map', payload: map });
            dispatch({ type: 'save_map_view', payload: view });

          });

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

  return (
    <div className="webmap" ref={mapRef}>
      <AVLLayer />
      <FCLayer />
      <CADLayer />
    </div>);
};