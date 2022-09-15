import type { Element } from '../globals';

type unknownAttributes = ['frameborder', 'marginheight', 'marginwidth', 'name', 'noresize', 'scrolling', 'src'];

export type unknownElement = Element<unknownAttributes>;
