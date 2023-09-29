import React from 'react';
import Slider from 'react-slick';
import icons from '../ultis/icons';
import Artist from './Artist';

const { AiOutlineRight } = icons;

const Artists = ({ data, slide, title }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
    };
    return (
        <div className="w-full flex flex-col px-[59px] gap-10 mt-12">
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold">{title ? title : 'Nghệ sĩ'}</h3>
                    <div className="flex justify-center gap-4 font-medium text-gray-500 cursor-pointer">
                        <span className="text-xs">TẤT CẢ</span>
                        <span>
                            <AiOutlineRight />
                        </span>
                    </div>
                </div>
                {!slide && (
                    <div className="flex gap-[28px]">
                        {data
                            ?.filter((item, index) => index <= 4)
                            ?.map((item) => {
                                return (
                                    <Artist
                                        title={item.name}
                                        key={item.id}
                                        image={item.thumbnailM || item.thumbnail}
                                        follower={item.totalFollow}
                                        link={item.link}
                                    />
                                );
                            })}
                    </div>
                )}

                {slide && (
                    <div className="">
                        <Slider {...settings}>
                            {data?.map((item, index) => {
                                return (
                                    <Artist
                                        styles="px-4"
                                        title={item.name}
                                        key={item.id}
                                        image={item.thumbnailM || item.thumbnail}
                                        follower={item.totalFollow}
                                        link={item.link}
                                    />
                                );
                            })}
                        </Slider>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Artists;
