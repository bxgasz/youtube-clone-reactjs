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

export default function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.lunaticApp.videos)

  useEffect(() => {
    return () => {
      dispatch(clearVideos())
    }
  },[dispatch])

  useEffect(() => {
    dispatch(getHomePageVideos(false))
    console.log(videos)
  }, [dispatch])
  
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
          {videos.length ? <InfiniteScroll dataLength={videos.length} next={() => dispatch(getHomePageVideos(true))} hasMore={videos.length < 500} loader={<Spinner/>} height={650}>
              <div className="grid gap-y-14 gap-x-8 grid-cols-3 p-8">
                {videos.map((item:HomePageVideos) => (
                  <Card data={item} key={item.videoId} />
                ))}
              </div>
            </InfiniteScroll> : <div className="absolute left-1/2 top-1/2"><Spinner/></div>}
          </div>
        </div>
    </div>
  )
}
