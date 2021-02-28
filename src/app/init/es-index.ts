import { EsTemplate } from './es-template';
import { EsMapping } from './es-mapping';
import { EsSetting } from './es-setting';

export interface EsIndex {
  isOutdated: boolean;
  mapping: EsMapping;
  setting: EsSetting;
  template: EsTemplate;
  aliases: string[];
  documents: number;
}
