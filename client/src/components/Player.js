/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as apis from '../apis';
import * as actions from '../store/action';
import icons from '../ultis/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingSong } from '../components';
const {
    AiOutlineHeart,
    BsThreeDots,
    MdSkipNext,
    MdSkipPrevious,
    CiRepeat,
    BsPlayCircle,
    BsPauseCircle,
    CiShuffle,
    TbRepeatOnce,
    BsMusicNoteList,
    SlVolume2,
    SlVolume1,
    SlVolumeOff,
} = icons;
const Player = ({ onShow }) => {
    const { curSongId, isPlaying, songData, volums } = useSelector((state) => state.music);
    const [songInfo, setSongInfo] = useState(null);
    const [audio, setAudio] = useState(new Audio());
    const [currentDuration, setCurrentDuration] = useState(0);
    const [isSuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0);
    const [isLoanded, setIsLoanded] = useState(true);
    const [volum, setVolum] = useState(+volums);

    const thumbRef = useRef();
    const trackRef = useRef();
    const intervalId = useRef();
    const volumRef = useRef();
    const dispath = useDispatch();

    useEffect(() => {
        audio.onplay = () => {
            dispath(actions.play(false));
        };
    }, []);

    useEffect(() => {
        const fetchDetailtSong = async () => {
            setIsLoanded(false);
            const [res1, res2] = await Promise.all([apis.apiGetDetailSong(curSongId), apis.apiGetSong(curSongId)]);
            setIsLoanded(true);
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data);
                dispath(actions.setCurSongData(res1.data.data));
            }

            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data['128']));
            } else {
                audio.pause();
                setAudio(new Audio());
                dispath(actions.play(false));
                toast.warning(res2.data.msg);
                setCurrentDuration(0);
                thumbRef.current.style.cssText = `right: ${100}%`;
            }
        };

        fetchDetailtSong();
    }, [curSongId]);

    useEffect(() => {
        intervalId.current && clearInterval(intervalId.current);
        audio.volume = +volum / 100;
        audio.load();

        if (isPlaying && thumbRef.current) {
            audio.play();
            intervalId.current = setInterval(() => {
                let persent = Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
                if (thumbRef.current) {
                    thumbRef.current.style.cssText = `right: ${100 - persent}%`;
                }
                setCurrentDuration(Math.round(audio.currentTime));
            }, 200);
        }
    }, [audio]);

    useEffect(() => {
        const handleEnded = () => {
            if (isSuffle) {
                handleSuffle();
            } else if (repeatMode) {
                repeatMode === 1 ? handleRepeatOne() : handleNext();
            } else {
                dispath(actions.play(false));
            }
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audio, isSuffle, repeatMode]);

    useEffect(() => {
        audio.volume = +volum / 100;
        dispath(actions.setVolum(+volum));
        if (volumRef.current) {
            volumRef.current.value = volum;
        }
    }, [volum]);

    const handlePlaying = () => {
        if (isLoanded) {
            if (isPlaying) {
                audio.pause();
                dispath(actions.play(false));
            } else {
                audio.play();
                dispath(actions.play(true));
            }
        }
    };

    const handleRepeatOne = () => {
        audio.play();
    };

    const handleClickProcessbar = (e) => {
        const trackReact = trackRef.current.getBoundingClientRect();
        const persent = Math.round(((e.clientX - trackReact.left) * 10000) / trackReact.width) / 100;
        thumbRef.current.style.cssText = `right: ${100 - persent}%`;
        audio.currentTime = (persent * songInfo.duration) / 100;
        setCurrentDuration(Math.round((persent * songInfo.duration) / 100));
    };

    const handleNext = () => {
        if (songData) {
            let currentSongIndex = null;

            songData?.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    currentSongIndex = index;
                }
            });
            dispath(actions.setCurSongId(songData?.[currentSongIndex + 1].encodeId));
            dispath(actions.play(true));
        }
    };

    const handlePrevent = () => {
        if (songData) {
            let currentSongIndex = null;

            songData?.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    currentSongIndex = index;
                }
            });
            dispath(actions.setCurSongId(songData?.[currentSongIndex - 1].encodeId));
            dispath(actions.play(true));
        }
    };

    const handleSuffle = () => {
        const ramdomIndex = Math.round(Math.random() * songData?.length) - 1;
        dispath(actions.setCurSongId(songData?.[ramdomIndex].encodeId));
        dispath(actions.play(true));
        setIsShuffle((prev) => !prev);
    };

    const handleChangeVolum = (e) => {
        setVolum(e.target.value);
        audio.volume = +volum / 100;
        dispath(actions.setVolum(e.target.value));
    };

    return (
        <div className="bg-main-400 px-5 py-2 flex h-full items-center">
            <div className="w-[30%]  flex-auto gap-4 flex items-center">
                <img src={songInfo?.thumbnail} alt="thumbnail" className="w-16 h-16 object-cover rounded-md" />
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-700 text-sm">{songInfo?.title}</span>
                    <span className="text-xs text-gray-500">{songInfo?.artistsNames}</span>
                </div>
                <div className="flex gap-4">
                    <span className="cursor-pointer">
                        <AiOutlineHeart size={16} />
                    </span>
                    <span className="cursor-pointer">
                        <BsThreeDots size={16} />
                    </span>
                </div>
            </div>
            <div className="w-[40%] flex-auto flex  items-center flex-col select-none">
                <div className="flex items-center gap-4 justify-center p-2">
                    <span
                        title="Bật phát ngẫu nhiên"
                        className={`cursor-pointer ${isSuffle ? 'text-purple-600' : ''}`}
                        onClick={() => setIsShuffle((prev) => !prev)()}
                    >
                        <CiShuffle size={24} />
                    </span>
                    <span
                        onClick={() => handlePrevent()}
                        className={`${!songData ? 'text-gray-500' : 'cursor-pointer'}`}
                    >
                        <MdSkipPrevious size={24} />
                    </span>
                    <span
                        onClick={() => handlePlaying()}
                        className="cursor-pointer hover:text-main-500 transition-colors duration-200 ease-out"
                    >
                        {!isLoanded ? (
                            <LoadingSong width={40} />
                        ) : isPlaying ? (
                            <BsPauseCircle size={40} />
                        ) : (
                            <BsPlayCircle size={40} />
                        )}
                    </span>
                    <span onClick={() => handleNext()} className={`${!songData ? 'text-gray-500' : 'cursor-pointer'}`}>
                        <MdSkipNext size={24} />
                    </span>
                    <span
                        onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
                        title="Bật phát lại tất cả"
                        className={`cursor-pointer ${repeatMode ? 'text-purple-600' : ''}`}
                    >
                        {repeatMode === 1 ? <TbRepeatOnce size={24} /> : <CiRepeat size={24} />}
                    </span>
                </div>
                <div className="w-full flex justify-center items-center gap-2 text-xs">
                    <span>{moment.utc(currentDuration * 1000).format('mm:ss')}</span>
                    <div
                        ref={trackRef}
                        onClick={(e) => handleClickProcessbar(e)}
                        className=" h-[3px] w-3/4 hover:h-[8px] cursor-pointer rounded-l-full rounded-r-full relative transition-all ease-linear bg-[rgba(0,0,0,0.1)]"
                    >
                        <div
                            ref={thumbRef}
                            className="absolute top-0 rounded-l-full bottom-0 rounded-r-full left-0 bg-[#0e8080]"
                        ></div>
                    </div>
                    <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className="w-[30%] flex-auto flex items-center justify-end gap-4">
                <div className="flex gap-2 items-center">
                    <span onClick={() => setVolum((prev) => (+prev === 0 ? 70 : 0))}>
                        {+volum > 50 ? <SlVolume2 /> : +volum === 0 ? <SlVolumeOff /> : <SlVolume1 />}
                    </span>
                    <input
                        ref={volumRef}
                        value={volum}
                        onChange={(e) => handleChangeVolum(e)}
                        type="range"
                        min={0}
                        max={100}
                    />
                </div>
                <span
                    onClick={() => onShow((prev) => !prev)}
                    className="rounded-sm cursor-pointer text-white bg-main-500 p-1 opacity-80 hover:opacity-100"
                >
                    <BsMusicNoteList size={14} />
                </span>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Player;
