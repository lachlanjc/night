import { useEffect, useState } from 'react'
import tt from 'tinytime'
import { LightningTime } from '@purduehackers/time'
import EmojiMarquee from './emoji-marquee'

const Time = () => {
  const [time, setTime] = useState('')
  const [lightningTime, setLightningTime] = useState('')
  const [dateObj, setDateObj] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setDateObj(now)

      const lt = new LightningTime()
      setLightningTime(lt.convertToLightning(now).lightningString)

      const formattedTime = tt('{h}:{mm} {a}').render(now)
      setTime(formattedTime)
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-rows-3 items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center">
        <EmojiMarquee />
        <h1 className="text-5xl font-bold">
          <img src="/ph-logo-cropped.png" className="inline-block h-[3.5rem]" />{' '}
          Hack Night 🌙
        </h1>
        <div className="flex flex-row gap-x-2">
          <h1 className="text-gray-300 text-3xl font-bold">0.4</h1>
          <div className="flex flex-col justify-center">
            <div className="bg-amber-400 text-black rounded px-1">
              <p className="text-sm font-bold">beta</p>
            </div>
          </div>
        </div>
        <EmojiMarquee />
      </div>
      <div className="flex flex-col items-center justify-center font-mono">
        <h1
          className={`${
            dateObj.getHours() > 21 ||
            dateObj.getHours() === 0 ||
            dateObj.getHours() === 12
              ? 'text-[7vw]'
              : 'text-[8vw]'
          } font-bold underline underline-offset-[12px] text-amber-300 decoration-white decoration-dotted decoration-8`}
        >
          {lightningTime}
        </h1>
        <p className="font-bold text-xl">({time})</p>
      </div>
    </div>
  )
}

export default Time
