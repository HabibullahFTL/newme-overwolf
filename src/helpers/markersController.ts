// Unique Array Generator
export const uniqueArray = (array: any[]) => {
  return array.filter(
    (item, index, array) => array.lastIndexOf(item) === index
  );
};

// Calculate latitude and longitude
interface Position {
  x: number;
  y: number;
}
export const calCulateLatLng = (position: Position) => {
  const xAdd: number = 8188,
    xDiv: number = 45.66,
    yAdd: number = -78.8,
    yDiv: number = 59.4,
    yM: number = 3.16 / 1000,
    yP: number = 8.16 / 10000000,
    yQ: number = 2.67 / 10000000000,
    yR: number = -2.39 / 100000000000000;

  return {
    lat:
      yAdd +
      yM * position.y +
      yP * position.y ** 2 +
      yQ * position.y ** 3 +
      yR * position.y ** 4,
    lng: (position.x - xAdd) / xDiv,
  };
};

// Making ChestsObj
export const chestsFormattedData = (chests: any) => {
  const keys = Object.keys(chests)?.map((item) => item?.split("_"));

  // ==== [Categories Part] ====
  // Categories array
  const tempCategories = [
    ...uniqueArray(keys?.map((item) => item[0])),
    "hasChild",
  ];

  // Categories object
  const categories: any = tempCategories?.reduce(
    (prevValue, currentValue) => ({
      ...prevValue,
      [currentValue]: [] as any,
    }),
    {}
  );

  // Assigning Sub Categories name [Tier name] into Categories
  tempCategories?.forEach((item) => {
    keys?.forEach((value) => {
      if (value[0] === item) {
        const arr = uniqueArray([
          ...categories[item],
          "Tier" + value.slice(-1)[0]?.slice(-1)[0],
        ]);
        categories[item] = arr as any;
      } else {
        categories[item] = [...categories[item], "hasChild"];
      }
    });
  });

  // Assigning Sub Categories Data into Tier objects
  tempCategories?.forEach((item) => {
    categories[item] = categories[item]?.reduce(
      (prevCategories: any, currentCategory: any) => {
        if (currentCategory == "hasChild") {
          return {
            ...prevCategories,
            [currentCategory]: true as any,
          };
        } else {
          // Making markers collection name
          const markerCollectionNames = keys
            ?.filter(
              (categoryArr) =>
                item == categoryArr[0] &&
                currentCategory.slice(-1)[0] ==
                  categoryArr.slice(-1)[0]?.slice(-1)[0]
            )
            ?.map((filteredArr) => filteredArr?.join("_"));

          const markerDataCollection = markerCollectionNames?.reduce(
            (prevCollections: any, currentCollection) => {
              const markerNames = Object.keys(chests[currentCollection]);
              const tempMarkersData = markerNames?.reduce(
                (prevNames: any, currentName) => {
                  const tempMarkerData = chests[currentCollection][currentName];
                  const singleMarkerData = calCulateLatLng({
                    y: tempMarkerData.y,
                    x: tempMarkerData.x,
                  });

                  return {
                    ...prevNames,
                    [currentName]: {
                      ...singleMarkerData,
                      icon: currentCollection,
                    },
                  };
                },
                {}
              );
              return {
                ...prevCollections,
                // [currentCollection]: chests[currentCollection] as any,
                [currentCollection]: {
                  ...tempMarkersData,
                  hasChild: true,
                } as any,
              };
            },
            {}
          );

          return {
            ...prevCategories,
            [currentCategory]: {
              ...markerDataCollection,
              hasChild: true,
            } as any,
          };
        }
      },
      {}
    );
  });

  return categories;
};
