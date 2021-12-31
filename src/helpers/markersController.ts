const markerFormattedTitle = (title: string) => {
  if (title.includes("__") && title.includes("$")) {
    return title.split("__").join(" (").split("$").join(")");
  } else {
    return title.split("_").join(" ");
  }
};

// Icon Name generate
const iconNameGenerate = (data: any) => {
  const keys = Object.keys(data);
  const iconName = keys[0] ? data[keys[0]].icon : null;
  return iconName;
};

// Unique Array Generator
const uniqueArray = (array: any[]) => {
  return array.filter(
    (item, index, array) => array.lastIndexOf(item) === index
  );
};

// Calculate latitude and longitude
interface Position {
  x: number;
  y: number;
}
const calCulateLatLng = (position: Position) => {
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

// ============== [ Making Chests Object ] ================
const chestsFormattedData = (chests: any) => {
  const keys = Object.keys(chests)?.map((item) => item?.split("_"));

  // ==== [Categories Part] ====
  // Categories array
  const tempCategories = [
    ...uniqueArray(keys?.map((item) => item[0])),
    "hasChildCheckbox",
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
          "Tier_" + value.slice(-1)[0]?.slice(-1)[0],
        ]);
        categories[item] = arr.sort() as any;
      } else {
        categories[item] = [...categories[item], "hasChildCheckbox"];
      }
    });
  });

  // Assigning Sub Categories Data into Tier objects
  tempCategories?.forEach((item) => {
    categories[item] = categories[item]?.reduce(
      (prevCategories: any, currentCategory: any) => {
        if (currentCategory == "hasChildCheckbox") {
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
                  hasMarkers: true,
                } as any,
              };
            },
            {}
          );

          return {
            ...prevCategories,
            [currentCategory]: {
              ...markerDataCollection,
              hasChildCheckbox: true,
            } as any,
          };
        }
      },
      {}
    );
  });

  return categories;
};

// ============== [ Making Fishing Object ] ================
const fishingFormattedData = (fishing: any) => {
  const keys = Object.keys(fishing);

  // temporary categories
  const tempCategories = keys.map((item) => item.split("_").join("__") + "$");

  // Categories object
  const categories: any = tempCategories?.reduce(
    (prevValue, currentValue) => ({
      ...prevValue,
      [currentValue]: [] as any,
    }),
    {}
  );

  // Assigning markers name array into every category
  tempCategories.forEach((item) => {
    const filterKey = item?.split("__").join("_").split("$").join("");
    categories[item] = Object.keys(fishing[filterKey]);
  });

  // converting the markers name array to object
  tempCategories.forEach((item) => {
    const filterKey = item?.split("__").join("_").split("$").join("");
    categories[item] = categories[item]?.reduce(
      (prevValue: any, currentValue: any) => {
        const tempMarkerData = fishing[filterKey][currentValue];
        const singleMarkerData = calCulateLatLng({
          y: tempMarkerData.y,
          x: tempMarkerData.x,
        });
        return {
          ...prevValue,
          [currentValue]: {
            ...singleMarkerData,
            icon: filterKey,
          },
        };
      },
      {}
    );
  });

  return categories;
};

// ============== [ Making Monsters Object ] ================
const monstersFormattedData = (monsters: any) => {
  const keys = Object.keys(monsters);

  // Categories object
  const categories: any = keys?.reduce(
    (prevValue, currentValue) => ({
      ...prevValue,
      [currentValue]: [] as any,
    }),
    {}
  );

  // Assigning markers name array into every category
  keys.forEach((item) => {
    categories[item] = Object.keys(monsters[item]);
  });

  // converting the markers name array to object
  keys.forEach((item) => {
    categories[item] = categories[item]?.reduce(
      (prevValue: any, currentValue: any) => {
        const tempMarkerData = monsters[item][currentValue];
        const singleMarkerData = calCulateLatLng({
          y: tempMarkerData.y,
          x: tempMarkerData.x,
        });
        return {
          ...prevValue,
          [currentValue]: {
            ...singleMarkerData,
            icon: item,
          },
        };
      },
      {}
    );
  });

  return categories;
};

// ============== [ Making NPC Object ] ================
const npcFormattedData = (npc: any) => {
  const keys = Object.keys(npc);

  // Categories object
  const categories: any = keys?.reduce((prevValue, currentValue) => {
    return {
      ...prevValue,
      [currentValue]: [] as any,
    };
  }, {});

  // Assigning markers name array into every category
  keys.forEach((item) => {
    categories[item] = [...Object.keys(npc[item]), "hideCheckboxIcon"];
  });

  // converting the markers name array to object
  keys.forEach((item) => {
    categories[item] = categories[item]?.reduce(
      (prevValue: any, currentValue: any) => {
        if (currentValue != "hideCheckboxIcon") {
          const tempMarkerData = npc[item][currentValue];
          const singleMarkerData = calCulateLatLng({
            y: tempMarkerData.y,
            x: tempMarkerData.x,
          });
          return {
            ...prevValue,
            [currentValue]: {
              ...singleMarkerData,
              icon: tempMarkerData.icon,
              name: tempMarkerData.name,
            },
          };
        } else {
          return {
            ...prevValue,
            [currentValue]: true,
          };
        }
      },
      {}
    );
  });

  return categories;
};

export {
  markerFormattedTitle,
  uniqueArray,
  iconNameGenerate,
  calCulateLatLng,
  chestsFormattedData,
  fishingFormattedData,
  monstersFormattedData,
  npcFormattedData,
};
