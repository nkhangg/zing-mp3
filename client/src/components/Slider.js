import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../store/action';
import icons from '../ultis/icons';

const { GrNext, GrPrevious } = icons;

const Slider = () => {
    const { banner } = useSelector((state) => state.app);
    const dispath = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            const sliderEls = document.querySelectorAll('.slider-item');
            const slide = document.getElementById('slide');
            slide.appendChild(sliderEls[0]);
        }, 5000);
        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, []);

    const next = () => {
        const sliderEls = document.querySelectorAll('.slider-item');
        const slide = document.getElementById('slide');
        slide.appendChild(sliderEls[0]);
    };

    const prev = () => {
        const sliderEls = document.querySelectorAll('.slider-item');
        const slide = document.getElementById('slide');
        slide.prepend(sliderEls[sliderEls.length - 1]);
    };

    const handleCliclBanner = (item) => {
        if (item?.type === 1) {
            dispath(actions.setCurSongId(item.encodeId));
            dispath(actions.play(true));
            dispath(actions.setPlaylist(null));
        } else if (item?.type === 4) {
            const albumPath = item.link.split('.')[0];
            if (!albumPath.includes('/album') && albumPath.includes('/playlist')) {
                navigate(albumPath.replace('playlist', 'album'));
            } else {
                navigate(albumPath);
            }
        } else {
            dispath(actions.setPlaylist(null));
        }
    };

    return (
        <div className="relative">
            <div className="absolute top-[50%] z-50 flex justify-between left-[70px] right-[70px] opacity-20 hover:opacity-100 transition-all duration-300">
                <button
                    onClick={() => {
                        prev();
                    }}
                    className="w-[40px] h-[40px] flex items-center justify-center bg-overlay-30 rounded-full"
                >
                    <GrPrevious />
                </button>
                <button
                    onClick={() => {
                        next();
                    }}
                    className="w-[40px] h-[40px] flex items-center justify-center bg-overlay-30 rounded-full"
                >
                    <GrNext />
                </button>
            </div>
            <div className="overflow-hidden px-[59px] ">
                <div id="slide" className="gap-8 pt-8 flex flex-shrink-0 basis-[33.33333%]">
                    {banner?.map((item) => {
                        return (
                            <img
                                key={item.encodeId}
                                src={item.banner}
                                alt={item.banner}
                                onClick={() => handleCliclBanner(item)}
                                className={`slider-item flex-1 object-contain w-[31.6%] rounded-lg`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Slider;
