export function arraysDeepEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        const elem1 = arr1[i];
        const elem2 = arr2[i];
        if (Array.isArray(elem1) && Array.isArray(elem2)) {
            if (!arraysDeepEqual(elem1, elem2)) {
                return false;
            }
        } else if (typeof elem1 === "object" && typeof elem2 === "object") {
            if (!objectsDeepEqual(elem1, elem2)) {
                return false;
            }
        } else if (elem1 !== elem2) {
            return false;
        }
    }
    return true;
}

export function objectsDeepEqual(obj1: object, obj2: object): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        // @ts-ignore
        const val1 = obj1[key];
        // @ts-ignore
        const val2 = obj2[key];
        if (Array.isArray(val1) && Array.isArray(val2)) {
            if (!arraysDeepEqual(val1, val2)) {
                return false;
            }
        } else if (typeof val1 === "object" && typeof val2 === "object") {
            if (!objectsDeepEqual(val1, val2)) {
                return false;
            }
        } else if (val1 !== val2) {
            return false;
        }
    }
    return true;
}

export function arrayMove(array: any[], oldIndex: number, newIndex: number) {
    const updatedArray = [...array];
    const [element] = updatedArray.splice(oldIndex, 1);

    // insert the element at the new position
    updatedArray.splice(newIndex, 0, element);
    return updatedArray;
}
