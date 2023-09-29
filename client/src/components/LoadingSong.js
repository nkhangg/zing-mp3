import React, { memo } from 'react';
import { RotatingLines } from 'react-loader-spinner';

const LoadingSong = ({ width = 20 }) => {
    return <RotatingLines strokeColor="gray" strokeWidth="5" animationDuration="0.75" width={width} visible={true} />;
};

export default memo(LoadingSong);
