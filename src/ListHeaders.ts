export const AVLHeader = (isLoading: boolean, fetchData: Function) =>
{
  return {
    loading: isLoading,
    title: "AVL",
    title_description: "Search for text in the Device Id and Unit fields. Search for multiple items by separating with comma. Hit Enter to Search.",
    //search_type: "search_avl_data",
    fetchData: fetchData,
    view_name: "avl_view",
    //data_filter: data_filter,
    //special_filter: "avl_data_special_filter",
    header_filters: [
      {
        id: 0,
        label: "Show All",
        value: ""
      },
      {
        id: 1,
        label: "All Errors",
        value: "error"
      },
      {
        id: 2,
        label: "Unit",
        value: "unit"
      },
      {
        id: 3,
        label: "Date",
        value: "date"
      },
      {
        id: 4,
        label: "Location",
        value: "location"
      }
    ]
  };
}

export const FCHeader = (isLoading: boolean, fetchData: Function) =>
{
  return {
    loading: isLoading,
    title: "FC",
    title_description: "Search for text in the Device Id, Unit, and Asset Tag fields. Search for multiple items by separating with comma. Hit Enter to Search.",
    //search_type: "search_fc_data",
    fetchData: fetchData,
    view_name: "fc_view",
    //data_filter: data_filter,
    //special_filter: "fc_data_special_filter",
    header_filters: [
      {
        id: 0,
        label: "Show All",
        value: ""
      },
      {
        id: 1,
        label: "Errors",
        value: "error"
      },
      {
        id: 2,
        label: "Asset Tag",
        value: "asset_tag"
      },
      {
        id: 3,
        label: "Unit",
        value: "unit"
      },
      {
        id: 4,
        label: "Date",
        value: "date"
      },
      {
        id: 5,
        label: "Location",
        value: "location"
      }
    ]
  };
}

export const CADHeader = (isLoading: boolean, fetchData: Function) =>
{
  return {
    loading: isLoading,
    title: "CAD",
    title_description: "Search for text in the UnitCode field. Search for multiple items by separating with comma. Hit Enter to Search.",
    //search_type: "search_cad_data",
    fetchData: fetchData,
    view_name: "cad_view",
    //data_filter: data_filter,
    //special_filter: "cad_data_special_filter",
    header_filters: [
      {
        id: 0,
        label: "Show All",
        value: ""
      },
      {
        id: 1,
        label: "Errors",
        value: "error"
      },
      {
        id: 3,
        label: "Date",
        value: "date"
      },
      {
        id: 4,
        label: "Location",
        value: "location"
      }
    ]
  };
}

export const UnitHeader = (isLoading: boolean, fetchData: Function) =>
{
  return {
    loading: isLoading,
    title: "Unit",
    title_description: "Search for text in the Device Id, Unit, and Asset Tag fields. Search for multiple items by separating with comma.  Hit Enter to Search.",
    //search_type: "search_unit_data",
    fetchData: fetchData,
    view_name: 'unit_view',
    //data_filter: data_filter,
    //special_filter: "unit_data_special_filter",
    header_filters: [
      {
        id: 0,
        label: "Show All",
        value: ""
      },
      {
        id: 1,
        label: "Errors",
        value: "error"
      },
      {
        id: 2,
        label: "AVL",
        value: "avl"
      },
      {
        id: 3,
        label: "FC",
        value: "fc"
      },
      {
        id: 4,
        label: "CAD",
        value: "cad"
      }
    ]
  };
}
