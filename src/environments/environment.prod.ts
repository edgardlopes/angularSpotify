export const environment = {
    production: true,
}

export const SpotifyConfiguration = {
    clientId: '70e7aca7ff7246f497352bd2b247dfae',
    authEndpoint: 'https://accounts.spotify.con/authorize',
    redirectUrl: 'http://localhost:4200/login/',
    scopes: [
        'user-read-currently-playing',
        'user-read-recently-played',
        'user-read-playback-state',
        'user-top-read',
        'user-modify-playback-state',
        'user-library-read',
        'playlist-read-private',
        'playlist-read-collaborative',
    ]
}