import React, { useEffect, useState } from 'react';
import { Store } from '../Store';
import { loadModules } from 'esri-loader';

const FCLayer = () =>
{
  const { state, dispatch } = React.useContext(Store);

  const [fcLayer, setFCLayer] = useState(null);

  useEffect(() =>
  {
    console.log('loading fc layer', state.map, state.filtered_fc_data);
    if (state.map !== null && state.filtered_fc_data.length > 0)
    {
      loadModules([
        'esri/layers/GraphicsLayer'
        , 'esri/Graphic'
      ]).then(([
        GraphicsLayer
        , Graphic
      ]) =>
      {
        let layer = fcLayer === null ? new GraphicsLayer() : fcLayer;
        if (layer.graphics.length > 0) layer.removeAll();
        layer.title = "FleetComplete Units";

        for (let d of state.filtered_fc_data)
        {
          let point = {
            type: "point"
            , longitude: d.longitude
            , latitude: d.latitude
          };
          let symbol = {
            type: 'simple-marker'
            , color: [0, 225, 0]
          }
          let symbolGraphic = new Graphic({
            geometry: point
            , symbol: symbol
          });

          var text = {
            type: "text"
            , color: "black"
            , halo: "white"
            , haloSize: "3px"
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

        setFCLayer(layer);
        state.map.add(layer);

      }).catch(err => console.error(err));
    }
    return function cleanup()
    {
      if (state.map !== null) state.map.remove(fcLayer);
    }
  }, [state.map, state.filtered_fc_data]);


  return null;
}

export default FCLayer;