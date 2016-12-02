import constants from '../../constants';
import * as modifiers from './modifiers';
import exporter from '../exporter';


const initial = {
    list: [],
    zones: []
};

const handlers = {
    [constants.ITEMS_FETCHED]: modifiers.onItems,
    [constants.ZONES_FETCHED]: modifiers.onZones,
    [constants.LOGOUT]: modifiers.onLogout
};

export default exporter(initial, handlers);
