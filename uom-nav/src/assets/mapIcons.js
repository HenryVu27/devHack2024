import { Icon } from 'leaflet';

const pinIcon = new Icon({
    iconUrl: require('./icons/map-pin-filled.png'),
    iconSize: [38, 38] // size of the icon
});

const selfIcon = new Icon({
    iconUrl: require('./icons/map-pin-filled-self.png'),
    iconSize: [38, 38] // size of the icon
});

const wcIcon = new Icon({
    iconUrl: require('./icons/badge-wc.png'),
    iconSize: [38, 38] // size of the icon
});

const stairsIcon = new Icon({
    iconUrl: require('./icons/stairs.png'),
    iconSize: [38, 38] // size of the icon
});

const bookIcon = new Icon({
    iconUrl: require('./icons/book-2.png'),
    iconSize: [38, 38] // size of the icon
});

const escalatorIcon = new Icon({
    iconUrl: require('./icons/escalator-up.png'),
    iconSize: [38, 38] // size of the icon
});

const parkingIcon = new Icon({
    iconUrl: require('./icons/parking.png'),
    iconSize: [38, 38] // size of the icon
});

const packbackIcon = new Icon({
    iconUrl: require('./icons/backpack.png'),
    iconSize: [38, 38] // size of the icon
});

const tunnelIcon = new Icon({
    iconUrl: require('./icons/building-tunnel.png'),
    iconSize: [38, 38] // size of the icon
});

export { pinIcon, wcIcon, stairsIcon, bookIcon, escalatorIcon, parkingIcon, packbackIcon, tunnelIcon, selfIcon };
