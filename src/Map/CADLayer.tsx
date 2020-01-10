import React, { useEffect, useState } from 'react';
import { Store } from '../Store';
import { loadModules } from 'esri-loader';

const CADLayer = () =>
{
  const { state, dispatch } = React.useContext(Store);

  const [cadLayer, setCADLayer] = useState(null);

  useEffect(() =>
  {
    console.log('loading fc layer', state.map, state.filtered_fc_data);
    if (state.map !== null && state.filtered_cad_data.length > 0)
    {
      loadModules([
        'esri/layers/GraphicsLayer'
        , 'esri/Graphic'
      ]).then(([
        GraphicsLayer
        , Graphic
      ]) =>
      {
        let layer = cadLayer === null ? new GraphicsLayer() : cadLayer;
        if (layer.graphics.length > 0) layer.removeAll();
        layer.title = "CAD Units";

        for (let d of state.filtered_cad_data)
        {
          let point = {
            type: "point"
            , longitude: d.longitude
            , latitude: d.latitude
          };
          let symbol = {
            type: 'simple-marker'
            , color: [0, 0, 225]
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

        setCADLayer(layer);
        state.map.add(layer);

      }).catch(err => console.error(err));
    }
    return function cleanup()
    {
      if (state.map !== null) state.map.remove(cadLayer);
    }
  }, [state.map, state.filtered_cad_data]);


  return null;
}

export default CADLayer;