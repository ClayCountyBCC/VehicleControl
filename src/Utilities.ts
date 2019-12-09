﻿module Utilities
{
  const app_path = "/vehiclecontrol";

  export function Hide(e: string): void
  export function Hide(e: HTMLElement): void
  export function Hide(e: Element): void
  export function Hide(e: any):void
  {
    if (typeof e == "string")
    {
      e = document.getElementById(e);
    }
    e.classList.add("hide");
    e.classList.remove("show");
    e.classList.remove("show-inline");
    e.classList.remove("show-flex");
  }

  export function Show(e: string): void
  export function Show(e: HTMLElement): void
  export function Show(e: Element): void
  export function Show(e: any): void
  {
    if (typeof e == "string")
    {
      e = document.getElementById(e);
    }
    e.classList.add("show");
    e.classList.remove("hide");
    e.classList.remove("show-inline");
    e.classList.remove("show-flex");
  }

  export function Show_Inline(e: string): void
  export function Show_Inline(e: HTMLElement): void
  export function Show_Inline(e: Element): void
  export function Show_Inline(e: any): void
  {
    if (typeof e == "string")
    {
      e = document.getElementById(e);
    }
    e.classList.add("show-inline");
    e.classList.remove("hide");
    e.classList.remove("show");
    e.classList.remove("show-flex");
  }

  export function Show_Inline_Flex(e: string): void
  export function Show_Inline_Flex(e: HTMLElement): void
  export function Show_Inline_Flex(e: Element): void
  export function Show_Inline_Flex(e: any): void
  {
    if (typeof e == "string")
    {
      e = document.getElementById(e);
    }
    e.classList.add("show-inline-flex");
    e.classList.remove("hide");
    e.classList.remove("show");
    e.classList.remove("show-flex");
  }

  export function Show_Flex(e: string): void
  export function Show_Flex(e: HTMLElement): void
  export function Show_Flex(e: Element): void
  export function Show_Flex(e: any): void
  {
    if (typeof e == "string")
    {
      e = document.getElementById(e);
    }
    e.classList.add("show-flex");
    e.classList.remove("hide");
    e.classList.remove("show-inline");
    e.classList.remove("show");
  }

  export function Error_Show(e: string, errorText?: Array<string>, timeout?: boolean): void
  export function Error_Show(e: string, errorText?: string, timeout?: boolean): void
  export function Error_Show(e: HTMLElement, errorText?: string, timeout?: boolean): void
  export function Error_Show(e: Element, errorText?: string, timeout?: boolean): void
  export function Error_Show(e: any, errorText?: any, timeout?: boolean): void
  {
    if (typeof e == "string")
    {
      e = document.getElementById(e);
    }
    if (errorText)
    {
      //Set_Text(e, errorText);
      Clear_Element(e);
      let notification = document.createElement("div");
      notification.classList.add("notification");
      notification.classList.add("is-danger");
      let deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      deleteButton.onclick = () =>
      {
        Hide(e);
      }
      notification.appendChild(deleteButton);
      if (Array.isArray(errorText))
      {
        // we're assuming that errorText is an array if we get here.
        let ul = document.createElement("ul");
        errorText.forEach((et) =>
        {
          let li = document.createElement("li");
          li.appendChild(document.createTextNode(<string>et));
          ul.appendChild(li);
        });
        notification.appendChild(ul);
      } else
      {
        notification.appendChild(document.createTextNode(errorText));

      }

      (<HTMLElement>e).appendChild(notification);

    }
    Show(e);
    if (timeout == undefined || timeout === true)
    {
      window.setTimeout(function (j)
      {
        Hide(e);
      }, 30000)
    }
  }

  export function Simple_Error_Show(e: Element, errorText: string): void
  {
    Clear_Element(<HTMLElement>e);
    e.appendChild(document.createTextNode(errorText));
  }

  export function Clear_Element(node: HTMLElement): void
  { // this function just emptys an element of all its child nodes.
    if (node === null || node === undefined) return;
    while (node.firstChild)
    {
      node.removeChild(node.firstChild);
    }
  }

  export function Create_Option(value: string, label: string, selected: boolean = false): HTMLOptionElement
  {
    let o = document.createElement("option");
    o.value = value;
    o.text = label;
    o.selected = selected;
    return o;
  }

  export function Get_Value(e: string): string
  export function Get_Value(e: HTMLSelectElement): string
  export function Get_Value(e: HTMLInputElement): string
  export function Get_Value(e: any): string
  {
    if (typeof e == "string")
    {
      e = document.getElementById(e);
    }
    return (<HTMLInputElement>e).value;
  }

  export function Set_Value(e: string, value: string): void
  export function Set_Value(e: HTMLSelectElement, value: string): void
  export function Set_Value(e: HTMLInputElement, value: string): void
  export function Set_Value(e: any, value: string): void
  {
    if (typeof e == "string")
    {
      e = document.getElementById(e);
    }
    (<HTMLInputElement>e).value = value;
  }

  export function Set_Text(e: string, value: string): void
  export function Set_Text(e: HTMLElement, value: string): void
  export function Set_Text(e: any, value: string): void
  {
    if (typeof e == "string")
    {
      e = document.getElementById(e);
    }
    Clear_Element(e);
    (<HTMLElement>e).appendChild(document.createTextNode(value));
  }

  //export function Show_Menu(elementId: string)
  //{
  //  //let element = e.srcElement;
  //  // we expect the element's id to be in a "nav-XXX" name format, where 
  //  // XXX is the element we want to show 
  //  let id = elementId.replace("nav-", "");
  //  let menuItems = <NodeListOf<HTMLElement>>document.querySelectorAll("#menuTabs > li > a");
  //  if (menuItems.length > 0)
  //  {
  //    for (let i = 0; i < menuItems.length; i++)
  //    {
  //      let item = menuItems.item(i);
  //      if (item.id === elementId)
  //      {
  //        item.parentElement.classList.add("is-active");
  //      }
  //      else
  //      {
  //        item.parentElement.classList.remove("is-active");
  //      }
  //    }
  //  }
  //  Show_Hide_Selector("#views > section", id);
  //}

  //export function Handle_Tabs(tabSelector: string, containerSelector: string, id: string)
  //{
  //  Activate_Inactivate_Selector(tabSelector, "nav-" + id);
  //  Show_Hide_Selector(containerSelector, id);
  //}

  //export function Activate_Inactivate_Selector(selector: string, id: string)
  //{
  //  let sections = <NodeListOf<HTMLElement>>document.querySelectorAll(selector);
  //  if (sections.length > 0)
  //  {
  //    for (let i = 0; i < sections.length; i++)
  //    {
  //      let item = sections.item(i);
  //      if (item.id === id)
  //      {
  //        item.classList.add("is-active");
  //      }
  //      else
  //      {
  //        item.classList.remove("is-active");
  //      }
  //    }
  //  }
  //}

  export function Show_Hide_Selector(selector: string, id: string)
  {
    let sections = <NodeListOf<HTMLElement>>document.querySelectorAll(selector);
    if (sections.length > 0)
    {
      for (let i = 0; i < sections.length; i++)
      {
        let item = sections.item(i);
        if (item.id === id)
        {
          Show(item);
        }
        else
        {
          Hide(item);
        }
      }
    }
  }

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

  export function Get_Path(app_name: string = ""): string
  {
    if (app_name.length === 0) app_name = app_path;
    console.log('using app path ' + app_path);
    let path = "/";
    let i = window.location.pathname.toLowerCase().indexOf(app_name);
    if (i == 0)
    {
      path = app_name + "/";
    }
    return path;
  }

  export async function Get_Empty(url: string): Promise<string>
  {
    const response = await fetch(url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"//,"Upgrade-Insecure-Requests": "1"
        },
        cache: "no-cache",
        credentials: "include"
      }
    );
    if (!response.ok)
    {
      throw new Error(response.statusText);
    }
    return await response.text();
  }

  export async function Get<T>(url: string): Promise<T>
  {
    const response = await fetch(Get_Path() + url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"//,"Upgrade-Insecure-Requests": "1"
        },
        cache: "no-cache",
        credentials: "include"
      }
    );
    if (!response.ok)
    {
      throw new Error(response.statusText);
    }
    return await response.json();
  }

  export async function Post<T>(url: string, data: object): Promise<T>
  {
    const response = await fetch(Get_Path() + url,
      {
        method: "POST",
        body: JSON.stringify(data),
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

    if (!response.ok)
    {
      throw new Error(response.statusText)
    }
    return response.json();

  }

  export async function Post_Empty(url: string, data: object): Promise<Response>
  {
    const response = await fetch(url,
      {
        method: "POST",
        body: data !== null ? JSON.stringify(data) : "",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

    return response;
  }

  export function Format_Amount(amount: number): string
  {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  export function Format_Date(date: Date): string
  export function Format_Date(date: string): string
  export function Format_Date(date: any): string
  {
    if (date instanceof Date)
    {
      return date.toLocaleDateString('en-us');
    }
    var d = new Date(date);
    return d.toLocaleDateString('en-US');
  }

  export function Format_DateTime(date: Date): string
  export function Format_DateTime(date: string): string
  export function Format_DateTime(date: any): string
  {
    if (date instanceof Date)
    {
      return date.toLocaleString('en-us');
    }
    return new Date(date).toLocaleString('en-US');
  }

  export function Validate_Text(e: string, errorElementId: string, errorText: string): string
  export function Validate_Text(e: HTMLInputElement, errorElementId: string, errorText: string): string
  export function Validate_Text(e: HTMLSelectElement, errorElementId: string, errorText: string): string
  export function Validate_Text(e: HTMLElement, errorElementId: string, errorText: string): string
  export function Validate_Text(e: any, errorElementId: string, errorText: string): string
  {
    // this should only be used for required elements.
    if (typeof e == "string")
    {
      e = document.getElementById(e);
    }
    let ele = (<HTMLInputElement>e);
    ele.tagName.toLowerCase() === "select" && ele.parentElement !== null ? ele.parentElement.classList.remove("is-danger") : ele.classList.remove("is-danger");
    let v = Get_Value(ele).trim();
    if (v.length == 0)
    {
      ele.tagName.toLowerCase() === "select" && ele.parentElement !== null ? ele.parentElement.classList.add("is-danger") : ele.classList.add("is-danger");
      Error_Show(errorElementId, errorText);
      ele.focus();
      ele.scrollTo();
      return "";
    }
    return v;

  }

  export function Toggle_Loading_Button(e: string, disabled: boolean)
  export function Toggle_Loading_Button(e: HTMLButtonElement, disabled: boolean)
  export function Toggle_Loading_Button(e: any, disabled: boolean)
  {
    if (typeof e == "string")
    {
      e = document.getElementById(e);
    }
    let b = <HTMLButtonElement>e;
    b.disabled = disabled;
    b.classList.toggle("is-loading", disabled);
  }

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

  export function CreateTableCell(celltype: string, value: string, class_to_add: string, width: string = "", col_span: number = -1): HTMLTableCellElement
  {
    if (celltype !== "td" && celltype !== "th") celltype = "td";
    let cell = <HTMLTableCellElement>document.createElement(celltype);
    if (width.length > 0) cell.style.width = width;
    if (value.length > 0) cell.appendChild(document.createTextNode(value));
    if (class_to_add.length > 0) cell.classList.add(class_to_add);
    if (col_span > -1) cell.colSpan = col_span;
    return cell;
  }

}

export default Utilities;