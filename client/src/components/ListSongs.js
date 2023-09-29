import React, { memo } from 'react';
import ListSong from './ListSong';
import icons from '../ultis/icons';
import moment from 'moment';
import { useSelector } from 'react-redux';
const { TbArrowsSort, BsDot } = icons;
const ListSongs = ({ totaleDuration, isHideTitle }) => {
    const { songData } = useSelector((state) => state.music);
    return (
        <div className="w-full flex flex-col text-xs text-gray-600 ">
            <div className="flex justify-between items-center p-[10px] font-semibold">
                <span className={`${isHideTitle ? 'font-bold text-lg' : ''} flex`}>
                    {!isHideTitle && (
                        <span className="mr-2">
                            <TbArrowsSort />
                        </span>
                    )}
                    <span>BÀI HÁT</span>
                </span>
                {!isHideTitle && <span>ALBUM</span>}
                {!isHideTitle && <span>THỜI GIAN</span>}
            </div>
            <div className="flex flex-col">
                {songData?.map((item) => {
                    return <ListSong isHideAlum={isHideTitle} key={item?.encodeId} songData={item} />;
                })}
            </div>
            {totaleDuration && (
                <span className="flex items-center py-[10px] mt-2">
                    <span>{`${songData?.length} bài hát`}</span>
                    <BsDot size={24} />
                    <span>{moment.utc(totaleDuration * 1000).format('HH:mm:ss')}</span>
                </span>
            )}
        </div>
    );
};

export default memo(ListSongs);
