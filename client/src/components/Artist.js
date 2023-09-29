import React from 'react';
import { Link } from 'react-router-dom';
import { handleNumber } from '../ultis/fn';
import icons from '../ultis/icons';

const { AiOutlineUserAdd } = icons;

const Artist = ({ image, title, follower, link, styles }) => {
    return (
        <div className={`flex flex-col gap-[15px] ${styles ? styles : 'w-1/5'}`}>
            <Link to={link} className="overflow-hidden  rounded-full">
                <img
                    className="w-full object-contain rounded-full hover:scale-110 transition-all duration-500"
                    src={image}
                    alt="img"
                />
            </Link>
            <div className="flex gap-1 flex-col items-center">
                <Link className="text-sm font-medium hover:underline hover:text-main-500 cursor-pointer">{title}</Link>
                <span>{`${handleNumber(+follower)} quan tâm`}</span>
                <button
                    type="button"
                    className="bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1"
                >
                    <span>
                        <AiOutlineUserAdd />
                    </span>
                    <span className="text-xs opacity-70">Quan Tâm</span>
                </button>
            </div>
        </div>
    );
};

export default Artist;
