import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../ultis/icons';

const { BsPlayCircle, AiFillHeart, BsThreeDots } = icons;

const SectionItem = ({ link, thumbnailM, title, artistsNames, sortDescription, styles }) => {
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();

    const handleHover = () => {
        setIsHover(true);
    };
    const handleLeave = () => {
        setIsHover(false);
    };

    const handleNavigate = (flag, e) => {
        e.stopPropagation();
        const albumPath = link?.split('.')[0];
        if (!albumPath.includes('/album') && albumPath.includes('/playlist')) {
            navigate(albumPath.replace('playlist', 'album'), { state: { playAlbum: flag } });
        } else {
            navigate(albumPath, { state: { playAlbum: flag } });
        }
    };
    return (
        <div
            className={`flex flex-col gap-3 text-sm cursor-pointer ${!styles ? 'w-1/5' : styles}`}
            onClick={(e) => handleNavigate(false, e)}
        >
            <div
                onMouseEnter={() => handleHover()}
                onMouseLeave={() => handleLeave()}
                className="relative w-full overflow-hidden rounded-lg"
            >
                {isHover && (
                    <div
                        className={`absolute top-0 left-0 z-10 right-0 bottom-0 bg-overlay-30 rounded-lg text-white flex items-center justify-center gap-4`}
                    >
                        <span>
                            <AiFillHeart size={25} />
                        </span>
                        <span onClick={(e) => handleNavigate(true, e)}>
                            <BsPlayCircle size={35} />
                        </span>
                        <span>
                            <BsThreeDots size={25} />
                        </span>
                    </div>
                )}
                <img
                    src={thumbnailM}
                    alt="avatar"
                    className={`w-full h-auto rounded-lg ${
                        isHover ? 'animate-main-hover-on' : 'animate-main-hover-leave'
                    }`}
                />
            </div>
            <div className="flex flex-col">
                <span className="font-semibold ">{title}</span>
                {!artistsNames && (
                    <span>
                        {sortDescription?.length >= 60 ? `${sortDescription?.slice(0, 60)}...` : sortDescription}
                    </span>
                )}

                {artistsNames && (
                    <span className="hover:text-main-500 decoration-main-500 hover:underline">{artistsNames}</span>
                )}
            </div>
        </div>
    );
};

export default memo(SectionItem);
