import {ComponentRegistry} from '@enonic/react-components';
import {Hello} from './components/hello/Hello';
import {SingleColumn} from './components/layouts/singlecolumn/SingleColumn';
import {TwoColumn} from './components/layouts/twocolumn/TwoColumn';
import {ThreeColumn} from './components/layouts/threecolumn/ThreeColumn';
import {FourColumn} from './components/layouts/fourcolumn/FourColumn';
import {SingleColumn2Row} from './components/layouts/singlecolumn2row/SingleColumn2Row';
import {TwoColumn2Row} from './components/layouts/twocolumn2row/TwoColumn2Row';
import {ThreeColumn2Row} from './components/layouts/threecolumn2row/ThreeColumn2Row';
import {FourColumn2Row} from './components/layouts/fourcolumn2row/FourColumn2Row';
import {UnderConstruction} from './components/layouts/under-construction/UnderConstruction';

export const componentRegistry = new ComponentRegistry();

componentRegistry.addContentType('portal:site', {View: Hello});
componentRegistry.addLayout('lib.no:singlecolumn', {View: SingleColumn});
componentRegistry.addLayout('lib.no:twocolumn', {View: TwoColumn});
componentRegistry.addLayout('lib.no:threecolumn', {View: ThreeColumn});
componentRegistry.addLayout('lib.no:fourcolumn', {View: FourColumn});
componentRegistry.addLayout('lib.no:singlecolumn2row', {View: SingleColumn2Row});
componentRegistry.addLayout('lib.no:twocolumn2row', {View: TwoColumn2Row});
componentRegistry.addLayout('lib.no:threecolumn2row', {View: ThreeColumn2Row});
componentRegistry.addLayout('lib.no:fourcolumn2row', {View: FourColumn2Row});
componentRegistry.addLayout('lib.no:under-construction', {View: UnderConstruction});