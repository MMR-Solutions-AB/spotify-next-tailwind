import Link from 'next/link'
import { Home } from 'react-feather'
import { spotifyApi } from '@/pages/_app'
import { useQuery } from '@tanstack/react-query'

export default function Sidebar() {
    const {
        data: playlists,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['playlists'],
        queryFn: async () => (await spotifyApi.getUserPlaylists()).body.items,
    })

    function renderPlaylists() {
        if (isLoading)
            return Array(10)
                .fill(null)
                .map((_, i) => (
                    <div
                        key={i}
                        className='mb-1.5 h-6 animate-pulse rounded-full bg-neutral-800'
                        style={{
                            width: Math.floor(Math.random() * 40 + 40) + '%',
                        }}
                    ></div>
                ))

        if (isError) return 'error...'

        return playlists.map((playlist) => (
            <Link
                href={'/playlists/' + playlist.id}
                className='block py-1 text-text-dimmed transition-colors hover:text-text'
                key={playlist.id}
            >
                {playlist.name}
            </Link>
        ))
    }

    return (
        <aside className='w-full max-w-xs overflow-y-scroll bg-bg p-6 max-md:hidden'>
            <Link
                href='/'
                className='flex w-max items-center gap-4 text-text-dimmed transition-colors hover:text-text'
            >
                <Home className='h-6 w-6' />
                <p className='font-semibold'>Home</p>
            </Link>
            <hr className='my-3 border-text-dimmed/50' />
            <div className=''>{renderPlaylists()}</div>
        </aside>
    )
}
