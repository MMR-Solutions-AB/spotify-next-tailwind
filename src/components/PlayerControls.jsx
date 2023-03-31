import { useEffect, useState } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'react-feather'
import { formatTime } from '@/utils/formatTime'
import { spotifyApi } from '@/pages/_app'

export default function PlayerControls({ player, isPaused, position, track }) {
    const [currentProgress, setCurrentProgress] = useState(position)
    const duration = track.duration_ms

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused && player) {
                setCurrentProgress((c) => parseFloat(c) + 1000)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [isPaused, player])

    useEffect(() => {
        setCurrentProgress(position)
    }, [position])

    return (
        <div>
            <div className='flex items-center justify-center gap-4'>
                <SkipBack
                    className='h-5 w-5 fill-white opacity-80 hover:opacity-100'
                    onClick={() => {
                        spotifyApi.skipToPrevious()
                    }}
                />
                <div
                    className='flex h-8 w-8 items-center justify-center rounded-full bg-text hover:scale-110'
                    onClick={() => {
                        if (isPaused) {
                            spotifyApi.play()
                        } else {
                            spotifyApi.pause()
                        }
                    }}
                >
                    {isPaused ? (
                        <Play className='ml-1 h-5 w-5 fill-black text-black' />
                    ) : (
                        <Pause className='h-5 w-5 fill-black text-black' />
                    )}
                </div>
                <SkipForward
                    className='h-5 w-5 fill-white opacity-80 hover:opacity-100'
                    onClick={() => {
                        spotifyApi.skipToNext()
                    }}
                />
            </div>
            <div className='mt-4 flex items-center justify-center gap-2 text-sm text-text-dimmed'>
                <p>{formatTime(currentProgress)}</p>
                <div className='group relative w-80'>
                    <label
                        htmlFor=''
                        className='relative block h-1 rounded-sm bg-text-dimmed/30'
                    >
                        <div className='h-full overflow-hidden rounded-sm'>
                            <div
                                className='h-full w-full rounded-sm bg-text group-hover:bg-primary'
                                style={{
                                    transform: `translateX(${
                                        -100 +
                                        (100 * currentProgress) / duration
                                    }%)`,
                                }}
                            ></div>
                        </div>
                        <div
                            className='absolute hidden h-3 w-3 rounded-full bg-text group-hover:block'
                            style={{
                                left: `${(100 * currentProgress) / duration}%`,
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        ></div>
                    </label>
                    <input
                        type='range'
                        min={0}
                        max={duration}
                        value={currentProgress}
                        onChange={(e) => setCurrentProgress(e.target.value)}
                        onMouseUp={() => {
                            spotifyApi.seek(currentProgress)
                        }}
                        className='absolute inset-0 opacity-0'
                    />
                </div>
                <p>{formatTime(duration)}</p>
            </div>
        </div>
    )
}
