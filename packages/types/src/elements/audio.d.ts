import type { Element } from '../globals';

type audioAttributes = ['autoPlay', 'controls', 'loop', 'muted', 'preload', 'src'];

export type audioElement = Element<audioAttributes>;
