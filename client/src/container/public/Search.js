import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { searchMenu } from '../../ultis/menu';

const notActive =
    'px-4 hover:text-main-500 font-semibold cursor-pointer border-b h-[54px] flex items-center justify-center px-4 border-transparent';
const active =
    'border-b border-main-500 text-main-500 h-[54px] flex items-center justify-center px-4 hover:text-main-500 font-semibold cursor-pointer';

const Search = () => {
    const { keyword } = useSelector((state) => state.music);
    return (
        <div>
            <div className="flex h-[50px] mb-7 items-center text-sm border-b pb-1 border-gray-400 pl-[60px]">
                <span className="text-[24px] font-bold pr-6 border-r border-gray-400">Kết quả tìm kiếm</span>
                <div className="flex items-center">
                    {searchMenu.map((item) => {
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path + `?q=${keyword.replace(' ', '+')}`}
                                className={({ isActive }) => (isActive ? active : notActive)}
                            >
                                {item.text}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
            <div className="">
                <Outlet />
            </div>
        </div>
    );
};

export default Search;
