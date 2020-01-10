import React, { useEffect, useState } from 'react';
import { Store } from '../Store';
import { loadModules } from 'esri-loader';

const AVLLayer = () =>
{
  const { state, dispatch } = React.useContext(Store);

  const [avlLayer, setAVLLayer] = useState(null);

  useEffect(() =>
  {
    console.log('loading avl layer', state.map, state.filtered_avl_data);
    if (state.map !== null && state.filtered_avl_data.length > 0)
    {
      loadModules([
        'esri/layers/GraphicsLayer'
        , 'esri/Graphic'
      ]).then(([
        GraphicsLayer
        , Graphic
      ]) =>
      {
        console.log('looping');

        let layer = avlLayer === null ? new GraphicsLayer() : avlLayer;
        if (layer.graphics.length > 0) layer.removeAll();
        layer.title = "AVL Units";

        for (let d of state.filtered_avl_data)
        {
          let point = {
            type: "point"
            , longitude: d.longitude
            , latitude: d.latitude
          };
          let symbol = {
            type: 'simple-marker'
            , color: [225, 0, 0]
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
            , text: "AVL - " + (d.unitcode.length > 0 ? d.unitcode : d.device_id)
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

        setAVLLayer(layer);
        state.map.add(layer);

      }).catch(err => console.error(err));
    }
    return function cleanup()
    {
      if (state.map !== null) state.map.remove(avlLayer);
    }
  }, [state.map, state.filtered_avl_data]);


  return null;
}

export default AVLLayer;