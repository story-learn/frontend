interface ArryObj {
    [key: string | number]: any;
}

export const returnUniqueArrayObject = (arr: ArryObj[], id: keyof ArryObj) =>
    arr.filter(
        (item, index, array) =>
            array.findIndex((t) => t[id] === item[id]) === index
    );
