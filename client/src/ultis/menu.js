import icons from '../ultis/icons';

const { MdOutlineLibraryMusic, MdOutlineFeed, TbChartArcs, HiOutlineChartPie } = icons;

export const sideBarMenu = [
    {
        path: 'mymusic',
        text: 'Cá Nhân',
        icon: <MdOutlineLibraryMusic size={24} />,
        end: true,
    },
    {
        path: '',
        text: 'Khám Phá',
        icon: <TbChartArcs size={24} />,
        end: true,
    },
    {
        path: 'zing-chart',
        text: '#Zingchart',
        icon: <HiOutlineChartPie size={24} />,
        end: true,
    },
    {
        path: 'follow',
        text: 'Theo Dỗi',
        icon: <MdOutlineFeed size={24} />,
        end: true,
    },
];

export const searchMenu = [
    {
        path: 'tat-ca',
        text: 'TẤT CẢ',
    },
    {
        path: 'bai-hat',
        text: 'BÀI HÁT',
    },
    {
        path: 'playlist',
        text: 'PLAYLIST/ALBUM',
    },
];
