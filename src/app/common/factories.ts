import { Artist } from "../types/Artist";
import { Song } from "../types/Song";

export function newArtist(): Artist {
    return {
        id: '',
        imageUrl: '',
        name: ''
    }
}

export function newSong(): Song {
    return {
        id: '',
        album: {
            id: '',
            imageUrl: '',
            name: ''
        },
        artists: [],
        time: '',
        title: ''
    }
}