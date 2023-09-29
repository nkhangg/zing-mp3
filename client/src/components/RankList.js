import React, { memo, useEffect, useRef, useState } from 'react';
import Button from './Button';
import ListSong from './ListSong';

const RankList = ({ data }) => {
    const [isShowFull, setIsShowFull] = useState(10);
    const ref = useRef();

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    }, [isShowFull]);

    return (
        <div ref={ref} onScroll={() => {}} className="px-[59px] mt-12 flex flex-col gap-10">
            <div>
                {data &&
                    data
                        ?.filter((item, index) => index < isShowFull)
                        ?.map((item, index) => {
                            return <ListSong key={item.encodeId} order={index + 1} songData={item} isHideAlum />;
                        })}
            </div>
            <div className="w-full flex items-center justify-center">
                <Button
                    styles={' border-main-500 text-main-500'}
                    onClick={(e) => {
                        setIsShowFull((prev) => {
                            if (prev === 10) {
                                return (prev = 100);
                            } else {
                                return (prev = 10);
                            }
                        });
                    }}
                    text={isShowFull === 100 ? 'Ẩn Bớt' : 'Xem Top 100'}
                />
            </div>
        </div>
    );
};

export default memo(RankList);
