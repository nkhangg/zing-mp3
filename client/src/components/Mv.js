import React from 'react';
import icons from '../ultis/icons';
import MvItems from './MvItems';
const { AiOutlineRight } = icons;
const Mv = ({ data }) => {
    return (
        <div className="w-full flex flex-col px-[59px] gap-10 mt-12">
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold">{data?.title}</h3>
                    <div className="flex justify-center gap-4 font-medium text-gray-500 cursor-pointer">
                        <span className="text-xs">TẤT CẢ</span>
                        <span>
                            <AiOutlineRight />
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-[28px]">
                    {data?.items?.length > 0 &&
                        data?.items
                            .filter((item, index) => index < 3)
                            ?.map((item) => {
                                return (
                                    <MvItems
                                        image={item?.thumbnailM}
                                        duration={item.duration}
                                        key={item.encodeId}
                                        arvartar={item?.artist?.thumbnail}
                                        name={item?.artist?.name}
                                        link={item?.artist?.link}
                                        title={item?.title}
                                    />
                                );
                            })}
                </div>
            </div>
        </div>
    );
};

export default Mv;
