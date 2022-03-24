import * as s from 'superstruct';
// TODO: move to shared
import { v4 as isUuidV4 } from 'is-uuid';
// @ts-expect-error: isUuidV4 is expecting a string
export const uuidV4 = s.define<string>('UuidV4', isUuidV4);
