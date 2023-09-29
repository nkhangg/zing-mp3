import React from 'react';
import { Link } from 'react-router-dom';
import { handleNumber } from '../ultis/fn';

const HightlightItem = ({ data }) => {
    return (
        <Link
            to={data?.top?.link}
            className="p-[10px] flex-1 rounded-md bg-main-200 flex gap-8 items-center cursor-pointer"
        >
            <img
                src={data?.top?.thumbnail}
                alt="avatar"
                className={`w-[84px] h-[84px] object-cover ${data?.top?.objectType === 'artist' && 'rounded-full'}`}
            />
            <div className="flex flex-col gap-1 text-xs">
                <span>{data?.top?.objectType === 'artist' ? 'Nghệ sĩ' : ''}</span>
                <span className="text-sm font-bold">{data?.top?.title || data?.top?.name}</span>
                {data?.top?.objectType === 'artist' && (
                    <span>{handleNumber(data?.artists[0].totalFollow)} quan tâm</span>
                )}
            </div>
        </Link>
    );
};

export default HightlightItem;
