import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    //_(items) --> puts our items array into a lodash format
    // _.slice(items, startIndex) --> slices our item array at the starting index
    // _.take() --> takes only the number of items we specify
    return _(items).slice(startIndex).take(pageSize).value();
}
