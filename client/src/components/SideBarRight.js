import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import icons from '../ultis/icons';
import SongItem from './SongItem';
import * as apis from '../apis';
import Scrollbars from 'react-custom-scrollbars-2';

const { RiDeleteBin6Line } = icons;

const SideBarRight = () => {
    const [isRecent, setIsRecent] = useState(0);
    const [playlist, setPlaylist] = useState(null);

    const { curSongData, curAblumId, isPlaying, recentSongs, curSongId } = useSelector((state) => state.music);

    const fetDetailPlaylist = async () => {
        const responce = await apis.apiGetDetailPlaylist(curAblumId);
        if (responce?.data?.err === 0) {
            setPlaylist(responce.data.data.song.items);
        }
    };

    useEffect(() => {
        curAblumId && fetDetailPlaylist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (curAblumId && isPlaying) fetDetailPlaylist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curAblumId, isPlaying]);

    useEffect(() => {
        isPlaying && setIsRecent(0);
    }, [isPlaying, curSongId]);

    return (
        <div className="flex flex-col w-full text-xs">
            <div className="h-[70px] flex-none py-[14px] px-2 gap-4 flex items-center justify-between">
                <div className="flex flex-auto justify-center bg-main-200 rounded-r-full rounded-l-full p-[6px] cursor-pointer">
                    <span
                        onClick={() => setIsRecent(0)}
                        className={`py-[5px] ${
                            isRecent === 0 && 'bg-main-100'
                        } flex-1 flex justify-center items-center rounded-r-full rounded-l-full`}
                    >
                        Danh sách phát
                    </span>
                    <span
                        onClick={() => setIsRecent(1)}
                        className={`py-[5px]  ${
                            isRecent === 1 && 'bg-main-100'
                        } flex-1 flex justify-center items-center rounded-r-full rounded-l-full`}
                    >
                        Nghe gần đây
                    </span>
                </div>
                <span className="p-2 rounded-full cursor-pointer transition-colors duration-300 hover:bg-main-100">
                    <RiDeleteBin6Line size={14} />
                </span>
            </div>
            <Scrollbars autoHide style={{ width: '100%', height: '84%' }}>
                {isRecent === 0 ? (
                    <div className="w-full flex-col flex p-2">
                        <SongItem
                            size={'h-[40px] w-[40px]'}
                            key={curSongData?.encodeId}
                            title={curSongData?.title}
                            artists={curSongData?.artistsNames}
                            sid={curSongData?.encodeId}
                            thumbnail={curSongData?.thumbnail}
                            styles={'bg-main-500 text-white'}
                        />
                        <div className="text-black flex flex-col pt-[15px] px-2 pb-[5px]">
                            <span className="text-sm font-bold">Tiếp theo</span>
                            <span className="opacity-70 text-xs flex gap-1">
                                <span>Từ playlist</span>
                                <span className="font-semibold text-main-500">
                                    {curSongData?.album?.title?.length > 30
                                        ? curSongData?.album?.title?.slice(0, 30) + '...'
                                        : curSongData?.album?.title}
                                </span>
                            </span>
                        </div>
                        {playlist && (
                            <div className="flex flex-col gap-1">
                                {playlist?.map((item) => {
                                    return (
                                        <SongItem
                                            size={'h-[40px] w-[40px]'}
                                            key={item?.encodeId}
                                            title={item?.title}
                                            artists={item?.artistsNames}
                                            sid={item?.encodeId}
                                            thumbnail={item?.thumbnail}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full flex-col flex p-2">
                        {recentSongs && (
                            <div className="flex flex-col gap-1">
                                {recentSongs?.map((item, index) => {
                                    return (
                                        <SongItem
                                            size={'h-[40px] w-[40px]'}
                                            key={item?.sid + index}
                                            title={item?.title}
                                            artists={item?.artists}
                                            sid={item?.sid}
                                            thumbnail={item?.thumbnail}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </Scrollbars>
        </div>
    );
};

export default SideBarRight;
