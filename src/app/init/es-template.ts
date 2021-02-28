import { EsMapping } from './es-mapping';
import { EsSetting } from './es-setting';

export interface EsTemplate {
  isOutdated: boolean;
  indexPattern: string;
  mapping: EsMapping;
  setting: EsSetting;
  updated: Date;
}
