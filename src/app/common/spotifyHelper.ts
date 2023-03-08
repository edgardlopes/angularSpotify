import { Artist } from "../types/Artist";
import { Playlist } from "../types/Playlist";
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