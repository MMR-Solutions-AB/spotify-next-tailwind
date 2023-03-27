import React from 'react'

export default function index() {
    return (
        <div className='flex h-screen flex-col bg-red-500'>
            <div className='flex flex-1 bg-pink-500'>
                <aside className='w-full max-w-xs bg-orange-400'>sidebar</aside>
                <main className='flex-1 bg-blue-500'>main</main>
            </div>
            <footer className='h-[59px] bg-[#045f00]'>player</footer>
        </div>
    )
}
