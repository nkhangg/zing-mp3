import React, { memo, useEffect, useRef, useState } from 'react';
import { apiGetChartHome } from '../../apis';
import bgChart from '../../acssets/img/chart.jpg';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { isEqual } from 'lodash';
import { ChartTables, RankList, SongItem } from '../../components';
const ZingChart = () => {
    const [charData, setCharData] = useState(null);

    const [data, setData] = useState(null);
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
                grid: { borderDash: [4, 4], color: 'rgba(0, 0, 0, 0.3)', drawTicks: false },
                min: charData?.RTChart?.chart?.minScrore,
                max: charData?.RTChart?.chart?.maxScrore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: 'gray' },
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
                            data: charData?.RTChart?.chart?.items[Object.keys(charData?.RTChart?.chart?.items)[i]]
                                ?.filter((item) => +item.hour % 2 === 0)
                                ?.map((item) => item?.counter),
                            encodeId: Object.keys(charData?.RTChart?.chart?.items)[i],
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
        const fetch = async () => {
            const responce = await apiGetChartHome();
            if (responce.data.err === 0) {
                setCharData(responce.data.data);
            }
        };

        fetch();
    }, []);

    useEffect(() => {
        if (charData?.RTChart?.chart?.items) {
            const labels = charData?.RTChart?.chart?.times
                ?.filter((item) => +item.hour % 2 === 0)
                ?.map((item) => `${item?.hour}:00`);
            const datasets = [];
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: charData?.RTChart?.chart?.items[Object.keys(charData?.RTChart?.chart?.items)[i]]
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
    }, [charData]);

    // console.log(Object.entries(charData?.weekChart));

    return (
        <div className="">
            <div className="flex flex-col w-full">
                <div className="relative">
                    <img src={bgChart} alt="bg" className="w-full object-cover grayscale h-[500px]" />
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,219,219,.9)]"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#ced9d9] to-transparent"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex px-[59px]">
                        <h3 className="font-bold text-[40px] text-main-500">#zingchart</h3>
                    </div>
                    <div className="top-0 right-0 bottom-0 left-0 absolute">
                        {data && <Line ref={charRef} options={options} data={data} />}
                        <div
                            className="absolute"
                            style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity }}
                        >
                            <SongItem
                                key={charData?.RTChart?.items?.find((i) => i.encodeId === selected)?.encodeId}
                                title={charData?.RTChart?.items?.find((i) => i.encodeId === selected)?.title}
                                artists={charData?.RTChart?.items?.find((i) => i.encodeId === selected)?.artistsNames}
                                sid={charData?.RTChart?.items?.find((i) => i.encodeId === selected)?.encodeId}
                                thumbnail={charData?.RTChart?.items?.find((i) => i.encodeId === selected)?.thumbnail}
                                styles={'bg-white'}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <RankList data={charData?.RTChart?.items} />

            {charData && <ChartTables data={Object.entries(charData?.weekChart)} />}
        </div>
    );
};

export default memo(ZingChart);
