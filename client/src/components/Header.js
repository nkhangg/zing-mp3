import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import icons from '../ultis/icons';
import Search from './Search';

const { HiArrowNarrowLeft, HiArrowNarrowRight } = icons;
const Header = () => {
    const { singer } = useParams();
    const navigate = useNavigate();

    return (
        <div className="flex justify-between w-full">
            <div className="flex items-center gap-6 w-full">
                <div className="flex items-center gap-6  text-gray-400 ">
                    <span onClick={() => navigate(-1)} className="cursor-pointer">
                        <HiArrowNarrowLeft size={24} color={singer ? '#fff' : ''} />
                    </span>
                    <span onClick={() => navigate(1)} className="cursor-pointer">
                        <HiArrowNarrowRight size={24} color={singer ? '#fff' : ''} />
                    </span>
                </div>
                <div className="w-1/2">
                    <Search />
                </div>
            </div>
            <div className="">dang nhap</div>
        </div>
    );
};

export default Header;
