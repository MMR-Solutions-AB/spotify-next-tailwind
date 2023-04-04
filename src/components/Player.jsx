import { useEffect, useState } from 'react'
import { spotifyApi } from '@/pages/_app'
import PlayerControls from './PlayerControls'
import PlayerVolume from './PlayerVolume'
import PlayerOverlay from './PlayerOverlay'

export default function Player() {
    const [device, setDevice] = useState(null)
    const [localPlayer, setLocalPlayer] = useState(null)
    const [track, setTrack] = useState(null)
    const [isPaused, setIsPaused] = useState(false)
    const [position, setPosition] = useState(null)
    const [playerOverlayIsOpen, setPlayerOverlayIsOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [repeat, setRepeat] = useState(0)

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

            player.addListener('ready', ({ device_id }) => {
                setDevice(device_id)
            })

            player.addListener('player_state_changed', (state) => {
                if (!state || !state.track_window?.current_track) {
                    return
                }

                setTrack(state.track_window.current_track)
                setIsPaused(state.paused)
                setPosition(state.position)
                setShuffle(state.shuffle)
                setRepeat(state.repeat_mode)

                player?.getCurrentState().then((state) => {
                    if (!state) {
                        setIsActive(false)
                    } else {
                        setIsActive(true)
                    }
                })
            })

            setLocalPlayer(player)
            player.connect()
        }
    }, [])

    useEffect(() => {
        if (!localPlayer) return
        localPlayer.connect()

        return () => {
            localPlayer.disconnect()
        }
    }, [localPlayer])

    useEffect(() => {
        const playback = async () => {
            if (device) {
                await spotifyApi.transferMyPlayback([device], true)
            }
            await spotifyApi.getMyDevices()
        }

        playback()
    }, [device, spotifyApi])

    if (!isActive || !track || !localPlayer)
        return <div>no player, please connect</div>

    return (
        <div>
            <div
                className='flex items-center p-4'
                onClick={() => {
                    setPlayerOverlayIsOpen(!playerOverlayIsOpen)
                }}
            >
                <div className='flex flex-1 items-center'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={track.album.images[0]?.url}
                        alt=''
                        className='mr-4 h-14 w-14 flex-shrink-0'
                    />
                    <div>
                        <h4 className='text-sm'>{track.name}</h4>
                        <p className='text-xs text-text-dimmed'>
                            {track.artists[0].name}
                        </p>
                    </div>
                </div>
                <div className='flex-1 text-center max-md:hidden'>
                    <PlayerControls
                        player={localPlayer}
                        isPaused={isPaused}
                        position={position}
                        track={track}
                        shuffle={shuffle}
                        repeat={repeat}
                    />
                </div>
                <div className='flex flex-1 justify-end max-md:hidden'>
                    <PlayerVolume player={localPlayer} />
                </div>
            </div>
            <PlayerOverlay
                setPlayerOverlayIsOpen={setPlayerOverlayIsOpen}
                playerOverlayIsOpen={playerOverlayIsOpen}
                track={track}
                player={localPlayer}
                isPaused={isPaused}
                position={position}
                shuffle={shuffle}
                repeat={repeat}
            />
        </div>
    )
}
