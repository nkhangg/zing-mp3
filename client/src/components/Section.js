import React, { memo } from 'react';
import icons from '../ultis/icons';
import SectionItem from './SectionItem';

const { AiOutlineRight } = icons;
const Section = ({ data, artistsNames = false, styles }) => {
    return (
        <div className="mt-12 px-[59px] flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{data?.title}</h3>
                <div className="flex justify-center gap-4 font-medium text-gray-500 cursor-pointer">
                    <span className="text-xs">TẤT CẢ</span>
                    <span>
                        <AiOutlineRight />
                    </span>
                </div>
            </div>
            <div className="flex items-start gap-[28px]">
                {data &&
                    data?.items?.length > 0 &&
                    data?.items
                        ?.filter((item, index) => index <= 4)
                        ?.map((item) => {
                            return (
                                <SectionItem
                                    key={item.encodeId}
                                    title={item.title}
                                    link={item.link}
                                    sortDescription={item.sortDescription}
                                    thumbnailM={item.thumbnailM}
                                    artistsNames={item.artistsNames}
                                />
                            );
                        })}
            </div>
        </div>
    );
};

export default memo(Section);
