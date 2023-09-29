/* eslint-disable no-use-before-define */
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import * as apis from '../../apis';
import * as actions from '../../store/action';
import { AudioLoanding, ListSongs } from '../../components';
import icons from '../../ultis/icons';

const { BsPlayCircle } = icons;

const Album = () => {
    const { isPlaying } = useSelector((state) => state.music);
    const { pid } = useParams();
    const [playlistDetail, setPlaylistDetail] = useState(null);

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(actions.setCurAlbum(pid));
        const fetchDetailAlbum = async () => {
            dispatch(actions.loading(true));
            const responce = await apis.apiGetDetailPlaylist(pid);
            dispatch(actions.loading(false));

            if (responce?.data.err === 0) {
                setPlaylistDetail(responce?.data?.data);
                dispatch(actions.setPlaylist(responce?.data?.data?.song?.items));
            }
        };
        fetchDetailAlbum();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pid]);

    useEffect(() => {
        if (location.state?.playAlbum) {
            const ramdomSong = Math.round(Math.random() * playlistDetail?.song?.items?.length) - 1;
            dispatch(actions.setCurSongId(playlistDetail?.song?.items[ramdomSong]?.encodeId));
            dispatch(actions.play(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pid, playlistDetail]);

    return (
        <div className="flex relative gap-8 w-full h-full px-[59px] mt-[40px]">
            <div className="flex-none relative w-1/4 flex flex-col items-center gap-1 bg-transparent">
                <div id="overlay-album" className={`relative w-full overflow-hidden bg-main-300`}>
                    <div className="overflow-hidden">
                        <img
                            id="img-album"
                            src={playlistDetail?.thumbnailM}
                            alt="thumbnailM"
                            className={`w-full object-contain ${isPlaying ? 'animate-cd' : 'animate-cd-pause'} `}
                        />
                    </div>
                    <div
                        className={`absolute top-0 right-0 left-0 bottom-0 cursor-pointer flex items-center justify-center text-white transition-all  hover:bg-overlay-30  ${
                            isPlaying ? 'rounded-full hover:bg-transparent' : 'animate-cd-pause'
                        }`}
                    >
                        {isPlaying ? (
                            <span className="rounded-full p-2 border border-white">
                                <AudioLoanding />
                            </span>
                        ) : (
                            <BsPlayCircle size={50} />
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <h3 className="text-[20px] font-bold text-gray-900">{playlistDetail?.title}</h3>
                    <span className="items-center flex gap-2 text-gray-500 text-xs">
                        <span>Cập nhật: </span>
                        <span>{moment.unix(playlistDetail?.contentLastUpdate).format('mm/DD/yyyy')}</span>
                    </span>
                    <span className="items-center flex gap-2 text-gray-500 text-xs">
                        {playlistDetail?.artistsNames}
                    </span>
                    <span className="items-center flex gap-2 text-gray-500 text-xs">{`${Math.round(
                        playlistDetail?.like,
                    )}K người yêu thích`}</span>
                </div>
            </div>
            <Scrollbars style={{ width: '100%', height: '60%' }}>
                <div className="flex-auto mb-40">
                    <span className="text-[14px]">
                        <span className="text-gray-500">Lời tựa </span>
                        <span className="text-gray-600">{playlistDetail?.sortDescription}</span>
                    </span>
                    <ListSongs totaleDuration={playlistDetail?.song.totalDuration} />
                </div>
            </Scrollbars>
        </div>
    );
};

export default Album;
