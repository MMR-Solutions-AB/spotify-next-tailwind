import Layout from '@/components/Layout'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { spotifyApi } from '../_app'

export default function Playlist() {
    const router = useRouter()

    const {
        data: playlist,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['playlists', router.query.id],
        queryFn: async () =>
            (await spotifyApi.getPlaylist(router.query.id)).body,
    })

    console.log(playlist)

    if (isLoading) return <Layout>loading...</Layout>

    if (isError) return <Layout>error...</Layout>

    return (
        <Layout>
            <div className='flex items-end gap-3 bg-gradient-to-b from-primary/60 to-bg-dimmed p-10'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={playlist.images[0]?.url}
                    alt='playlist image'
                    className='h-60 w-60 flex-shrink-0'
                />
                <div>
                    <p className='font-semibold text-text-dimmed'>Playlist</p>
                    <h2 className='text-6xl font-black'>{playlist.name}</h2>
                </div>
            </div>
            <div className='p-10'>
                <table className='w-full'>
                    <tbody>
                        {playlist.tracks.items.map((item, index) => (
                            <tr
                                key={item.id}
                                className='h-16 whitespace-nowrap text-sm text-text-dimmed hover:bg-text-dimmed/10'
                            >
                                <td className='pl-4 text-base'>{index + 1}</td>
                                <td>
                                    <div className='flex gap-4 overflow-hidden'>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={item.track.album.images[0].url}
                                            alt=''
                                            className='h-12 w-12'
                                        />
                                        <div>
                                            <h4 className='text-ellipsis text-text'>
                                                {item.track.name}
                                            </h4>
                                            <p>{item.track.artists[0].name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.track.album.name}</td>
                                <td className='pr-4'>
                                    {item.track.duration_ms}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
