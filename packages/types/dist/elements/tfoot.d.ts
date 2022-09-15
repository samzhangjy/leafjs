import type { Element } from '../globals';

type unknownAttributes = ['align', 'bgcolor', 'char', 'charoff', 'valign'];

export type unknownElement = Element<unknownAttributes>;
