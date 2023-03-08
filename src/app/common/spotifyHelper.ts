import { addMilliseconds, format } from "date-fns";
import { Artist } from "../types/Artist";
import { Playlist } from "../types/Playlist";
import { Song } from "../types/Song";
import { User } from "../types/User";

export function ParseSpotifyUser(user: SpotifyApi.CurrentUsersProfileResponse): User {
    return {
        id: user.id,
        imageUrl: user?.images?.pop()?.url!,
        name: user?.display_name!
    }
}

export function parseSpotifyPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): Playlist {
    return {
        id: playlist.id,
        imageUrl: playlist.images.pop()?.url!,
        name: playlist.name,
    }
}

export function parseSpotifyArtist(artist: SpotifyApi.ArtistObjectFull): Artist {
    return {
        id: artist.id,
        imageUrl: artist.images[0]?.url!,
        name: artist.name
    }
}

export function parseSpotifyTrack(track: SpotifyApi.TrackObjectFull): Song {
    
    const msToMinutes = (ms: number) => {
        const date = addMilliseconds(new Date(0), ms)
        return format(date, 'mm:ss')
    }

    return {
        id: track.uri,
        album: {
            id: track.album.id,
            imageUrl: track.album.images[0].url,
            name: track.album.name
        },
        artists: track.artists.map(artist => ({id: artist.id, name: artist.name})),
        time: msToMinutes(track.duration_ms),
        title: track.name
    }
    
}