import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListSongs } from '../../components';
import * as actions from '../../store/action';

const SearchSong = () => {
    const { searchData } = useSelector((state) => state.music);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getSeartchSongs(searchData?.top?.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData]);

    return (
        <div className="w-full px-[59px]">
            <ListSongs isHideTitle />
        </div>
    );
};

export default SearchSong;
