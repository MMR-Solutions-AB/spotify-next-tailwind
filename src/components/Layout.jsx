import Player from './Player'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
    return (
        <div className='flex h-screen flex-col'>
            <div className='flex flex-1 overflow-y-auto'>
                <Sidebar />
                <main className='flex-1 overflow-y-scroll'>{children}</main>
            </div>
            <Player />
        </div>
    )
}
