import React, { useEffect, useState } from 'react';
import { Store } from '../Store';
import { loadModules } from 'esri-loader';

const LocationLayer = ({ state_array, title, r, g, b, view_type }) =>
{
  const { state } = React.useContext(Store);

  //const view_name = view_type + '_view';



  const [graphicsLayer, setGraphicsLayer] = useState(null);

  const CalculateTimeDifference = (timestamp: Date, now: Date): number =>
  {
    let diff = (now.valueOf() - new Date(timestamp).valueOf()) / 1000;
    if (diff < 60) return 1;     // 1 minute
    if (diff < 120) return .9;   // 2 minutes
    if (diff < 300) return .8;   // 5 minutes
    if (diff < 600) return .7;   // 10 minutes
    if (diff < 1200) return .6;  // 20 minutes
    if (diff < 1800) return .5;  // 30 minutes
    if (diff < 3600) return .4;  // 1 hour
    if (diff < 14400) return .3;   // 4 hours
    if (diff < 28800) return .2;   // 8 hours
    return .1;   // 24 hours or more
  }

  const UpdateLayer = () =>
  {
    loadModules([
      'esri/layers/GraphicsLayer'
      , 'esri/Graphic'
    ]).then(([
      GraphicsLayer
      , Graphic
    ]) =>
    {
      let layer = graphicsLayer === null ? new GraphicsLayer() : graphicsLayer;
      if (layer.graphics.length > 0) layer.removeAll();
      layer.id = view_type;
      layer.title = title;

      let now = new Date();

      for (let d of state[state_array])
      {
        let point = {
          type: "point"
          , longitude: d.longitude
          , latitude: d.latitude
        };

        let symbol = {
          type: 'simple-marker'
          , color: [r, g, b, CalculateTimeDifference(d.location_timestamp, now)]
        };

        let symbolGraphic = new Graphic({
          geometry: point
          , symbol: symbol
        });

        symbolGraphic.setAttribute("view", view_type);
        symbolGraphic.setAttribute("device_id", d.device_id);
        symbolGraphic.setAttribute("unitcode", d.unitcode);

        //symbolGraphic.onClick = (event) =>
        //{
          

          
        //}

        var text = {
          type: "text"
          , color: "black"
          , haloColor: "white"
          , haloSize: "2px"
          , xoffset: 9
          , yoffset: -2
          , text: (d.unitcode.length > 0 ? d.unitcode : d.device_id)
          , horizontalAlignment: "left"
          , font: {
            size: 10
          }
        };

        var textGraphic = new Graphic({
          geometry: point
          , symbol: text
        });

        layer.add(symbolGraphic);
        layer.add(textGraphic);

      }
      setGraphicsLayer(layer);
      state.map.add(layer);

    }).catch(err => console.error(err));
  }

  useEffect(() =>
  {
    if (state.map && state[state_array].length > 0)
    {
      UpdateLayer();
    }
    return function cleanup()
    {
      if (state.map) state.map.remove(graphicsLayer);
    }
  }, [state.map, state[state_array]]);


  return null;
}

export default LocationLayer;