import type { Element } from '../globals';

type unknownAttributes = ['align', 'bgcolor', 'char', 'charoff', 'span', 'valign', 'width'];

export type unknownElement = Element<unknownAttributes>;
