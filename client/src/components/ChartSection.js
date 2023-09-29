import React, { memo, useEffect, useRef, useState } from 'react';
import chartImg from '../acssets/img/chart.jpg';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useSelector } from 'react-redux';
import SongItem from './SongItem';
import { isEqual } from 'lodash';
import { Link } from 'react-router-dom';
import path from '../ultis/path';
import icons from '../ultis/icons';
import Button from './Button';

const { BsPlayCircle } = icons;

const ChartSection = () => {
    const [data, setData] = useState(null);
    const { chart, rank } = useSelector((state) => state.app);
    const [selected, setSelected] = useState(null);

    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });
    const charRef = useRef();
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { borderDash: [4, 4], color: 'rgba(255, 255, 255, 0.1)', drawTicks: false },
                min: chart?.minScrore,
                max: chart?.maxScrore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!charRef || !charRef.current) return;
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) {
                            setTooltipState((prev) => ({ ...prev, opacity: 0 }));
                        }
                        return;
                    }

                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]
                                ?.filter((item) => +item.hour % 2 === 0)
                                ?.map((item) => item?.counter),
                            encodeId: Object.keys(chart?.items)[i],
                        });
                    }

                    const rs = counters.find((i) =>
                        i.data.some((n) => n === +tooltip.body[0]?.lines[0]?.replace(',', '')),
                    );

                    setSelected(rs?.encodeId);
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    };
                    if (!isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData);
                },
            },
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        },
    };

    useEffect(() => {
        if (chart?.items) {
            const labels = chart?.times?.filter((item) => +item.hour % 2 === 0)?.map((item) => `${item?.hour}:00`);
            const datasets = [];
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]
                        ?.filter((item) => +item.hour % 2 === 0)
                        ?.map((item) => item?.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 4,
                    pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    pointHoverBorderWidth: 4,
                });
            }

            setData({ labels, datasets });
        }
    }, [chart]);

    return (
        <div className="mt-12 px-[59px] relative max-h-[430px]">
            <img
                src={chartImg}
                alt="chartImg"
                className="w-full object-cover rounded-md overflow-hidden max-h-[430px]"
            />
            <div className="absolute top-0 left-[59px] right-[59px] bottom-0 z-10 bg-overlay-10 rounded-md"></div>
            <div className="absolute top-0 left-[59px] right-[59px] bottom-0 z-20 p-5 rounded-md flex flex-col gap-8">
                <Link to={path.ZING__CHART} className="flex gap-2 items-center">
                    <h3 className="text-2xl text-white font-bold hover:text-main-500">#zingchart</h3>
                    <span className="text-main-500">
                        <BsPlayCircle size={35} />
                    </span>
                </Link>
                <div className="flex gap-4 h-full">
                    <div className="flex-3 flex flex-col gap-4 ">
                        {rank
                            ?.filter((i, index) => index < 3)
                            ?.map((item, index) => {
                                return (
                                    <SongItem
                                        key={item.encodeId}
                                        title={item.title}
                                        artists={item.artistsNames}
                                        sid={item.encodeId}
                                        thumbnail={item.thumbnail}
                                        order={index + 1}
                                        persent={Math.round((+item.score * 100) / +chart?.totalScore)}
                                        styles={'hover:bg-[#945ea7] bg-[#ffffff12] text-white'}
                                    />
                                );
                            })}
                        <Link to={path.ZING__CHART} className="text-white m-auto">
                            <Button active={false} text={'Xem Thêm'} />
                        </Link>
                    </div>
                    <div className="flex-7  h-[90%] relative">
                        {data && <Line ref={charRef} options={options} data={data} />}
                        <div
                            className="absolute"
                            style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity }}
                        >
                            <SongItem
                                key={rank?.find((i) => i.encodeId === selected)?.encodeId}
                                title={rank?.find((i) => i.encodeId === selected)?.title}
                                artists={rank?.find((i) => i.encodeId === selected)?.artistsNames}
                                sid={rank?.find((i) => i.encodeId === selected)?.encodeId}
                                thumbnail={rank?.find((i) => i.encodeId === selected)?.thumbnail}
                                styles={'bg-white'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ChartSection);
