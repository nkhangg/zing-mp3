export const getArrSlider = (start, end, number) => {
    const litmit = start > end ? number : end;
    let output = [];
    for (let i = start; i <= litmit; i++) {
        output.push(i);
    }

    if (start > end) {
        for (let i = 0; i <= end; i++) {
            output.push(i);
        }
    }
    return output;
};

export const handleNumber = (nun) => {
    if (nun > Math.pow(10, 6)) {
        return `${Math.round((nun * 10) / Math.pow(10, 6) / 10)}M`;
    } else if (nun < 1000) {
        return nun;
    } else {
        return `${Math.round((nun * 10) / Math.pow(10, 3) / 10)}K`;
    }
};

export const formatNum = (num) => {
    return new Intl.NumberFormat('de-DE', { style: 'decimal', currency: 'EUR' }).format(+num);
};

export const converArea = (area) => {
    if (area === 'vn') {
        return 'Việt Nam';
    } else if (area === 'us') {
        return 'US-UK';
    } else {
        return 'K-Pop';
    }
};
