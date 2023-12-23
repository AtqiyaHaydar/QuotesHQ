"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

import { Button } from "./ui/button"

import Furina from '@public/FurinaIcon.svg'

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, [])
  
  return (
    <nav className="w-full justify-between mb-16 px-12 py-4 fixed z-20 flex">
      <Link href="/" className="flex gap-x-6 items-center">
        <Image 
          src={Furina}
          alt="Logo QuotesHQ"
          height={30}
          width={30}
          className="object-contain"
        />
        <p className="font-bold text-[18px] text-white hover:scale-110 transition-all">QuotesHQ.</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        {session?.user ? (
          <div className="flex gap-x-4">
            <Link href="/create-quote">
              <Button className="rounded-full hover:text-white hover:bg-transparent hover:border-2 hover:border-white hover:scale-105 transition-all" variant="outline">
                Create Quote
              </Button>
            </Link>

            <Button 
              onClick={signOut} 
              className="rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all"
            >
              Sign Out
            </Button>

            <Link href="/profile" className="hover:scale-105 transition-all">
              <Image 
                src={session?.user.image}
                width={40}
                height={40}
                className="rounded-full "
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="rounded-full"
                >
                  Sign In
                </Button>
              ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex relative">
        {session?.user ? (
          <div className="flex items-end">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-quote'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Quote
                </Link>
                <Button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full'
                  variant='destructive'
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div>
          
          </div>
        )}
      </div>

    </nav>
  )
}

export default Nav