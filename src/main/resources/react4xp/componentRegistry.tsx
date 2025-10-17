
import {ComponentRegistry} from '@enonic/react-components';

// Pages
import { Page } from '/react4xp/pages/Page/Page';

// Macros
import { EmbedMacro } from '/react4xp/macros/embed/EmbedMacro';

// Layouts
import { FourColumn } from '/react4xp/layouts/fourcolumn/FourColumn';
import { FourColumn2Row } from '/react4xp/layouts/fourcolumn2row/FourColumn2Row';
import { SingleColumn } from '/react4xp/layouts/singlecolumn/SingleColumn';
import { SingleColumn2Row } from '/react4xp/layouts/singlecolumn2row/SingleColumn2Row';
import { ThreeColumn } from '/react4xp/layouts/threecolumn/ThreeColumn';
import { ThreeColumn2Row } from '/react4xp/layouts/threecolumn2row/ThreeColumn2Row';
import { TwoColumn } from '/react4xp/layouts/twocolumn/TwoColumn';
import { TwoColumn2Row } from '/react4xp/layouts/twocolumn2row/TwoColumn2Row';
import { UnderConstruction } from '/react4xp/layouts/under-construction/UnderConstruction';

// Parts - Only parts that had .es6 implementations in upstream/develop branch
// All part components end with "Part" suffix to distinguish from pure React components
import { ArticlePart } from '/react4xp/parts/article/ArticlePart';
import { ArticleListPart } from '/react4xp/parts/articlelist/ArticleListPart';
import { BoardPart } from '/react4xp/parts/board/BoardPart';
import { BoardPresentationPart } from '/react4xp/parts/boardpresentation/BoardPresentationPart';
import { BookPart } from '/react4xp/parts/book/BookPart';
import { BookListPart } from '/react4xp/parts/booklist/BookListPart';
import { BudgetCutListPart } from '/react4xp/parts/budgetcutlist/BudgetCutListPart';
import { ButtonPart } from '/react4xp/parts/Button/ButtonPart';
import { CandidateBlockPart } from '/react4xp/parts/candidateblock/CandidateBlockPart';
import { CandidateListPart } from '/react4xp/parts/candidatelist/CandidateListPart';
import { CandidatePagePart } from '/react4xp/parts/candidatepage/CandidatePagePart';
import { CandidatePresentationPart } from '/react4xp/parts/candidatepresentation/CandidatePresentationPart';
import { EventPart } from '/react4xp/parts/event/EventPart';
import { EventListPart } from '/react4xp/parts/eventlist/EventListPart';
import { FancyHeaderPart } from '/react4xp/parts/fancyheader/FancyHeaderPart';
import { FaqPart } from '/react4xp/parts/faq/FaqPart';
import { FaqListPart } from '/react4xp/parts/faqlist/FaqListPart';
import { GroupPart } from '/react4xp/parts/group/GroupPart';
import { ImageBlockPart } from '/react4xp/parts/imageblock/ImageBlockPart';
import { IntroBlockPart } from '/react4xp/parts/introblock/IntroBlockPart';
import { JoinPart } from '/react4xp/parts/join/JoinPart';
import { LocalBlockPart } from '/react4xp/parts/localblock/LocalBlockPart';
import { LocalBranchPart } from '/react4xp/parts/localbranch/LocalBranchPart';
import { LocalBranchesPart } from '/react4xp/parts/localbranches/LocalBranchesPart';
import { MissionsBlockPart } from '/react4xp/parts/missionsblock/MissionsBlockPart';
import { OrganizationalPositionPart } from '/react4xp/parts/organizational-position/OrganizationalPositionPart';
import { PersonPart } from '/react4xp/parts/person/PersonPart';
import { PersonListPart } from '/react4xp/parts/personlist/PersonListPart';
import { ProgrammeMainPart } from '/react4xp/parts/programme-main/ProgrammeMainPart';
import { ProgrammePartPart } from '/react4xp/parts/programme-part/ProgrammePartPart';
import { ProgrammeSectionPart } from '/react4xp/parts/programme-section/ProgrammeSectionPart';
import { QuotePart } from '/react4xp/parts/quote/QuotePart';
import { SubmenuPart } from '/react4xp/parts/submenu/SubmenuPart';
import { TextBlockPart } from '/react4xp/parts/textblock/TextBlockPart';
import { TitleBlockPart } from '/react4xp/parts/titleblock/TitleBlockPart';
// Note: test part exists but was not in upstream/develop .es6 files

export const componentRegistry = new ComponentRegistry();

// Page descriptors
componentRegistry.addPage('lib.no:default', {View: Page});

// Layouts
componentRegistry.addLayout('lib.no:fourcolumn', {View: FourColumn});
componentRegistry.addLayout('lib.no:fourcolumn2row', {View: FourColumn2Row});
componentRegistry.addLayout('lib.no:singlecolumn', {View: SingleColumn});
componentRegistry.addLayout('lib.no:singlecolumn2row', {View: SingleColumn2Row});
componentRegistry.addLayout('lib.no:threecolumn', {View: ThreeColumn});
componentRegistry.addLayout('lib.no:threecolumn2row', {View: ThreeColumn2Row});
componentRegistry.addLayout('lib.no:twocolumn', {View: TwoColumn});
componentRegistry.addLayout('lib.no:twocolumn2row', {View: TwoColumn2Row});
componentRegistry.addLayout('lib.no:under-construction', {View: UnderConstruction});

// Parts - Only parts that had .es6 implementations in upstream/develop
componentRegistry.addPart('lib.no:article', {View: ArticlePart});
componentRegistry.addPart('lib.no:articlelist', {View: ArticleListPart});
componentRegistry.addPart('lib.no:board', {View: BoardPart});
componentRegistry.addPart('lib.no:boardpresentation', {View: BoardPresentationPart});
componentRegistry.addPart('lib.no:book', {View: BookPart});
componentRegistry.addPart('lib.no:booklist', {View: BookListPart});
componentRegistry.addPart('lib.no:budgetcutlist', {View: BudgetCutListPart});
componentRegistry.addPart('lib.no:button', {View: ButtonPart});
componentRegistry.addPart('lib.no:candidateblock', {View: CandidateBlockPart});
componentRegistry.addPart('lib.no:candidatelist', {View: CandidateListPart});
componentRegistry.addPart('lib.no:candidatepage', {View: CandidatePagePart});
componentRegistry.addPart('lib.no:candidatepresentation', {View: CandidatePresentationPart});
componentRegistry.addPart('lib.no:event', {View: EventPart});
componentRegistry.addPart('lib.no:eventlist', {View: EventListPart});
componentRegistry.addPart('lib.no:fancyheader', {View: FancyHeaderPart});
componentRegistry.addPart('lib.no:faq', {View: FaqPart});
componentRegistry.addPart('lib.no:faqlist', {View: FaqListPart});
componentRegistry.addPart('lib.no:group', {View: GroupPart});
componentRegistry.addPart('lib.no:imageblock', {View: ImageBlockPart});
componentRegistry.addPart('lib.no:introblock', {View: IntroBlockPart});
componentRegistry.addPart('lib.no:join', {View: JoinPart});
componentRegistry.addPart('lib.no:localblock', {View: LocalBlockPart});
componentRegistry.addPart('lib.no:localbranch', {View: LocalBranchPart});
componentRegistry.addPart('lib.no:localbranches', {View: LocalBranchesPart});
componentRegistry.addPart('lib.no:missionsblock', {View: MissionsBlockPart});
componentRegistry.addPart('lib.no:organizational-position', {View: OrganizationalPositionPart});
componentRegistry.addPart('lib.no:pagelist', {View: ArticleListPart}); // Reuses ArticleList component
componentRegistry.addPart('lib.no:person', {View: PersonPart});
componentRegistry.addPart('lib.no:personlist', {View: PersonListPart});
componentRegistry.addPart('lib.no:programme-main', {View: ProgrammeMainPart});
componentRegistry.addPart('lib.no:programme-part', {View: ProgrammePartPart});
componentRegistry.addPart('lib.no:programme-section', {View: ProgrammeSectionPart});
componentRegistry.addPart('lib.no:quote', {View: QuotePart});
componentRegistry.addPart('lib.no:submenu', {View: SubmenuPart});
componentRegistry.addPart('lib.no:textblock', {View: TextBlockPart});
componentRegistry.addPart('lib.no:titleblock', {View: TitleBlockPart});

// Macros
componentRegistry.addMacro('embed', {View: EmbedMacro});
