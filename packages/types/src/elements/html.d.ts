import type { Element } from '../globals';

type unknownAttributes = ['manifest', 'version', 'xmlns'];

export type unknownElement = Element<unknownAttributes>;
