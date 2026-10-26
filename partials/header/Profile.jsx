"use client"
import Image from "next/image"
import { useState } from "react";
import Dropdown from "./Dropdown";

const Profile = () => {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <div className="relative">
      <div onClick={() => setIsToggled(prev => !prev)} className="cursor-pointer">
        <Image
          src="/images/logo.png"
          alt="profile"
          width={50}
          height={50}
          className="h-12 w-12 rounded-lg object-cover cursor-pointer hover:rounded-2xl duration-100"
        />
      </div>

      {isToggled && <Dropdown />}
    </div>
  )
}

export default Profile