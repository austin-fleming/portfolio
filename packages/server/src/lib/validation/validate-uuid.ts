import type { Uuid } from '@db/types';

// 8-4-4-4-12
export const isMaybeUuid = (maybeUuid: string): maybeUuid is Uuid => {
    if (!maybeUuid || maybeUuid.length !== 36) return false;

    const segments = maybeUuid.split('-');

    return (
        segments.length === 5 &&
        segments[0].length === 8 &&
        segments[1].length === 4 &&
        segments[2].length === 4 &&
        segments[3].length === 4 &&
        segments[4].length === 12
    ); // TODO: might be inevitable
};
