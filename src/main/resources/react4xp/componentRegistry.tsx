
import {ComponentRegistry} from '@enonic/react-components';

import {SingleColumn} from './components/layouts/singlecolumn/SingleColumn';
import {TwoColumn} from './components/layouts/twocolumn/TwoColumn';
import {ThreeColumn} from './components/layouts/threecolumn/ThreeColumn';
import {FourColumn} from './components/layouts/fourcolumn/FourColumn';
import {SingleColumn2Row} from './components/layouts/singlecolumn2row/SingleColumn2Row';
import {TwoColumn2Row} from './components/layouts/twocolumn2row/TwoColumn2Row';
import {ThreeColumn2Row} from './components/layouts/threecolumn2row/ThreeColumn2Row';
import {FourColumn2Row} from './components/layouts/fourcolumn2row/FourColumn2Row';
import {UnderConstruction} from './components/layouts/under-construction/UnderConstruction';
import { SitePage } from './components/pages/site/SitePage';
import {Page} from './components/pages/Page/Page';
import {UnderConstructionPage} from './components/pages/under-construction/UnderConstructionPage';
import {Article} from './components/parts/article/Article';
import {ArticleList} from './components/parts/articlelist/ArticleList';
import {Board} from './components/parts/board/Board';
import {BoardPresentation} from './components/parts/boardpresentation/BoardPresentation';
import {BookCard} from './components/parts/book/BookCard';
import {BookList} from './components/parts/booklist/BookList';
import {BudgetCutList} from './components/parts/budgetcutlist/BudgetCutList';
import {Button} from './components/parts/button/Button';
import {LBCandidateBlock} from './components/parts/candidateblock/LBCandidateBlock';
import {CandidateList} from './components/parts/candidatelist/CandidateList';
import {CandidatePage} from './components/parts/candidatepage/CandidatePage';
import {CandidatePresentationList} from './components/parts/candidatepresentation/CandidatePresentationList';
import {Event} from './components/parts/event/Event';
import {EventList} from './components/parts/eventlist/EventList';
import {FancyHeader} from './components/parts/fancyheader/FancyHeader';
import {FaqItem} from './components/parts/faq/FaqItem';
import {FaqList} from './components/parts/faqlist/FaqList';
import {Group} from './components/parts/group/Group';
import {ImageBlock} from './components/parts/imageblock/ImageBlock';
import {IntroBlock} from './components/parts/introblock/IntroBlock';
import {Join} from './components/parts/join/Join';
import {LocalBranchesBlock} from './components/parts/localbranches/LocalBranchesBlock';
import {MissionsBlock} from './components/parts/missionsblock/MissionsBlock';
import {Schedule} from './components/parts/organizational-position/Schedule';
import {Person} from './components/parts/person/Person';
import {PersonList} from './components/parts/personlist/PersonList';
import {ProgrammeMain} from './components/parts/programme-main/ProgrammeMain';
import {ProgrammePart} from './components/parts/programme-part/ProgrammePart';
import {ProgrammeSection} from './components/parts/programme-section/ProgrammeSection';
import {Quote} from './components/parts/quote/Quote';
import {Menu} from './components/parts/submenu/Menu';
import {TextBlock} from './components/parts/textblock/TextBlock';
import {TitleBlock} from './components/parts/titleblock/TitleBlock';
import {TestPart} from './components/parts/test/TestPart';

export const componentRegistry = new ComponentRegistry();

// portal:site needs a base content type view
// Page descriptor views (lib.no:default) will be used instead when a page descriptor is set
componentRegistry.addContentType('portal:site', {View: SitePage});
componentRegistry.addLayout('lib.no:singlecolumn', {View: SingleColumn});
componentRegistry.addLayout('lib.no:twocolumn', {View: TwoColumn});
componentRegistry.addLayout('lib.no:threecolumn', {View: ThreeColumn});
componentRegistry.addLayout('lib.no:fourcolumn', {View: FourColumn});
componentRegistry.addLayout('lib.no:singlecolumn2row', {View: SingleColumn2Row});
componentRegistry.addLayout('lib.no:twocolumn2row', {View: TwoColumn2Row});
componentRegistry.addLayout('lib.no:threecolumn2row', {View: ThreeColumn2Row});
componentRegistry.addLayout('lib.no:fourcolumn2row', {View: FourColumn2Row});

componentRegistry.addPage('lib.no:default', {View: Page});
componentRegistry.addPage('lib.no:under-construction', {View: UnderConstructionPage});
componentRegistry.addPart('lib.no:article', {View: Article});
componentRegistry.addPart('lib.no:articlelist', {View: ArticleList});
componentRegistry.addPart('lib.no:board', {View: Board});
componentRegistry.addPart('lib.no:boardpresentation', {View: BoardPresentation});
componentRegistry.addPart('lib.no:book', {View: BookCard});
componentRegistry.addPart('lib.no:booklist', {View: BookList});
componentRegistry.addPart('lib.no:budgetcutlist', {View: BudgetCutList});
componentRegistry.addPart('lib.no:button', {View: Button});
componentRegistry.addPart('lib.no:candidateblock', {View: LBCandidateBlock});
componentRegistry.addPart('lib.no:candidatelist', {View: CandidateList});
componentRegistry.addPart('lib.no:candidatepage', {View: CandidatePage});
componentRegistry.addPart('lib.no:candidatepresentation', {View: CandidatePresentationList});
componentRegistry.addPart('lib.no:event', {View: Event});
componentRegistry.addPart('lib.no:eventlist', {View: EventList});
componentRegistry.addPart('lib.no:fancyheader', {View: FancyHeader});
componentRegistry.addPart('lib.no:faq', {View: FaqItem});
componentRegistry.addPart('lib.no:faqlist', {View: FaqList});
componentRegistry.addPart('lib.no:group', {View: Group});
componentRegistry.addPart('lib.no:imageblock', {View: ImageBlock});
componentRegistry.addPart('lib.no:introblock', {View: IntroBlock});
componentRegistry.addPart('lib.no:join', {View: Join});
componentRegistry.addPart('lib.no:localblock', {View: ImageBlock}); // Reuses ImageBlock
componentRegistry.addPart('lib.no:localbranch', {View: LocalBranchesBlock}); // Reuses LocalBranchesBlock
componentRegistry.addPart('lib.no:localbranches', {View: LocalBranchesBlock});
componentRegistry.addPart('lib.no:missionsblock', {View: MissionsBlock});
componentRegistry.addPart('lib.no:organizational-position', {View: Schedule});
componentRegistry.addPart('lib.no:pagelist', {View: ArticleList}); // Reuses ArticleList
componentRegistry.addPart('lib.no:person', {View: Person});
componentRegistry.addPart('lib.no:personlist', {View: PersonList});
componentRegistry.addPart('lib.no:programme-main', {View: ProgrammeMain});
componentRegistry.addPart('lib.no:programme-part', {View: ProgrammePart});
componentRegistry.addPart('lib.no:programme-section', {View: ProgrammeSection});
componentRegistry.addPart('lib.no:quote', {View: Quote});
componentRegistry.addPart('lib.no:submenu', {View: Menu});
componentRegistry.addPart('lib.no:textblock', {View: TextBlock});
componentRegistry.addPart('lib.no:titleblock', {View: TitleBlock});
componentRegistry.addPart('lib.no:test', {View: TestPart});
