import React, { useEffect, useRef, useState } from 'react'
import {
    MdHomeFilled,
    MdOutlineSlowMotionVideo,
    MdSubscriptions,
    MdOutlineVideoLibrary,
    MdHistory,
    MdOutlineSmartDisplay,
    MdOutlineWatchLater,
    MdThumbUpOffAlt,
    MdSettings,
    MdOutlinedFlag,
    MdOutlineHelpOutline,
    MdOutlineFeedback,
    MdOutlineSportsVolleyball,
} from "react-icons/md"
import {TbMusic, TbDeviceGamepad2} from "react-icons/tb"
import {FaRegCompass} from "react-icons/fa"
import {GiFilmStrip, GiHamburgerMenu} from "react-icons/gi"
import { BsYoutube } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const mainLinks = [
    {
      icon: <MdHomeFilled className="text-xl" />,
      name: "Home",
    },
    {
      icon: <FaRegCompass className="text-xl" />,
      name: "Explore",
    },
    {
      icon: <MdOutlineSlowMotionVideo className="text-xl" />,
      name: "Shorts",
    },
    {
      icon: <MdSubscriptions className="text-xl" />,
      name: "Subscriptions",
    },
  ];

  const secondaryLinks = [
    {
      icon: <MdOutlineVideoLibrary className="text-xl" />,
      name: "Library",
    },
    {
      icon: <MdHistory className="text-xl" />,
      name: "History",
    },
    {
      icon: <MdOutlineSmartDisplay className="text-xl" />,
      name: "Your Videos",
    },
    {
      icon: <MdOutlineWatchLater className="text-xl" />,
      name: "Watch Later",
    },
    {
      icon: <MdThumbUpOffAlt className="text-xl" />,
      name: "Liked Videos",
    },
  ];

  const subscriptionLinks = [
    {
      icon: <TbMusic className="text-xl" />,
      name: "Music",
    },
    {
      icon: <MdOutlineSportsVolleyball className="text-xl" />,
      name: "Sport",
    },
    {
      icon: <TbDeviceGamepad2 className="text-xl" />,
      name: "Gaming",
    },
    {
      icon: <GiFilmStrip className="text-xl" />,
      name: "Films",
    },
  ];

  const helpLinks = [
    {
      icon: <MdSettings className="text-xl" />,
      name: "Settings",
    },
    {
      icon: <MdOutlinedFlag className="text-xl" />,
      name: "Report history",
    },
    {
      icon: <MdOutlineHelpOutline className="text-xl" />,
      name: "Help",
    },
    {
      icon: <MdOutlineFeedback className="text-xl" />,
      name: "Send feedback",
    },
  ];

  const textLinks = [
    [
      "About",
      "Press",
      "Copyright",
      "Contact us",
      "Creator",
      "Advertise",
      "Developers",
    ],
    [
      "Terms",
      "Privacy",
      "Policy & Safety",
      "How YouTube works",
      "Test new features",
    ],
  ];

  const [open, setOpen] = useState(false)

  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  function useOnClickOutside(ref:any , handler:any ) {
    useEffect(
        () => {
            const listener = (event:any) => {
                if (!ref.current || ref.current.contains(event.target)) {
                return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);

            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
      );
  }
    
  return (
    <div className="h-screen flex items-end justify-end px-4 pb-6">
      <div className="w-16 bg-zinc-950 pr-5 pb-8 sidebar pl-2 z-20 fixed top-0 left-0  h-screen">
        <ul className="flex flex-col">
          <li className="flex items-center pl-2 pt-2 text-xl">
            <div className="hover:bg-zinc-700 rounded-full cursor-pointer p-2" onClick={() => setOpen(!open)}>
                <GiHamburgerMenu className="text-white" />
            </div>
          </li>
        </ul>
          <ul className="flex flex-col mt-5">
              {mainLinks.map(({icon,name}) => (
                <li key={name} className={`flex justify-center pl-2`}>
                  <a href="#" className={`flex flex-col items-center justify-center align-middle p-3 m-1 hover:bg-zinc-700 hover:rounded-lg rounded-lg ${name == "Home" ? `bg-zinc-700` : ``}`}>
                    <div>
                    {icon}
                    </div>
                    <p className="text-[10px]/[1rem]">{name}</p>
                  </a>
                </li>
              ))}
          </ul>
      </div>
      
      <div className={`w-60 bg-zinc-950 pr-5 pb-8 sidebar overflow-hidden hover:overflow-y-visible pl-2 z-20 fixed top-0 -left-96  h-screen shadow-2xl ${open ? `left-0` : ``} ease-out duration-300`} ref={ref}>
        <ul className="flex">
          <li className="flex items-center gap-3 pl-4 pt-2 text-xl">
            <div className="hover:bg-zinc-700 rounded-full cursor-pointer p-2" onClick={() => setOpen(!open)}>
                <GiHamburgerMenu className="text-white"/>
            </div>
            <Link to="/">
                <div className="flex gap-1 items-center justify-center">
                    <BsYoutube className="text-3xl text-red-600"/>
                    <span className="text-xl font-bold text-white">Youtube</span>
                </div>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col border-b-2 border-gray-700 mt-5">
            {mainLinks.map(({icon,name}) => (
              <li key={name} className={`pl-6 py-3 hover:bg-zinc-700 hover:rounded-lg rounded-lg ${name == "Home" ? `bg-zinc-700` : ``}`}>
                <a href="#" className="flex items-center gap-5">{icon}
                  <span className="text-sm tracking-wider">
                    {name}
                  </span>
                </a>
              </li>
            ))}
        </ul>
        <ul className="flex flex-col border-b-2 border-gray-700">
            {secondaryLinks.map(({icon,name}) => (
              <li key={name} className={`pl-6 py-3 hover:rounded-lg rounded-lg hover:bg-zinc-700`}>
                <a href="#" className="flex items-center gap-5">{icon}
                  <span className="text-sm tracking-wider">
                    {name}
                  </span>
                </a>
              </li>
            ))}
        </ul>
        <ul className="flex flex-col border-b-2 border-gray-700">
          <li className="pl-6 pt-3">Explore</li>
            {subscriptionLinks.map(({icon,name}) => (
              <li key={name} className={`pl-6 py-3 hover:rounded-lg rounded-lg hover:bg-zinc-700`}>
                <a href="#" className="flex items-center gap-5">{icon}
                  <span className="text-sm tracking-wider">
                    {name}
                  </span>
                </a>
              </li>
            ))}
        </ul>
        <ul className="flex flex-col border-b-2 border-gray-700">
            {helpLinks.map(({icon,name}) => (
              <li key={name} className={`pl-6 py-3 hover:rounded-lg rounded-lg hover:bg-zinc-700`}>
                <a href="#" className="flex items-center gap-5">{icon}
                  <span className="text-sm tracking-wider">
                    {name}
                  </span>
                </a>
              </li>
            ))}
        </ul>
        <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400 font-bold">
          {textLinks[0].map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400 font-bold">
          {textLinks[1].map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <span className="px-4 text-sm text-zinc-400">&copy; 2023 Google</span>
        <br />
        <p className="px-4 pt-3 text-sm text-zinc-400">
          This Clone for portfolio purpose
        </p>
      </div>

      {open && <div className={`z-10 fixed top-0 left-0 w-screen h-screen bg-zinc-950 bg-opacity-80 opacity-0 ${open ? `opacity-100 transition` : ``} duration-300`}></div>}
    </div>
  )
}

