import React from 'react';
import { IconBadgeWc, IconStairs, IconBook2, IconEscalatorUp, IconParking, IconBackpack, IconBuildingTunnel } from '@tabler/icons-react';
import { wcIcon, stairsIcon, bookIcon, escalatorIcon, parkingIcon, packbackIcon, tunnelIcon } from './mapIcons';

const utilities = [
    {
        label: 'washroom',
        icon: <IconBadgeWc />,
        mapIcon: wcIcon,
        locations: [
            [49.80939896028802, -97.13052928447725],
            [49.80924310104695, -97.13101744651796]
        ]
    },
    {
        label: 'staircase',
        icon: <IconStairs />,
        mapIcon: stairsIcon,
        locations: [
            [49.80974184885172, -97.13145196437837],
            [49.81024751846262, -97.13164508342744]
        ]
    },
    {
        label: 'escalator',
        icon: <IconEscalatorUp />,
        mapIcon: escalatorIcon,
        locations: [
            [49.810773963403356, -97.13210642337799],
            [49.81138352407593, -97.13042736053468]
        ]
    },
    {
        label: 'tunnel',
        icon: <IconBuildingTunnel />,
        mapIcon: tunnelIcon,
        locations: [
            [49.8118961032448, -97.13055074214937],
            [49.81109259834895, -97.13238537311555]
        ]
    },
    {
        label: 'library',
        icon: <IconBook2 />,
        mapIcon: bookIcon,
        locations: [
            [49.81125537843548, -97.13334023952486],
            [49.81093328113837, -97.1338552236557]
        ]
    },
    {
        label: 'parking lot',
        icon: <IconParking />,
        mapIcon: parkingIcon,
        locations: [
            [49.81073586560642, -97.13373184204103],
            [49.81051074164873, -97.13343679904939]
        ]
    },
    {
        label: 'study space',
        icon: <IconBackpack />,
        mapIcon: packbackIcon,
        locations: [
            [49.81074279248084, -97.1346652507782],
            [49.81134196336484, -97.13458478450777]
        ]
    }
];

export default utilities;
