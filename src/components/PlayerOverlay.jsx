import { ChevronDown } from 'react-feather'
import PlayerControls from './PlayerControls'

export default function PlayerOverlay({
    setPlayerOverlayIsOpen,
    playerOverlayIsOpen,
    track,
    player,
    isPaused,
    position,
}) {
    console.log(track)
    return (
        <div
            className='fixed top-0 h-screen w-screen bg-bg-dimmed transition-transform duration-300 md:hidden'
            style={{
                transform: `translateY(${playerOverlayIsOpen ? '0%' : '100%'})`,
            }}
        >
            <div
                className='fixed top-4 left-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-text-dimmed/20'
                onClick={() => setPlayerOverlayIsOpen(false)}
            >
                <ChevronDown />
            </div>
            <div className='absolute top-6 left-1/2 max-w-[30ch] -translate-x-1/2 truncate text-lg font-bold'>
                {track.album.name}
            </div>
            <div className='flex h-full flex-col gap-20 px-5 pt-36 pb-10'>
                <div className='mx-auto mb-5 aspect-square max-w-[500px] bg-red-500'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={track.album.images[0]?.url}
                        alt=''
                        className='h-full w-full'
                    />
                </div>
                <div>
                    <h2 className='text-lg font-bold'>{track.name}</h2>
                    <p className='text-text-dimmed'>{track.artists[0].name}</p>
                </div>
                <div className='mt-auto'>
                    {player && (
                        <PlayerControls
                            player={player}
                            isPaused={isPaused}
                            position={position}
                            track={track}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
