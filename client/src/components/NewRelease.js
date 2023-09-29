import React, { useEffect, useState } from 'react';
import icons from '../ultis/icons';
import { useSelector } from 'react-redux';
import Button from './Button';
import SongItem from './SongItem';
const { AiOutlineRight } = icons;

const NewRelease = () => {
    const { newRelease } = useSelector((state) => state.app);
    const [isActive, setIsActive] = useState(0);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        if (isActive === 1) {
            setSongs(newRelease?.items?.vPop);
        } else if (isActive === 2) {
            setSongs(newRelease?.items?.others);
        } else {
            setSongs(newRelease?.items?.all);
        }
    }, [isActive, songs, newRelease]);
    return (
        <div className="mt-12 px-[59px] flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-5 font-bold">{newRelease?.title}</h3>
                <div className="flex justify-center gap-4 font-medium text-gray-500 cursor-pointer">
                    <span className="text-xs">TẤT CẢ</span>
                    <span>
                        <AiOutlineRight />
                    </span>
                </div>
            </div>
            <div className="flex gap-5 items-center text-xs">
                <Button onClick={() => setIsActive(0)} active={isActive === 0} text={'Tất Cả'} />
                <Button onClick={() => setIsActive(1)} active={isActive === 1} text={'Việt Nam'} />
                <Button onClick={() => setIsActive(2)} active={isActive === 2} text={'Quốc Tế'} />
            </div>

            <div className="grid grid-cols-2 min-[1024px]:grid-cols-3 w-full gap-1">
                {songs
                    ?.filter((item, index) => index <= 11)
                    ?.map((item) => {
                        return (
                            <SongItem
                                active={true}
                                sid={item.encodeId}
                                thumbnail={item.thumbnail}
                                title={item.title}
                                artists={item.artistsNames}
                                releaseDate={item.releaseDate}
                                key={item.encodeId}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default NewRelease;
