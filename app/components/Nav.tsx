'use client';

import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Cart from './Cart';
import { useCartStore } from '@/store';
import { AiFillShopping } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import DarkLight from './DarkLight';

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();

  return (
    <nav className="flex justify-between items-center py-12">
      <Link href={'/'}>
        <h1>styled</h1>
      </Link>
      <ul className="flex items-center gap-8">
        {/* Toggle the cart */}
        <li
          onClick={() => cartStore.toggleCart()}
          className="flex items-center text-3xl relative cursor-pointer"
        >
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* {Dark Mode} */}
        <DarkLight />
        {/* if the user is not signed in */}
        {!user && (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {/* if the user IS signed in */}
        {user && (
          <li>
            <div className="dropdown dropdown-end cursor-pointer">
              <Image
                src={user?.image as string}
                alt={user.name as string}
                width={36}
                height={36}
                className="rounded-full"
                tabIndex={0}
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-72"
              >
                <Link
                  className="hover:bg-base-300 p-4 rounded-md"
                  href={'/dashboard'}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                >
                  Orders
                </Link>
                <li
                  onClick={() => {
                    signOut({
                      redirect: true,
                      callbackUrl: process.env.NEXT_PUBLIC_URL,
                    });
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                  className="hover:bg-base-300 p-4 rounded-md"
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
