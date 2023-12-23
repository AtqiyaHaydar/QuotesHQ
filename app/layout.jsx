import '@styles/globals.css'

import { cn } from '@lib/utils'

import Image from 'next/image'

import { Toaster } from '@components/ui/toaster'

import Nav from '@components/Nav'
import Provider from '@components/Provider'
import Footer from '@components/Footer'

import Background from '@public/BG2.jpg'

export const metadata = {
  title: 'QuotesHQ',
  description: 'QuotesHQ is a dedicated platform designed for individuals to discover and share inspirational, motivational, and wise quotes sourced directly from books.',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Image 
            className="w-100vw h-[100vh] fixed z-[-1] top-0 left-0 object-cover"
            src={Background}
            alt="Background QuotesHQ"
          />
          <main className='font-satoshi scrollbar-hide'>
            <Nav />
            <div className='pt-32 pb-16'>
              { children }
            </div>
            <Footer />
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout