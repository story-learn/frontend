interface ArryObj {
    [key: string | number]: any;
}

/**
 * @param {Array} arr array of objects to filter
 * @param {string | number} id key to filter array
 * @returns unique array of objects
 * @example returnUniqueArrayObject(
     [
         {age: 2, name: "Ble"},
         {age: 3, name: "David"},
         {age: 2, name: "Jongbo"},
         {age: 2, name: "Ble"}
    ],
    "age"
    )
 */

export const returnUniqueArrayObject = (arr: ArryObj[], id: keyof ArryObj) =>
    arr.filter(
        (item, index, array) =>
            array.findIndex((t) => t[id] === item[id]) === index
    );
