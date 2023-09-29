import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Artists, HightlightItem, ListSong, Section, SongItem } from '../../components';
import icons from '../../ultis/icons';

const { AiOutlineRight } = icons;
const SearchAll = () => {
    const { searchData } = useSelector((state) => state.music);
    const [playlists, setPlaylists] = useState(null);

    useEffect(() => {
        if (searchData) {
            setPlaylists({ items: searchData?.playlists, title: 'Playlist/Album' });
        }
    }, [searchData]);

    return (
        <>
            <div className="w-full flex flex-col px-[59px] gap-10 mt-12">
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold mb-5">Nỗi bật</h3>
                    <div className="flex gap-8">
                        {searchData?.top && <HightlightItem data={searchData} />}

                        {searchData?.songs
                            ?.filter((item, index) => [...Array(2).keys()].some((i) => i === index))
                            ?.map((item) => (
                                <div key={item.encodeId} className="flex-1">
                                    <SongItem
                                        thumbnail={item.thumbnail}
                                        sid={item.encodeId}
                                        title={item.title}
                                        artists={item.artistsNames}
                                        size={'h-[84px] w-[84px]'}
                                        styles={'bg-main-200'}
                                    />
                                </div>
                            ))}
                    </div>
                </div>

                <div className="">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold">{'Bài hát'}</h3>
                        <div className="flex justify-center gap-4 font-medium text-gray-500 cursor-pointer">
                            <span className="text-xs">TẤT CẢ</span>
                            <span>
                                <AiOutlineRight />
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {searchData?.songs
                            ?.filter((i, index) => index < 6)
                            ?.map((item) => {
                                return <ListSong isHideAlum isHideArtist={true} key={item.encodeId} songData={item} />;
                            })}
                    </div>
                </div>
            </div>
            {playlists && <Section data={playlists} />}
            <Artists data={searchData?.artists} />
        </>
    );
};

export default SearchAll;
