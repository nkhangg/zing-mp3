import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import 'moment/locale/vi';
import * as actions from '../store/action';
import { useDispatch, useSelector } from 'react-redux';

const SongItem = ({ thumbnail, title, artists, sid, releaseDate, order, persent, styles, size, active }) => {
    const dispatch = useDispatch();
    const { curSongId } = useSelector((state) => state.music);
    const [isActive, setisActive] = useState(active && false);

    useEffect(() => {
        if (curSongId === sid) {
            setisActive(true);
        } else {
            setisActive(false);
        }
    }, [curSongId, sid]);
    return (
        <div
            onClick={() => {
                dispatch(actions.setCurSongId(sid));
                dispatch(actions.play(true));
                dispatch(actions.setRecent({ thumbnail, title, sid, artists }));
            }}
            className={`${
                isActive && active ? 'bg-main-200' : ''
            } p-[10px] flex gap-[10px] hover:rounded-md rounded-md items-center justify-between ${
                styles || 'hover:bg-main-200'
            } cursor-pointer ${styles || 'text-black'} `}
        >
            <div className="flex gap-4">
                {order && (
                    <span
                        className={`m-auto text-main-600 text-[32px] text-2xl ${
                            order === 1 ? 'text-shawdow-no1' : order === 2 ? 'text-shawdow-no2' : 'text-shawdow-no3'
                        }`}
                    >
                        {order}
                    </span>
                )}
                <img
                    src={thumbnail}
                    alt="thumbnail"
                    className={`object-cover rounded-md ${size || 'w-[60px] h-[60px]'}`}
                />

                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold ">
                        {title?.length > 30 ? title.slice(0, 30) + '...' : title}
                    </span>
                    <span className="flex flex-col">
                        <span className="text-xs opacity-70">{artists}</span>
                        {releaseDate && (
                            <span className="text-xs text-gray-700">{moment.utc(releaseDate * 1000).fromNow()}</span>
                        )}
                    </span>
                </div>
            </div>
            {persent && <span className="font-bold">{persent}%</span>}
        </div>
    );
};

export default memo(SongItem);
