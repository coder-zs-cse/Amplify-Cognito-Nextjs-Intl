import Links from "./Links"
import Image from 'next/image'
function navbar() {
  return (
    <div className="flex justify-between my-3 ">
        <div>
            <Image src="/logo.png" alt="logo" width={50} height={50} />
        </div>
        <div>
            <Links />
        </div>
    </div>
  )
}

export default navbar