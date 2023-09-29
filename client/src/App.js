// import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
    Album,
    Home,
    Login,
    Personal,
    Public,
    SearchAll,
    SearchSong,
    WeekRank,
    ZingChart,
    Search,
    Singer,
    SearchPlaylist,
} from './container/public';
import path from './ultis/path';
function App() {
    return (
        <div className="">
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.STAR} element={<Home />} />
                    <Route path={path.MY_MUSIC} element={<Personal />} />
                    <Route path={path.ALBUM_TITLE__PID} element={<Album />} />
                    <Route path={path.WEEKRANK__TILE_PID} element={<WeekRank />} />
                    <Route path={path.ZING__CHART} element={<ZingChart />} />
                    <Route path={path.HOME__SINGER} element={<Singer />} />
                    <Route path={path.HOME__ARTIST__SINGER} element={<Singer />} />
                    <Route path={path.SEARCH} element={<Search />}>
                        <Route path={path.ALL} element={<SearchAll />} />
                        <Route path={path.SONG} element={<SearchSong />} />
                        <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
