import React, { memo } from 'react';
import { TailSpin } from 'react-loader-spinner';

const LoadingData = () => {
    return (
        <TailSpin
            height="40"
            width="40"
            color="#0E8080"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    );
};

export default memo(LoadingData);
