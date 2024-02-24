import React from 'react';
import { IconBadgeWc, IconStairs, IconBook2, IconEscalatorUp, IconParking, IconBackpack, IconBuildingTunnel } from '@tabler/icons-react';
import { wcIcon, stairsIcon, bookIcon, escalatorIcon, parkingIcon, packbackIcon, tunnelIcon } from './mapIcons';

const utilities = [
    {
        label: 'washroom',
        icon: <IconBadgeWc />,
        mapIcon: wcIcon,
        locations: [
            {
                coords: [49.80939896028802, -97.13052928447725],
                image: 'https://thevarsity.ca/wp-content/uploads/2016/02/YASSINE-ELBARADIE-UC-sexual-assault-follow-up-UC-Washroom.jpg'
            },
            {
                coords: [49.80924310104695, -97.13101744651796],
                image: 'https://www.constructioncanada.net/wp-content/uploads/2014/07/bigstock-Men-s-Room-6724056.jpg'
            }
        ]
    },
    {
        label: 'staircase',
        icon: <IconStairs />,
        mapIcon: stairsIcon,
        locations: [
            {
                coords: [49.80974184885172, -97.13145196437837],
                image: 'https://umidabdullaev.weebly.com/uploads/1/5/6/8/15686522/6532791_orig.jpg'
            },
            {
                coords: [49.81024751846262, -97.13164508342744],
                image: 'https://inhabitat.com/wp-content/blogs.dir/1/files/2016/04/Active-Living-Centre-Elevated-Track.jpg'
            }
        ]
    },
    {
        label: 'escalator',
        icon: <IconEscalatorUp />,
        mapIcon: escalatorIcon,
        locations: [
            {
                coords: [49.810773963403356, -97.13210642337799],
                image: 'https://amaprojects.com.au/wp-content/uploads/2020/03/file3-5-1780x1000-2.jpg'
            },
            {
                coords: [49.81138352407593, -97.13042736053468],
                image: 'https://www.templelifts.com/wp-content/uploads/2021/01/escalator-replacement_1189016423-scaled.jpg'
            }
        ]
    },
    {
        label: 'tunnel',
        icon: <IconBuildingTunnel />,
        mapIcon: tunnelIcon,
        locations: [
            {
                coords: [49.8118961032448, -97.13055074214937],
                image: 'https://eppsiepman.com/wp-content/uploads/2019/02/UM-Con-Ed-Tunnel.jpg'
            },
            {
                coords: [49.81109259834895, -97.13238537311555],
                image: 'https://www.reddit.com/media?url=https%3A%2F%2Fexternal-preview.redd.it%2FoTMGP5TrqmUTYfP7fSQYSxhaton5vsSzgKvWnTX9ziw.jpg%3Fauto%3Dwebp%26s%3D9487a7072c9f59fec8b8228bb93dc32104b1e56a'
            }
        ]
    },
    {
        label: 'library',
        icon: <IconBook2 />,
        mapIcon: bookIcon,
        locations: [
            {
                coords: [49.81125537843548, -97.13334023952486],
                image: 'https://news.umanitoba.ca/wp-content/uploads/2014/12/4-Sciences-and-Technology-Library-Foyer.jpg'
            },
            {
                coords: [49.81093328113837, -97.1338552236557],
                image: 'https://eppsiepman.com/wp-content/uploads/2017/02/1183FF.jpg'
            }
        ]
    },
    {
        label: 'parking lot',
        icon: <IconParking />,
        mapIcon: parkingIcon,
        locations: [
            {
                coords: [49.81073586560642, -97.13373184204103],
                image: 'https://www.stthomas.edu/_media-library/_images/campus-safety/stthomas-parking-transportation-student-lot.jpg'
            },
            {
                coords: [49.81051074164873, -97.13343679904939],
                image: 'https://www.umanitoba.ca/sites/default/files/styles/21x9_1100w/public/2023-09/U%20of%20M%20Parking%20-%20Drone%20Shots-40.jpg?itok=VIWs4m_d'
            }
        ]
    },
    {
        label: 'study space',
        icon: <IconBackpack />,
        mapIcon: packbackIcon,
        locations: [
            {
                coords: [49.81074279248084, -97.1346652507782],
                image: 'https://umanitoba.ca/libraries/sites/libraries/files/styles/3x2_900w/public/2020-12/management-library.jpg?itok=u1rEl4ID'
            },
            {
                coords: [49.81134196336484, -97.13458478450777],
                image: 'https://umanitoba.ca/education/sites/education/files/styles/3x2_1200w/public/2020-07/education-indigenous-student-community-space.jpg?itok=UBhL4goT'
            }
        ]
    }
];

export default utilities;
