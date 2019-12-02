var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Utilities;
(function (Utilities) {
    const app_path = "/vehiclecontrol";
    function Hide(e) {
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        e.classList.add("hide");
        e.classList.remove("show");
        e.classList.remove("show-inline");
        e.classList.remove("show-flex");
    }
    Utilities.Hide = Hide;
    function Show(e) {
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        e.classList.add("show");
        e.classList.remove("hide");
        e.classList.remove("show-inline");
        e.classList.remove("show-flex");
    }
    Utilities.Show = Show;
    function Show_Inline(e) {
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        e.classList.add("show-inline");
        e.classList.remove("hide");
        e.classList.remove("show");
        e.classList.remove("show-flex");
    }
    Utilities.Show_Inline = Show_Inline;
    function Show_Inline_Flex(e) {
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        e.classList.add("show-inline-flex");
        e.classList.remove("hide");
        e.classList.remove("show");
        e.classList.remove("show-flex");
    }
    Utilities.Show_Inline_Flex = Show_Inline_Flex;
    function Show_Flex(e) {
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        e.classList.add("show-flex");
        e.classList.remove("hide");
        e.classList.remove("show-inline");
        e.classList.remove("show");
    }
    Utilities.Show_Flex = Show_Flex;
    function Error_Show(e, errorText, timeout) {
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        if (errorText) {
            //Set_Text(e, errorText);
            Clear_Element(e);
            let notification = document.createElement("div");
            notification.classList.add("notification");
            notification.classList.add("is-danger");
            let deleteButton = document.createElement("button");
            deleteButton.classList.add("delete");
            deleteButton.onclick = () => {
                Hide(e);
            };
            notification.appendChild(deleteButton);
            if (Array.isArray(errorText)) {
                // we're assuming that errorText is an array if we get here.
                let ul = document.createElement("ul");
                errorText.forEach((et) => {
                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(et));
                    ul.appendChild(li);
                });
                notification.appendChild(ul);
            }
            else {
                notification.appendChild(document.createTextNode(errorText));
            }
            e.appendChild(notification);
        }
        Show(e);
        if (timeout == undefined || timeout === true) {
            window.setTimeout(function (j) {
                Hide(e);
            }, 30000);
        }
    }
    Utilities.Error_Show = Error_Show;
    function Simple_Error_Show(e, errorText) {
        Clear_Element(e);
        e.appendChild(document.createTextNode(errorText));
    }
    Utilities.Simple_Error_Show = Simple_Error_Show;
    function Clear_Element(node) {
        if (node === null || node === undefined)
            return;
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
    Utilities.Clear_Element = Clear_Element;
    function Create_Option(value, label, selected = false) {
        let o = document.createElement("option");
        o.value = value;
        o.text = label;
        o.selected = selected;
        return o;
    }
    Utilities.Create_Option = Create_Option;
    function Get_Value(e) {
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        return e.value;
    }
    Utilities.Get_Value = Get_Value;
    function Set_Value(e, value) {
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        e.value = value;
    }
    Utilities.Set_Value = Set_Value;
    function Set_Text(e, value) {
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        Clear_Element(e);
        e.appendChild(document.createTextNode(value));
    }
    Utilities.Set_Text = Set_Text;
    function Show_Menu(elementId) {
        //let element = e.srcElement;
        // we expect the element's id to be in a "nav-XXX" name format, where 
        // XXX is the element we want to show 
        let id = elementId.replace("nav-", "");
        let menuItems = document.querySelectorAll("#menuTabs > li > a");
        if (menuItems.length > 0) {
            for (let i = 0; i < menuItems.length; i++) {
                let item = menuItems.item(i);
                if (item.id === elementId) {
                    item.parentElement.classList.add("is-active");
                }
                else {
                    item.parentElement.classList.remove("is-active");
                }
            }
        }
        Show_Hide_Selector("#views > section", id);
    }
    Utilities.Show_Menu = Show_Menu;
    function Handle_Tabs(tabSelector, containerSelector, id) {
        Activate_Inactivate_Selector(tabSelector, "nav-" + id);
        Show_Hide_Selector(containerSelector, id);
    }
    Utilities.Handle_Tabs = Handle_Tabs;
    function Activate_Inactivate_Selector(selector, id) {
        let sections = document.querySelectorAll(selector);
        if (sections.length > 0) {
            for (let i = 0; i < sections.length; i++) {
                let item = sections.item(i);
                if (item.id === id) {
                    item.classList.add("is-active");
                }
                else {
                    item.classList.remove("is-active");
                }
            }
        }
    }
    Utilities.Activate_Inactivate_Selector = Activate_Inactivate_Selector;
    function Show_Hide_Selector(selector, id) {
        let sections = document.querySelectorAll(selector);
        if (sections.length > 0) {
            for (let i = 0; i < sections.length; i++) {
                let item = sections.item(i);
                if (item.id === id) {
                    Show(item);
                }
                else {
                    Hide(item);
                }
            }
        }
    }
    Utilities.Show_Hide_Selector = Show_Hide_Selector;
    // original Get Function
    //export function Get<T>(url: string): Promise<T>
    //{
    //  return fetch(url,
    //    {
    //      method: "GET",
    //      headers: {
    //        "Content-Type": "application/json"//,"Upgrade-Insecure-Requests": "1"
    //      },
    //      cache: "no-cache",
    //      credentials: "include"
    //    }
    //  )
    //    .then(response =>
    //    {
    //      if (!response.ok)
    //      {
    //        throw new Error(response.statusText)
    //      }
    //      return response.json();
    //    });
    //}
    function Get_Path(app_name = "") {
        if (app_name.length === 0)
            app_name = app_path;
        console.log('using app path ' + app_path);
        let path = "/";
        let i = window.location.pathname.toLowerCase().indexOf(app_name);
        if (i == 0) {
            path = app_name + "/";
        }
        return path;
    }
    Utilities.Get_Path = Get_Path;
    function Get_Empty(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json" //,"Upgrade-Insecure-Requests": "1"
                },
                cache: "no-cache",
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return yield response.text();
        });
    }
    Utilities.Get_Empty = Get_Empty;
    function Get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(Get_Path() + url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json" //,"Upgrade-Insecure-Requests": "1"
                },
                cache: "no-cache",
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return yield response.json();
        });
    }
    Utilities.Get = Get;
    function Post(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(Get_Path() + url, {
                method: "POST",
                body: JSON.stringify(data),
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
    Utilities.Post = Post;
    function Post_Empty(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url, {
                method: "POST",
                body: data !== null ? JSON.stringify(data) : "",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            return response;
        });
    }
    Utilities.Post_Empty = Post_Empty;
    function Format_Amount(amount) {
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    Utilities.Format_Amount = Format_Amount;
    function Format_Date(date) {
        if (date instanceof Date) {
            return date.toLocaleDateString('en-us');
        }
        var d = new Date(date);
        return d.toLocaleDateString('en-US');
    }
    Utilities.Format_Date = Format_Date;
    function Format_DateTime(date) {
        if (date instanceof Date) {
            return date.toLocaleString('en-us');
        }
        return new Date(date).toLocaleString('en-US');
    }
    Utilities.Format_DateTime = Format_DateTime;
    function Validate_Text(e, errorElementId, errorText) {
        // this should only be used for required elements.
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        let ele = e;
        ele.tagName.toLowerCase() === "select" ? ele.parentElement.classList.remove("is-danger") : ele.classList.remove("is-danger");
        let v = Get_Value(ele).trim();
        if (v.length == 0) {
            ele.tagName.toLowerCase() === "select" ? ele.parentElement.classList.add("is-danger") : ele.classList.add("is-danger");
            Error_Show(errorElementId, errorText);
            ele.focus();
            ele.scrollTo();
            return "";
        }
        return v;
    }
    Utilities.Validate_Text = Validate_Text;
    function Toggle_Loading_Button(e, disabled) {
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        let b = e;
        b.disabled = disabled;
        b.classList.toggle("is-loading", disabled);
    }
    Utilities.Toggle_Loading_Button = Toggle_Loading_Button;
    //export function Create_Menu_Element(menuItem: MenuItem): HTMLLIElement
    //{
    //  let li = document.createElement("li");
    //  if (menuItem.selected) li.classList.add("is-active");
    //  let a = document.createElement("a");
    //  a.id = menuItem.id;
    //  a.onclick = function ()
    //  {
    //    Update_Menu(menuItem);
    //  }
    //  if (menuItem.icon.length > 0)
    //  {
    //    let span = document.createElement("span");
    //    span.classList.add("icon");
    //    span.classList.add(Transaction.app_input_size);
    //    let i = document.createElement("i");
    //    let icons = menuItem.icon.split(" ");
    //    for (let icon of icons)
    //    {
    //      i.classList.add(icon);
    //    }
    //    span.appendChild(i);
    //    a.appendChild(span);
    //  }
    //  a.appendChild(document.createTextNode(menuItem.label))
    //  li.appendChild(a);
    //  return li;
    //}
    //export function Update_Menu(menuItem: MenuItem): void
    //{
    //  Set_Text("menuTitle", menuItem.title);
    //  Set_Text("menuSubTitle", menuItem.subTitle);
    //  Show_Menu(menuItem.id);
    //  document.getElementById(menuItem.autofocusId).focus();
    //}
    //export function Build_Menu_Elements(target: string, Menus: Array<MenuItem>): void
    //{
    //  let menu = document.getElementById(target);
    //  for (let menuItem of Menus)
    //  {
    //    menu.appendChild(Utilities.Create_Menu_Element(menuItem));
    //  }
    //}
    //export function CheckBrowser()
    //{
    //  let browser: string = "";
    //  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) 
    //  {
    //    browser = 'Opera';
    //  }
    //  else if (navigator.userAgent.indexOf("Chrome") != -1)
    //  {
    //    browser = 'Chrome';
    //  }
    //  else if (navigator.userAgent.indexOf("Safari") != -1)
    //  {
    //    browser = 'Safari';
    //  }
    //  else if (navigator.userAgent.indexOf("Firefox") != -1) 
    //  {
    //    browser = 'Firefox';
    //  }
    //  else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.DOCUMENT_NODE == true)) //IF IE > 10
    //  {
    //    browser = 'IE';
    //  }
    //  else 
    //  {
    //    browser = 'unknown';
    //  }
    //  return browser;
    //}
    //export function Create_Centered_Level(level_items: Array<LevelItem>, left: Array<LevelItem> = [], right: Array<LevelItem> = []): HTMLElement
    //{
    //  let level = document.createElement("div");
    //  level.classList.add("level");
    //  for (let li of level_items)
    //  {
    //    level.appendChild(Create_Level_Item(li));
    //  }
    //  if (left.length > 0)
    //  {
    //    let leftcontainer = document.createElement("div");
    //    leftcontainer.classList.add("level-left");
    //    level.appendChild(leftcontainer);
    //    for (let li of left)
    //    {
    //      leftcontainer.appendChild(Create_Level_Item(li));
    //    }
    //  }
    //  if (right.length > 0)
    //  {
    //    let rightcontainer = document.createElement("div");
    //    rightcontainer.classList.add("level-right");
    //    level.appendChild(rightcontainer);
    //    for (let li of right)
    //    {
    //      rightcontainer.appendChild(Create_Level_Item(li));
    //    }
    //  }
    //  return level;
    //}
    //function Create_Level_Item(level_item: LevelItem): HTMLElement
    //{
    //  let levelitem = document.createElement("div");
    //  levelitem.classList.add("level-item", ...level_item.classes);
    //  let container = document.createElement("div");
    //  levelitem.appendChild(container);
    //  if (level_item.heading.length > 0)
    //  {
    //    let heading = document.createElement("p");
    //    heading.classList.add("heading");
    //    heading.appendChild(document.createTextNode(level_item.heading));
    //    container.appendChild(heading);
    //  }
    //  if (level_item.title_text.length > 0)
    //  {
    //    let title = document.createElement("p");
    //    title.classList.add("title");
    //    title.appendChild(document.createTextNode(level_item.title_text));
    //    container.appendChild(title);
    //  }
    //  else
    //  {
    //    if (level_item.title !== null)
    //    {
    //      container.appendChild(level_item.title);
    //    }
    //  }
    //  return levelitem;
    //}
    function CreateTableCell(celltype, value, class_to_add, width = "", col_span = -1) {
        if (celltype !== "td" && celltype !== "th")
            celltype = "td";
        let cell = document.createElement(celltype);
        if (width.length > 0)
            cell.style.width = width;
        if (value.length > 0)
            cell.appendChild(document.createTextNode(value));
        if (class_to_add.length > 0)
            cell.classList.add(class_to_add);
        if (col_span > -1)
            cell.colSpan = col_span;
        return cell;
    }
    Utilities.CreateTableCell = CreateTableCell;
})(Utilities || (Utilities = {}));
export default Utilities;
//# sourceMappingURL=Utilities.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utilities_1 = __importDefault(require("./Utilities"));
class AVLData {
    constructor() {
        this.device_id = "";
        this.device_type = "";
        this.unitcode = "";
        this.direction = 0;
        this.location_timestamp = new Date();
        this.satellite_count = 0;
        this.velocity = 0;
        this.ip_address = "";
        this.latitude = 0;
        this.longitude = 0;
        this.updated_on = new Date();
        this.error_information = [];
    }
    Get() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Utilities_1.default.Get('API/AVL/Get');
            return data;
        });
    }
}
exports.AVLData = AVLData;
//# sourceMappingURL=avl_data.js.map
import React from 'react';
const initialState = {
    avl_data: []
};
const AppContext = React.createContext(initialState);
export default AppContext;
//# sourceMappingURL=AppContext.js.map
export default function reducer(state, action) {
    switch (action.type) {
        case "get_avl":
            return Object.assign(Object.assign({}, state), { avl_data: action.payload });
        default:
            return state;
    }
}
//# sourceMappingURL=AppReducer.js.map
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