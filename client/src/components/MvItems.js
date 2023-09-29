import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import icons from '../ultis/icons';

const { BsPlayCircle } = icons;

const MvItems = ({ image, duration, arvartar, title, name, link }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className="flex flex-col gap-3">
            <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="rounded-lg overflow-hidden relative cursor-pointer"
            >
                {isHover && (
                    <div className="absolute inset-0 bg-overlay-30 z-20 flex items-center justify-center text-white">
                        <BsPlayCircle size={45} />
                    </div>
                )}
                <img
                    className={`w-full object-cover transition-all duration-300 ${isHover ? 'scale-110' : 'scale-100'}`}
                    src={image}
                    alt="mv"
                />
                <span className="absolute bottom-3 right-4 text-white font-[500] block bg-[rgba(0,0,0,0.5)] px-2 text-sm py-[2px] rounded-md z-20">
                    {moment(duration * 1000).format('HH:ss')}
                </span>
            </div>

            <div className="flex items-center gap-3">
                <Link to={link} className="rounded-full overflow-hidden h-[40px] w-[40px]">
                    <img src={arvartar} alt="arvartar" className="object-cover h-[40px] w-[40px]" />
                </Link>
                <div className="flex flex-col cursor-pointer">
                    <span className="block whitespace-nowrap overflow-hidden text-sm font-bold hover:text-main-500">
                        {title}
                    </span>
                    <span className="text-xs hover:underline hover:text-main-500">{name}</span>
                </div>
            </div>
        </div>
    );
};

export default MvItems;
