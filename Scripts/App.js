var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useContext, useReducer, useEffect } from 'react';
import { render } from 'react-dom';
import AppReducer from './AppReducer';
import AppContext from './AppContext';
import AVLData from './AVLData';
//const useAPI = () =>
//{
//  const [data, setData] = useState([]);
//  useEffect(() =>
//  {
//    getData();
//  }, []);
//  const getData = async () =>
//  {
//    const avl = await AVLData.Get();
//    setData(avl);
//  }
//}
const App = () => {
    const initialState = useContext(AppContext);
    const getAVLData = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield AVLData.Get();
        return dispatch({ type: 'get_avl', payload: data });
    });
    const [state, dispatch] = useReducer(AppReducer, initialState);
    //const currentAVL = useAPI();
    useEffect(() => {
        //dispatch({ type: "get_avl", payload: currentAVL });
        state.avl_data.length === 0 && getAVLData();
    }, []);
    return (React.createElement(AppContext.Provider, { value: { state, dispatch } },
        React.createElement("h1", null, "AVL Data"),
        React.createElement("section", null, state.avl_data.map(avl => {
            return (React.createElement("div", { key: avl.unitcode }, avl.unitcode));
        }))));
};
render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=App.js.map