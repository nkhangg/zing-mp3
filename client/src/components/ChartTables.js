import React from 'react';
import ChartTable from './ChartTable';
import bg from '../acssets/img/chart.jpg';

const ChartTables = ({ data }) => {
    return (
        <div className="mt-12 relative mb-[120px]">
            <img src={bg} alt="bg" className="w-full object-cover grayscale h-[500px]" />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,219,219,.9)]"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#ced9d9] to-transparent"></div>
            <div className="z-20 absolute inset-0 px-[59px] mt-12 flex flex-col gap-8">
                <h1 className="text-[40px] font-bold text-main-500">Bảng Xếp Hạng Tuần</h1>

                <div className="flex justify-between items-start gap-[28px]">
                    {data &&
                        data?.map((item) => {
                            return (
                                <ChartTable
                                    key={item[0]}
                                    title={item[0]}
                                    data={item[1]?.items?.filter((item, index) => index < 5)}
                                    link={item[1]?.link?.split('.')[0]}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default ChartTables;
