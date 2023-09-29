import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import icons from '../ultis/icons';
import * as actions from '../store/action';
import { useDispatch, useSelector } from 'react-redux';

const { BsMusicNoteBeamed } = icons;

const ListSong = ({ songData, isHideAlum, isHideArtist, order, sm = 30, border }) => {
    const dispath = useDispatch();
    const { curSongId } = useSelector((state) => state.music);
    const [isActive, setIsActive] = useState(false);

    const handleDispath = () => {
        dispath(actions.setCurSongId(songData?.encodeId));
        dispath(actions.play(true));
        dispath(
            actions.setRecent({
                thumbnail: songData?.thumbnail,
                title: songData?.title?.length > 30 ? `${songData?.title?.slice(0, 30)}...` : songData?.title,
                sid: songData?.encodeId,
                artists: songData?.artistsNames,
            }),
        );
    };

    useEffect(() => {
        if (curSongId === songData?.encodeId) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

        console.log(isActive);
    }, [curSongId, songData]);
    return (
        <div
            className={`${
                isActive ? 'bg-[rgba(0,0,0,0.25)] rounded-md' : ''
            } flex justify-between items-center p-[10px] ${
                !border ? 'border-b border-[rgba(0,0,0,0.1)]' : ''
            } last-of-type:border-b hover:bg-[rgba(0,0,0,0.25)]
         hover:rounded-md cursor-pointer`}
            onClick={() => handleDispath()}
        >
            <div className={`flex items-center flex-1 ${order ? 'gap-2' : ''}`}>
                {order && (
                    <span
                        className={`mr-2 text-main-300 text-[32px] flex flex-none items-center justify-center w-[10%] text-2xl ${
                            order === 1
                                ? 'text-shawdow-no1'
                                : order === 2
                                ? 'text-shawdow-no2'
                                : order === 3
                                ? 'text-shawdow-no3'
                                : 'text-shawdow'
                        }`}
                    >
                        {order}
                    </span>
                )}
                {isHideAlum ? (
                    ''
                ) : (
                    <span className="mr-2">
                        <BsMusicNoteBeamed />
                    </span>
                )}
                <img src={songData?.thumbnail} alt="thumbnail" className="w-10 h-10 object-cover rounded-md" />
                <span className="flex flex-col ml-2">
                    <span className="text-sm font-semibold whitespace-nowrap">
                        {songData?.title?.length > sm ? `${songData?.title?.slice(0, sm)}...` : songData?.title}
                    </span>
                    <span className="whitespace-nowrap text-xs opacity-70">
                        {songData?.artistsNames?.length > 20
                            ? `${songData?.artistsNames?.slice(0, 20)}...`
                            : songData?.artistsNames}
                    </span>
                </span>
            </div>
            {isHideArtist ? (
                ''
            ) : (
                <div className="flex-1 flex items-center justify-center text-xs">
                    {songData?.album?.title?.length > 30
                        ? `${songData?.album?.title?.slice(0, 30)}...`
                        : songData?.album?.title}
                </div>
            )}
            <div className="flex-1 flex items-center justify-end text-xs opacity-70">
                {moment.utc(songData?.duration * 1000).format('HH:mm:ss')}
            </div>
        </div>
    );
};

export default memo(ListSong);
