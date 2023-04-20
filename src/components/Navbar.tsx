import React, { useEffect, useRef, useState } from 'react'
import {AiOutlineSearch, AiOutlineClose} from "react-icons/ai"
import {TiMicrophone} from "react-icons/ti"
import {BsYoutube, BsCameraVideo, BsBell} from "react-icons/bs"
import {GiHamburgerMenu} from "react-icons/gi"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearVideos, changeSearchTerm, clearSearchTerm } from '../store'
import { getSearchPageVideos } from '../store/reducer/SearchPageVideos'

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector((state) => state.lunaticApp.searchTerm);
    const handleSearch = () => {
        if(location.pathname !== "/search") navigate("/search");
        else{
            dispatch(clearVideos())
            dispatch(getSearchPageVideos(false))
        }
    }

  const ref = useRef<HTMLDivElement>(null);
  const inputRef =  useRef<any>(null)

  const [isSearchClick, setSearchClick] = useState(false);

  useOnClickOutside(ref, () => setSearchClick(false));

  return (
    <div className="flex justify-between items-center px-6 h-14 bg-zinc-950 opacity-95 sticky top-0 x-50">
        <div className="flex gap-4 items-center text-2xl">
            <div className="hover:bg-zinc-700 rounded-full cursor-pointer p-2">
                <GiHamburgerMenu className="text-white" />
            </div>
            <Link to="/">
                <div className="flex gap-1 items-center justify-center">
                    <BsYoutube className="text-3xl text-red-600"/>
                    <span className="text-xl font-bold text-white">Youtube</span>
                </div>
            </Link>
        </div>
        <div className="flex items-center justify-center">
            <form action="" onSubmit={e => {
                e.preventDefault();
                handleSearch()
            }}>
                <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-full border-solid border border-zinc-800">
                    <div className="flex gap-4 items-center pr-5" ref={ref}>
                        <div>
                            <AiOutlineSearch className={`text-xl ${isSearchClick == true ? `block` : `hidden`}`}/>
                        </div>
                        <input type="text" className="w-96 bg-zinc-900 focus:outline-none border-none" value={searchTerm} onChange={e=>dispatch(changeSearchTerm(e.target.value))} onFocus={() => setSearchClick(true)} placeholder='Search' ref={inputRef}/>
                        <AiOutlineClose className={`text-md cursor-pointer font-bold ${!searchTerm ? "invisible" : "visible"}`} onClick={() => dispatch(clearSearchTerm())}/>
                    </div>
                    <button className="h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-full">
                        <AiOutlineSearch className="text-xl"/>
                    </button>
                </div>
            </form>
            <div className="text-xl p-3 bg-zinc-900 rounded-full m-3">
                <TiMicrophone />
            </div>
        </div>
        <div className="flex gap-5 items-center text-xl">
            <BsCameraVideo/>
            <div className="relative">
                <BsBell/>
                <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
                    10+
                </span>
            </div>
            <img src="https://i.pinimg.com/originals/a2/de/88/a2de88af4463418c396ac4b822781046.jpg" alt="logo" className="w-9 h-9 rounded-full" />
        </div>
    </div>
  )
}

function useOnClickOutside(ref : any, handler : any) {
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
