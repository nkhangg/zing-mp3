import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Artists, DetailArtisit, ListSong, LoadingData, Mv, Section } from '../../components';
import icons from '../../ultis/icons';
import * as acitons from '../../store/action';
import { formatNum } from '../../ultis/fn';
const { AiOutlineUserAdd, BsPlayCircle, AiOutlineRight } = icons;
const Singer = () => {
    const { singer } = useParams();
    const { artist, songs, single, collection, appear, likes, mv } = useSelector((state) => state.singer);
    const [follow, setFollow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const ref = useRef();

    const dispath = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispath(acitons.getSinger(singer));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [singer]);

    useEffect(() => {
        artist ? setIsLoading(false) : setIsLoading(true);
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }, [artist]);

    return (
        <div ref={ref} className="w-full flex flex-col relative">
            {isLoading && (
                <div className={`fixed inset-0 z-30 bg-overlay-30 flex items-center justify-center`}>
                    <LoadingData />
                </div>
            )}
            <div className="relative">
                <img className="w-full h-[400px] object-cover" src={artist?.cover} alt="img" />
                <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,.5)] to-transparent px-[59px] text-white">
                    <div className="flex flex-col gap-8 bottom-0 pb-6 absolute px-[59px]">
                        <div className="flex gap-8 items-center">
                            <h1 className="text-[60px] font-bold">{artist?.name}</h1>
                            <span className="hover:text-main-500 cursor-pointer">
                                <BsPlayCircle size={52} />
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-300">
                                {follow ? formatNum(+artist?.totalFollow) + 1 : formatNum(+artist?.totalFollow)} người
                                quan tâm
                            </span>
                            <button
                                type="button"
                                className="bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1"
                            >
                                <span>
                                    <AiOutlineUserAdd />
                                </span>
                                <span onClick={() => setFollow((prev) => !prev)} className="text-xs opacity-90">
                                    {follow ? 'Đã Quan Tâm' : 'Quan Tâm'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-[59px] mt-12">
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
                    {songs?.items
                        ?.filter((i, index) => index < 6)
                        ?.map((item) => {
                            return <ListSong isHideAlum isHideArtist={true} key={item.encodeId} songData={item} />;
                        })}
                </div>
            </div>

            {!isLoading && (
                <>
                    <Section data={single} />
                    <Section data={collection} />
                    <Mv data={mv} />
                    {appear && <Section data={appear} />}
                    <Artists data={likes} title={'Có Thể Bạn Sẽ Thích'} />
                    <DetailArtisit data={artist} />
                </>
            )}
        </div>
    );
};

export default Singer;
