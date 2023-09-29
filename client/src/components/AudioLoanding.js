import React, { memo } from 'react';
import { Audio } from 'react-loader-spinner';

const AudioLoanding = () => {
    return (
        <Audio
            height="30"
            width="30"
            color="#fff"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    );
};

export default memo(AudioLoanding);
