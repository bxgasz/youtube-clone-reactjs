import React, {useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getHomePageVideos } from '../store/reducer/HomeVideos';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner';
import { HomePageVideos } from '../Type';
import Card from '../components/Card';
import { clearVideos } from '../store';
import { useNavigate } from 'react-router-dom';
import { getSearchPageVideos } from '../store/reducer/SearchPageVideos';
import SearchCard from '../components/SearchCard';

export default function Search() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.lunaticApp.videos)
  const searchTerm = useAppSelector((state) => state.lunaticApp.searchTerm)

  useEffect(() => {
    dispatch(clearVideos)
    if (searchTerm === "") {
      navigate("/")
    }else {
      dispatch(getSearchPageVideos(false))
    }
  },[dispatch,searchTerm,navigate])
  
  return (
    <div>
        <div className="max-h-screen overflow-hidden">
          <div className="flex absolute h-screen top-0">
            <Sidebar />
          </div>
          <div>
            <Navbar/>
          </div>
          <div className={`flex ${videos.length ? 'fixed left-10' : ''}`}>
          {videos.length ? <InfiniteScroll dataLength={videos.length} next={() => dispatch(getSearchPageVideos(true))} hasMore={videos.length < 500} loader={<Spinner/>} height={600}>
              <div className="flex py-8 pl-8 flex-col gap-5 w-full">
                {videos.map((item:HomePageVideos) => (
                  <SearchCard data={item} key={item.videoId} />
                ))}
              </div>
            </InfiniteScroll> : <div className="absolute left-1/2 top-1/2"><Spinner/></div>}
          </div>
        </div>
    </div>
  )
}
