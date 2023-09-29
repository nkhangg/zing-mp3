import React from 'react';
import { formatNum } from '../ultis/fn';

const DetailArtisit = ({ data }) => {
    return (
        <div className="px-[59px] mt-12 ">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold">{`Về ${data?.name}`}</h3>
            </div>
            <div className="w-[80%] flex items-center">
                <div className="grid grid-cols-2 gap-8">
                    <div className="w-full max-h-[312px] overflow-hidden rounded-2xl">
                        <img className="rounded-2xl w-full object-cover" src={data?.thumbnailM} alt="thumbnail" />
                    </div>
                    <div className="text-sm text-gray-500 leading-6 flex flex-col gap-10">
                        {data?.biography.length < 400 && <p>{data?.biography.replaceAll('<br>', '')}</p>}
                        {data?.biography.length > 400 && (
                            <p>
                                {data?.biography.slice(0, 400).replaceAll('<br>', '') + '...'}
                                <span className="font-bold text-main-500 cursor-pointer">Xem Thêm</span>
                            </p>
                        )}

                        <div className="flex flex-col gap-1">
                            <span className="text-[20px] font-bold">{formatNum(data?.totalFollow)}</span>
                            <span>Người quan tâm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailArtisit;
