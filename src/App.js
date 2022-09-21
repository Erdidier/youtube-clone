import React, { useContext } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { RecommendedVideos } from "./components/RecommendedVideos/RecommendedVideos";
import { Switch, Route } from "react-router-dom";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { VideoPage } from "./components/VideoPage/VideoPage";
import { VideosContext } from "./Context/VideosContext";
import { Subscription } from "./components/Subscription/Subscription";
import { ShortsPage } from "./components/ShortsPage/ShortsPage";
import { HistoryPage } from "./components/HistoryPage/HistoryPage";
import { TrendingPage } from "./components/TrendingPage/TrendingPage";
import { Library } from "./components/Library/Library";
import { YourVideos } from "./components/YourVideos/YourVideos";
import { WatchLater } from "./components/WatchLater/WatchLater";
import { LikedVideos } from "./components/LikedVideos/LikedVideos";

function App() {
  const { menu } = useContext(VideosContext);
  return (
    <div className="app">
      <Header />
      <div className="app_page">
        <Sidebar />
        <Switch>
          <Route
            path="/search/:searchTerm"
            render={({ match }) => {
              return <SearchPage searchTerm={match.params.searchTerm} />;
            }}
          />
          <Route
            path="/video/:videoId"
            render={({ match }) => {
              return <VideoPage videoId={match.params.videoId} />;
            }}
          />
          <Route path="/" exact component={RecommendedVideos} />
          <Route path="/trending" exact component={TrendingPage} />
          <Route path="/subscriptions" component={Subscription} />
          <Route path="/shorts" component={ShortsPage} />
          <Route path="/library" exact component={Library} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/your_videos" exact component={YourVideos} />
          <Route path="/watch_later" exact component={WatchLater} />
          <Route path="/liked_videos" exact component={LikedVideos} />
          {/* <Route path="/show_more" exact component={ShowMore} /> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
