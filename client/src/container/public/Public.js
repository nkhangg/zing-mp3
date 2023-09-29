import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { Header, LoadingData, Player, SideBarLeft, SideBarRight } from '../../components';
import * as actions from '../../store/action';

const Public = () => {
    const [isShowSidebar, setIsShowSidebar] = useState(true);
    const { isLoading } = useSelector((state) => state.app);
    const { singer } = useParams();
    const dispatch = useDispatch();
    const { scroll } = useSelector((state) => state.app);

    const handleScroll = (e) => {
        dispatch(actions.setScroll(e.target.scrollTop > 0));
    };
    return (
        <div className="w-full relative h-screen flex flex-col  bg-main-300">
            <div className="w-full h-full flex flex-auto">
                <div className="w-[240px] h-full flex-none">
                    <SideBarLeft />
                </div>
                <div className="flex-auto relative flex flex-col">
                    {isLoading && (
                        <div className="absolute flex items-center justify-center bottom-0 left-0 right-0 top-0 z-10 bg-overlay-30">
                            <LoadingData />
                        </div>
                    )}
                    <div
                        className={`${
                            scroll ? 'bg-main-300' : 'bg-transparent'
                        } h-[70px] flex-none overflow-x-hidden px-[59px] flex items-center ${
                            singer ? 'fixed top-0 left-[240px] right-[329px] z-50' : 'bg-transparent'
                        }`}
                    >
                        <Header />
                    </div>
                    <div className="flex-auto overflow-x-hidden w-full">
                        <Scrollbars onScroll={(e) => handleScroll(e)} style={{ width: '100%', height: '100%' }}>
                            <Outlet />
                            <div className="h-28 w-full"></div>
                        </Scrollbars>
                    </div>
                </div>
                {isShowSidebar && (
                    <div className="w-[329px] hidden 1600:flex flex-none">
                        <SideBarRight />
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-40 h-[90px]">
                <Player onShow={setIsShowSidebar} />
            </div>
        </div>
    );
};

export default Public;
