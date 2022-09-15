import type { Element } from '../globals';

type meterAttributes = ['form', 'high', 'low', 'max', 'min', 'optimum', 'value'];

export type meterElement = Element<meterAttributes>;
