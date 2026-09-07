'use client'

import { useState } from 'react'

type Props = {
  bookingUrl: string
}

const today = () => new Date().toISOString().slice(0, 10)

const tomorrow = () => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toISOString().slice(0, 10)
}

export function BookingWidget({ bookingUrl }: Props) {
  const [checkIn, setCheckIn] = useState(today)
  const [checkOut, setCheckOut] = useState(tomorrow)

  const href = (() => {
    const url = new URL(bookingUrl)
    url.searchParams.set('checkInDate', checkIn)
    url.searchParams.set('checkOutDate', checkOut)
    url.searchParams.set('items[0][adults]', '2')
    url.searchParams.set('items[0][children]', '0')
    url.searchParams.set('items[0][infants]', '0')
    url.searchParams.set('currency', 'USD')
    return url.toString()
  })()

  return (
    <div className="w-full max-w-[27rem] border border-ivory/20 bg-forest/45 p-3 backdrop-blur-sm sm:p-4">
      <p className="border border-ivory/15 bg-ivory/10 px-4 py-3 text-center font-serif text-xl text-ivory sm:text-2xl">
        Make a reservation
      </p>
      <div className="mt-3 grid grid-cols-2 gap-px bg-ivory/15">
        <label className="bg-forest/55 px-3 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-ivory/80">
          Check in
          <input
            type="date"
            value={checkIn}
            min={today()}
            onChange={(event) => setCheckIn(event.target.value)}
            className="mt-2 block w-full bg-transparent text-center text-base font-semibold tracking-normal text-ivory outline-none [color-scheme:dark]"
          />
        </label>
        <label className="bg-forest/55 px-3 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-ivory/80">
          Check out
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(event) => setCheckOut(event.target.value)}
            className="mt-2 block w-full bg-transparent text-center text-base font-semibold tracking-normal text-ivory outline-none [color-scheme:dark]"
          />
        </label>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex min-h-14 items-center justify-center bg-ivory px-5 text-sm font-medium uppercase tracking-[0.28em] text-sage-dark transition-colors hover:bg-sage hover:text-forest"
      >
        Book now
      </a>
    </div>
  )
}