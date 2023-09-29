import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ data }) => {
    return (
        <div className="flex items-center px-[43px] w-full mt-12">
            {data?.map((item) => {
                return (
                    <Link to={item.link.split('.')[0]} key={item.link} className={`flex-1 px-4 w-full `}>
                        <div className="flex overflow-hidden rounded-md">
                            <img
                                src={item.cover}
                                alt="cover"
                                className="w-full object-cover rounded-md hover:scale-110 duration-1000"
                            />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Banner;
