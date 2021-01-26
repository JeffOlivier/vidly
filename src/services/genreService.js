import httpService from "./httpService";
import { apiEndpoint } from "../config.json";

export function getGenres() {
    // const addedGenre = { _id: "123456", name: "Silly" };
//     const { data: genres } = await httpService.get(apiEndpoint + '/genres');
// console.log(genres);
//     const genres_new = [...genres,  { _id: "123456", name: "Silly" }];
// console.log(genres_new);

    //     const { data } = await fubar();
    //     const genres = [addedGenre, ...data];

    // return genres;

    return httpService.get(apiEndpoint + '/genres');
}
