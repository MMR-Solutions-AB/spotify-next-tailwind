import { useEffect, useState } from 'react'
import { spotifyApi } from '@/pages/_app'

export default function Player() {
    const [device, setDevice] = useState(null)
    const [localPlayer, setLocalPlayer] = useState(null)
    const [track, setTrack] = useState(null)
    const [isPaused, setIsPaused] = useState(false)
    const [position, setPosition] = useState(null)

    useEffect(() => {
        const token = sessionStorage.getItem('spotify-key')
        const script = document.createElement('script')
        script.src = 'https://sdk.scdn.co/spotify-player.js'
        script.async = true
        document.body.appendChild(script)

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Techover player',
                getOAuthToken: (cb) => {
                    cb(token)
                },
                volume: 0.5,
            })

            console.log('player: ', player)

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with device_id: ', device_id)
                setDevice(device_id)
                setLocalPlayer(player)
            })

            player.addListener('player_state_changed', (state) => {
                if (!state || !state.track_window?.current_track) {
                    return
                }

                console.log('state changed: ', state)
                setTrack(state.track_window.current_track)
                setIsPaused(state.paused)
                setPosition(state.position)
            })

            player.connect()
        }
    }, [])

    useEffect(() => {
        async function getPlayback() {
            if (device) {
                await spotifyApi.transferMyPlayback([device], true)
            }
            await spotifyApi.getMyDevices()
        }

        getPlayback()
    }, [device])

    useEffect(() => {
        if (!localPlayer) return

        localPlayer.connect()

        return () => {
            localPlayer.disconnect()
        }
    }, [localPlayer])

    if (!localPlayer || !track) return <div>no player, please connect</div>

    return <div>player</div>
}
