import moment from 'moment';
import React, { useState } from 'react';
import Button from './Button';

const Event = ({ data }) => {
    const [isFollow, setIsFollow] = useState(false);
    return (
        <div className="mt-12 px-[59px] flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{data?.titleComponent}</h3>
            </div>
            <div className="flex items-start justify-between gap-[28px] ">
                <div className="w-1/3 flex flex-col gap-3">
                    <div className="overflow-hidden relative rounded-xl">
                        <img
                            src={data[0]?.coverHM}
                            alt="coverHM"
                            className="w-full h-full object-cover hover:scale-110 transition-all duration-1000"
                        />
                        <div className="absolute p-3 bottom-0 px-[13px] py-[10px] w-full text-white">
                            <span className="block px-1 text-[9px] w-fit text-[#ff0101] rounded-sm bg-white">
                                {data[0]?.label}
                            </span>
                            <span className="text-xl font-extrabold">
                                {data[0]?.title.length > 40 ? data[0]?.title.slice(0, 40) + '...' : data[0]?.title}
                            </span>
                            <span className="block text-sm">
                                {moment.utc(data[0]?.startTime * 1000).format('MM:ss, dd/MM/yyyy')}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="text-[14px] text-gray-500  flex flex-col gap-2">
                            <span className="font-semibold w-fit block">Lượt quan tâm</span>
                            <div className="flex items-center">
                                {data[0]?.followers.map((item) => {
                                    return (
                                        <img
                                            key={item.id}
                                            src={item.avatar}
                                            alt="avartar"
                                            className="w-4 h-4 rounded-full "
                                        />
                                    );
                                })}
                                <span className="ml-1">+{data[0]?.totalFollow}</span>
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsFollow((prev) => !prev)}
                            active={!isFollow}
                            text={!isFollow ? data[0]?.subscribeText : data[0]?.unsubscribeText}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Event;
