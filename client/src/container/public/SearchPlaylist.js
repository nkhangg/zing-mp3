import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiGetArtist } from '../../apis';
import SectionItem from '../../components/SectionItem';

const SearchPlaylist = () => {
    const { searchData } = useSelector((state) => state.music);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const responce = await apiGetArtist(searchData?.top?.alias);
            if (responce.data.err === 0) {
                setPlaylists(responce.data.data.sections[1]);
            }
        };

        searchData && fetch();
    }, [searchData]);

    console.log(playlists);
    return (
        <div className="w-full flex-col flex gap-8 px-[59px]">
            <h3 className="text-lg font-bold text-gray-700">Playlist/Album</h3>
            <div className="grid grid-cols-5 gap-[28px]">
                {playlists &&
                    playlists?.items?.length > 0 &&
                    playlists.items.map((item) => {
                        return (
                            <SectionItem
                                styles={' '}
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

export default SearchPlaylist;
