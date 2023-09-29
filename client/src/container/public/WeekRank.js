import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as actions from '../../store/action';
import bg from '../../acssets/img/week.jpg';
import icons from '../../ultis/icons';
import { converArea } from '../../ultis/fn';
import Scrollbars from 'react-custom-scrollbars-2';
import { ListSong } from '../../components';

const { BsPlayCircle } = icons;

const active =
    'text-2xl font-bold h-[59px] flex items-center justify-center border-b border-main-500 text-main-500 cursor-pointer';
const notActive =
    'text-2xl font-bold h-[59px] flex items-center justify-center cursor-pointer border-b border-transparent';

const WeekRank = () => {
    const dispatch = useDispatch();
    const { pid } = useParams();
    const { weekRankData, title } = useSelector((state) => state.music);

    useEffect(() => {
        dispatch(actions.getWeedRank(pid));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pid]);
    return (
        <div className="relative">
            <img src={bg} alt="bg" className="w-full object-cover grayscale h-[500px]" />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,219,219,.8)]"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#ced9d9] to-transparent"></div>
            <div className="absolute top-12 left-0 right-0 bottom-0 flex px-[59px] flex-col gap-10">
                <div className="text-[40px] text-main-500 flex items-center gap-4">
                    <h3 className="font-bold ">Bảng Xếp Hạng Tuần</h3>
                    <span className="hover:opacity-70 cursor-pointer">
                        <BsPlayCircle />
                    </span>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex gap-8">
                        {title &&
                            title?.map((item) => {
                                return (
                                    <Link
                                        to={item.link}
                                        className={item.link.includes(pid) ? active : notActive}
                                        key={item.title}
                                    >
                                        {converArea(item.title)}
                                    </Link>
                                );
                            })}
                    </div>
                    <div id="week-rank" className="w-full">
                        <Scrollbars style={{ width: '100%', height: '100%' }}>
                            {weekRankData &&
                                weekRankData[1]?.items?.map((item, index) => (
                                    <ListSong key={item.encodeId} order={index + 1} songData={item} isHideAlum />
                                ))}
                        </Scrollbars>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(WeekRank);
