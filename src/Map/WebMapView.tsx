import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import { Store } from '../Store';
import LocationLayer from './LocationLayer';

export const WebMapView = () =>
{
  const mapRef = useRef(null);

  const { dispatch } = React.useContext(Store);

  useEffect(
    () =>
    {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/BasemapGallery',
        'esri/widgets/LayerList',
        'esri/widgets/Home',
        'esri/layers/MapImageLayer'
      ], { css: true })
        .then(([Map, MapView, BasemapGallery, LayerList, Home, MapImageLayer]) =>
        {
          const map = new Map({
            basemap: 'streets-navigation-vector'
          });

          // load the map view at the ref's DOM node
          const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-81.80, 29.950],
            zoom: 10,
            logo: false
          }, { logo: false });

          new BasemapGallery({
            view: view,
            container: document.getElementById("basemap_selector_container"),
            source: {
              portal: {
                url: "http://www.arcgis.com",
                useVectorBasemaps: true, // Load vector tile basemap group
              },
            }
          });

          let fireServiceLayer = new MapImageLayer({
            url: 'https://maps.claycountygov.com:6443/arcgis/rest/services/Fire_Response/MapServer'
            , title: 'Fire Services'
          });
          map.add(fireServiceLayer);

          let siteAddressLayer = new MapImageLayer({
            url: 'https://maps.claycountygov.com:6443/arcgis/rest/services/SiteAddresses/MapServer'
            , title: 'Site Addresses'
          });
          map.add(siteAddressLayer);


          new LayerList({
            view: view,
            container: document.getElementById("layerlist_selector_container")
          });

          var homeWidget = new Home({ view: view });
          view.ui.add(homeWidget, { position: "top-left" });

          //view.ui.add(layerlist, { position: "top-right" });

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
      <LocationLayer state_array="filtered_avl_data" title="AVL Units" r="255" g="0" b="0" view_type="avl" />
      <LocationLayer state_array="filtered_fc_data" title="Fleet Complete Units" r="0" g="255" b="0" view_type="fc" />
      <LocationLayer state_array="filtered_cad_data" title="CAD Units" r="0" g="0" b="255" view_type="cad" />
      
    </div>);
};