import {DataFetcher} from '/lib/enonic/react4xp';
import {helloProcessor} from './components/hello/HelloProcessor';
import {singleColumnProcessor} from './components/layouts/singlecolumn/SingleColumnProcessor';
import {twoColumnProcessor} from './components/layouts/twocolumn/TwoColumnProcessor';
import {threeColumnProcessor} from './components/layouts/threecolumn/ThreeColumnProcessor';
import {fourColumnProcessor} from './components/layouts/fourcolumn/FourColumnProcessor';
import {singleColumn2RowProcessor} from './components/layouts/singlecolumn2row/SingleColumn2RowProcessor';
import {twoColumn2RowProcessor} from './components/layouts/twocolumn2row/TwoColumn2RowProcessor';
import {threeColumn2RowProcessor} from './components/layouts/threecolumn2row/ThreeColumn2RowProcessor';
import {fourColumn2RowProcessor} from './components/layouts/fourcolumn2row/FourColumn2RowProcessor';
import {underConstructionProcessor} from './components/layouts/under-construction/UnderConstructionProcessor';

export const dataFetcher = new DataFetcher();

dataFetcher.addContentType('portal:site', {processor: helloProcessor});
dataFetcher.addLayout('lib.no:singlecolumn', {processor: singleColumnProcessor});
dataFetcher.addLayout('lib.no:twocolumn', {processor: twoColumnProcessor});
dataFetcher.addLayout('lib.no:threecolumn', {processor: threeColumnProcessor});
dataFetcher.addLayout('lib.no:fourcolumn', {processor: fourColumnProcessor});
dataFetcher.addLayout('lib.no:singlecolumn2row', {processor: singleColumn2RowProcessor});
dataFetcher.addLayout('lib.no:twocolumn2row', {processor: twoColumn2RowProcessor});
dataFetcher.addLayout('lib.no:threecolumn2row', {processor: threeColumn2RowProcessor});
dataFetcher.addLayout('lib.no:fourcolumn2row', {processor: fourColumn2RowProcessor});
dataFetcher.addLayout('lib.no:under-construction', {processor: underConstructionProcessor});