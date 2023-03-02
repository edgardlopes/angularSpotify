export const environment = {
    production: false,
}

export const SpotifyConfiguration = {
    clientId: '70e7aca7ff7246f497352bd2b247dfae',
    authEndpoint: 'https://accounts.spotify.com/authorize',
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