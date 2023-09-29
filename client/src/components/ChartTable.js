import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { converArea } from '../ultis/fn';
import icons from '../ultis/icons';
import Button from './Button';
import ListSong from './ListSong';

const { BsPlayCircle } = icons;

const ChartTable = ({ title, data, link }) => {
    return (
        <div className="w-1/3 px-[14px] py-[20px] bg-main-200 rounded-lg flex flex-col gap-3">
            <div className="flex gap-2 items-center font-bold text-main-500">
                <h2 className="text-2xl pl-[40px]">{converArea(title)}</h2>
                <span className="">
                    <BsPlayCircle size={34} />
                </span>
            </div>

            <div className="flex flex-col">
                {data &&
                    data?.map((item, index) => {
                        return (
                            <ListSong
                                key={item.encodeId}
                                order={index + 1}
                                songData={item}
                                isHideAlum
                                isHideArtist={true}
                                sm={20}
                                border
                            />
                        );
                    })}
            </div>
            <Link to={link} className="flex items-center justify-center mt-4">
                <Button styles={' border-main-500 text-main-500'} text={'Xem Tất Cả'} />
            </Link>
        </div>
    );
};

export default ChartTable;
