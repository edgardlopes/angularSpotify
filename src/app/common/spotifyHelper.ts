import { User } from "../types/User";

export function ParseSpotifyUser(user: SpotifyApi.CurrentUsersProfileResponse): User {
    return {
        id: user.id,
        imageUrl: user?.images?.pop()?.url!,
        name: user?.display_name!
    }
}