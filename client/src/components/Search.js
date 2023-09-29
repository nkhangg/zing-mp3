import React, { useState } from 'react';
import icons from '../ultis/icons';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../store/action';
import path from '../ultis/path';
const { FiSearch, AiOutlineClose } = icons;
const Search = () => {
    const [keyword, setKeyword] = useState('');
    const { singer } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        if (e.keyCode === 13) {
            dispatch(actions.search(keyword));
            navigate({
                pathname: `${path.SEARCH}/${path.ALL}`,
                search: createSearchParams({
                    q: keyword,
                }).toString(),
            });
        }
    };

    return (
        <div className="w-full flex relative items-center">
            {keyword && (
                <span onClick={() => setKeyword('')} className="absolute right-3 cursor-pointer">
                    <AiOutlineClose />
                </span>
            )}
            <span
                className={`h-10 pl-4 ${
                    singer ? 'bg-[#0000007d] text-white' : 'bg-[#dde4e4] text-gray-500'
                } flex items-center justify-center rounded-l-[20px] `}
            >
                <FiSearch />
            </span>
            <input
                type="text"
                className={`outline-none w-full px-4 py-2 rounded-r-[20px] h-10  ${
                    singer ? 'bg-[#0000007d] text-white' : 'bg-[#dde4e4] text-gray-500'
                }`}
                placeholder="Tìm kiếm, nghệ sĩ, lời bài hát..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyUp={(e) => handleSearch(e)}
            />
        </div>
    );
};

export default Search;
