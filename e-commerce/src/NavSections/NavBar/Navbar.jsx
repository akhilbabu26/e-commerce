import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)  // <-- NEW STATE

  return (
    <div className="bg-white">

      {/* Mobile menu (Empty) */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative flex w-full max-w-xs flex-col bg-white pb-12 shadow-xl">
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-m-2 p-2 text-gray-400"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>

            <div className="px-4 pt-6">
              <p className="text-gray-500 text-sm">Menu is empty</p>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-emerald-400 px-4 text-sm font-medium text-white">
          Get up to 10% Discount
        </p>

        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">

              {/* Mobile open menu */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <Bars3Icon className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <img
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </a>
              </div>

              {/* RIGHT SIDE ICONS */}
              <div className="ml-auto flex items-center">

                {/* Search icon */}
                <div className="flex lg:ml-6">
                  <button
                    className="p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    <MagnifyingGlassIcon className="size-6" />
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button className="-m-2 flex items-center p-2">
                    <span className="ml-2 text-sm font-medium text-gray-700">CART</span>
                    <ShoppingBagIcon className="size-6 text-gray-400 hover:text-gray-500" />  
                  </button>
                </div>

              </div>
            </div>
          </div>
        </nav>

        {/* 🔎 SLIDE-DOWN SEARCH BAR */}
        {showSearch && (
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 sm:px-6 lg:px-8 animate-fadeIn">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        )}
      </header>
    </div>
  )
}