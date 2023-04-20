import React,{useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getVideoDetails } from '../store/reducer/VideoDetails'
import { getReccomendationVideos } from '../store/reducer/ReccomendedVideos'
import Details from '../components/Details'
import Navbar from '../components/Navbar'
import { BiLike, BiDislike } from "react-icons/bi";
import { HiScissors } from "react-icons/hi";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

export default function Watch() {
  const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false)
  const {id} = useParams()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPlaying = useAppSelector((state)=>state.lunaticApp.currentPlaying)
  const recommendedVideos = useAppSelector((state) => state.lunaticApp.recommendedVideos)

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id))
      setShowMoreStatus(false)
    }else{
      navigate("/")
    }
  },[id,navigate,dispatch])

  useEffect(() => {
    if(currentPlaying && id) dispatch(getReccomendationVideos(id))
  },[currentPlaying, dispatch, id])

  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="max-h-screen overflow-hidden">
          <div style={{ height: "7.5vh" }}>
            <Navbar />
          </div>
          <div className="flex w-full" style={{ height: "92.5vh" }}>
            <div className="flex gap-y-10 gap-x-5 p-7 mx-5 mr-0 w-full overflow-auto">
              <div style={{ maxWidth: "800px" }}>
                <div>
                  <iframe
                    width="800"
                    height="502"
                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="mt-5">
                    <p className="text-xl">{currentPlaying.videoTitle}</p>
                    <div className="flex justify-between mt-1">
                      <div className="text-sm text-gray-400">
                        <div className="flex items-center gap-5 mr-5 mt-4">
                          <div>
                            <img
                              src={currentPlaying.channelInfo.image}
                              alt=""
                              className="rounded-full h-12 w-12"
                            />
                          </div>
                          <div className="w-4/6">
                            <h5 className="text-sm">
                              <strong>{currentPlaying.channelInfo.name}</strong>
                            </h5>
                            <h6 className="text-gray-400 text-xs">
                              {currentPlaying.channelInfo.subscribers} subscribers
                            </h6>
                          </div>
                          {/* <div>
                            <button className="uppercase bg-red-600 rounded-sm p-2 text-sm tracking-wider">
                              subscribe
                            </button>
                          </div> */}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 uppercase">
                        <div className="flex items-center gap-1 cursor-pointer bg-white text-zinc-950 rounded-full p-2">
                          <p className="text-sm font-semibold">Subscribe</p>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer bg-zinc-700 rounded-full p-2">
                          <BiLike className="text-md" />
                          <p className="text-sm font-semibold">{currentPlaying.videoLikes}</p>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer bg-zinc-700 rounded-full p-2">
                          <BiDislike className="text-md" />
                          <p className="text-sm font-semibold">dislike</p>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer bg-zinc-700 rounded-full p-2">
                          <FaShare className="text-md" />
                          <p className="text-sm font-semibold">share</p>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer bg-zinc-700 rounded-full p-2">
                          <HiScissors className="text-md" />
                          <p className="text-sm font-semibold">clip</p>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer bg-zinc-700 rounded-full p-2">
                          <BsThreeDots className="text-md" />
                        </div>
                      </div>
                    </div>
                    <div className={`flex gap-4 flex-col bg-zinc-800 hover:bg-zinc-700 my-5 p-3 rounded-xl ${showMoreStatus ? "bg-zinc-800" : ''}`}>
                      <div className="flex items-center">
                      <span className="items-center after:content-['•'] after:mx-1">
                          {currentPlaying.videoViews} views
                        </span>
                        <span> {currentPlaying.videoAge} ago</span>
                      </div>
                      <div
                        className={`${
                          !showMoreStatus ? "max-h-16 overflow-hidden line-clamp-2" : ""
                        } text-sm w-11/12`}
                      >
                        <pre
                          style={{
                            fontFamily: `"Roboto", sans-serif`,
                          }}
                          className="whitespace-pre-wrap"
                        >
                          {currentPlaying.videoDescription}
                        </pre>
                      </div>
                      <div>
                        <button
                          className="uppercase text-sm cursor-pointer font-bold"
                          onClick={() => setShowMoreStatus(!showMoreStatus)}
                        >
                          Show {showMoreStatus ? "less" : "more"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {getReccomendationVideos.length &&
                  recommendedVideos?.map((item) => {
                    return <Details data={item} key={item.videoId} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
