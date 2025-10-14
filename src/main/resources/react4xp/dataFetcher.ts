import { DataFetcher } from '/lib/enonic/react4xp';

// Common
import { commonProcessor } from '/react4xp/common/CommonProcessor/CommonProcessor';

// Content types
import { fragmentProcessor } from '/react4xp/content-types/portal-fragment/FragmentProcessor';

// Pages
import { pageProcessor } from '/react4xp/pages/Page/PageProcessor';

// Layouts
import { fourColumnProcessor } from '/react4xp/layouts/fourcolumn/FourColumnProcessor';
import { fourColumn2RowProcessor } from '/react4xp/layouts/fourcolumn2row/FourColumn2RowProcessor';
import { singleColumnProcessor } from '/react4xp/layouts/singlecolumn/SingleColumnProcessor';
import { singleColumn2RowProcessor } from '/react4xp/layouts/singlecolumn2row/SingleColumn2RowProcessor';
import { threeColumnProcessor } from '/react4xp/layouts/threecolumn/ThreeColumnProcessor';
import { threeColumn2RowProcessor } from '/react4xp/layouts/threecolumn2row/ThreeColumn2RowProcessor';
import { twoColumnProcessor } from '/react4xp/layouts/twocolumn/TwoColumnProcessor';
import { twoColumn2RowProcessor } from '/react4xp/layouts/twocolumn2row/TwoColumn2RowProcessor';
import { underConstructionProcessor } from '/react4xp/layouts/under-construction/UnderConstructionProcessor';

// Parts - Only parts that had .es6 implementations in upstream/develop
import { articleProcessor } from '/react4xp/parts/article/ArticleProcessor';
import { articleListProcessor } from '/react4xp/parts/articlelist/ArticleListProcessor';
import { boardProcessor } from '/react4xp/parts/board/BoardProcessor';
import { boardPresentationProcessor } from '/react4xp/parts/boardpresentation/BoardPresentationProcessor';
import { bookProcessor } from '/react4xp/parts/book/BookProcessor';
import { bookListProcessor } from '/react4xp/parts/booklist/BookListProcessor';
import { budgetCutListProcessor } from '/react4xp/parts/budgetcutlist/BudgetCutListProcessor';
import { buttonProcessor } from '/react4xp/parts/Button/ButtonProcessor';
import { candidateBlockProcessor } from '/react4xp/parts/candidateblock/CandidateBlockProcessor';
import { candidateListProcessor } from '/react4xp/parts/candidatelist/CandidateListProcessor';
import { candidatePageProcessor } from '/react4xp/parts/candidatepage/CandidatePageProcessor';
import { candidatePresentationProcessor } from '/react4xp/parts/candidatepresentation/CandidatePresentationProcessor';
import { eventProcessor } from '/react4xp/parts/event/EventProcessor';
import { eventListProcessor } from '/react4xp/parts/eventlist/EventListProcessor';
import { fancyHeaderProcessor } from '/react4xp/parts/fancyheader/FancyHeaderProcessor';
import { faqProcessor } from '/react4xp/parts/faq/FaqProcessor';
import { faqListProcessor } from '/react4xp/parts/faqlist/FaqListProcessor';
import { groupProcessor } from '/react4xp/parts/group/GroupProcessor';
import { imageBlockProcessor } from '/react4xp/parts/imageblock/ImageBlockProcessor';
import { introBlockProcessor } from '/react4xp/parts/introblock/IntroBlockProcessor';
import { joinProcessor } from '/react4xp/parts/join/JoinProcessor';
// Note: localblock and localbranch had .es6 files but React components not yet created
import { localBranchesProcessor } from '/react4xp/parts/localbranches/LocalBranchesProcessor';
import { missionsBlockProcessor } from '/react4xp/parts/missionsblock/MissionsBlockProcessor';
import { organizationalPositionProcessor } from '/react4xp/parts/organizational-position/OrganizationalPositionProcessor';
import { pageListProcessor } from '/react4xp/parts/pagelist/PageListProcessor';
import { personProcessor } from '/react4xp/parts/person/PersonProcessor';
import { personListProcessor } from '/react4xp/parts/personlist/PersonListProcessor';
import { programmeMainProcessor } from '/react4xp/parts/programme-main/ProgrammeMainProcessor';
import { programmePartProcessor } from '/react4xp/parts/programme-part/ProgrammePartProcessor';
import { programmeSectionProcessor } from '/react4xp/parts/programme-section/ProgrammeSectionProcessor';
import { quoteProcessor } from '/react4xp/parts/quote/QuoteProcessor';
import { submenuProcessor } from '/react4xp/parts/submenu/SubmenuProcessor';
import { textBlockProcessor } from '/react4xp/parts/textblock/TextBlockProcessor';
import { titleBlockProcessor } from '/react4xp/parts/titleblock/TitleBlockProcessor';
// Note: test processor exists but was not in upstream/develop .es6 files

export const dataFetcher = new DataFetcher();


// Content types
// dataFetcher.addContentType('portal:fragment', {processor: fragmentProcessor});

// Page descriptor
dataFetcher.addPage('lib.no:default', {processor: pageProcessor});

// Common processor - runs for all pages
dataFetcher.addCommon({processor: commonProcessor});


// Layouts
dataFetcher.addLayout('lib.no:fourcolumn', {processor: fourColumnProcessor});
dataFetcher.addLayout('lib.no:fourcolumn2row', {processor: fourColumn2RowProcessor});
dataFetcher.addLayout('lib.no:singlecolumn', {processor: singleColumnProcessor});
dataFetcher.addLayout('lib.no:singlecolumn2row', {processor: singleColumn2RowProcessor});
dataFetcher.addLayout('lib.no:threecolumn', {processor: threeColumnProcessor});
dataFetcher.addLayout('lib.no:threecolumn2row', {processor: threeColumn2RowProcessor});
dataFetcher.addLayout('lib.no:twocolumn', {processor: twoColumnProcessor});
dataFetcher.addLayout('lib.no:twocolumn2row', {processor: twoColumn2RowProcessor});
dataFetcher.addLayout('lib.no:under-construction', {processor: underConstructionProcessor});

// Parts - Only parts that had .es6 implementations in upstream/develop
dataFetcher.addPart('lib.no:article', {processor: articleProcessor});
dataFetcher.addPart('lib.no:articlelist', {processor: articleListProcessor});
dataFetcher.addPart('lib.no:board', {processor: boardProcessor});
dataFetcher.addPart('lib.no:boardpresentation', {processor: boardPresentationProcessor});
dataFetcher.addPart('lib.no:book', {processor: bookProcessor});
dataFetcher.addPart('lib.no:booklist', {processor: bookListProcessor});
dataFetcher.addPart('lib.no:budgetcutlist', {processor: budgetCutListProcessor});
dataFetcher.addPart('lib.no:button', {processor: buttonProcessor});
dataFetcher.addPart('lib.no:candidateblock', {processor: candidateBlockProcessor});
dataFetcher.addPart('lib.no:candidatelist', {processor: candidateListProcessor});
dataFetcher.addPart('lib.no:candidatepage', {processor: candidatePageProcessor});
dataFetcher.addPart('lib.no:candidatepresentation', {processor: candidatePresentationProcessor});
dataFetcher.addPart('lib.no:event', {processor: eventProcessor});
dataFetcher.addPart('lib.no:eventlist', {processor: eventListProcessor});
dataFetcher.addPart('lib.no:fancyheader', {processor: fancyHeaderProcessor});
dataFetcher.addPart('lib.no:faq', {processor: faqProcessor});
dataFetcher.addPart('lib.no:faqlist', {processor: faqListProcessor});
dataFetcher.addPart('lib.no:group', {processor: groupProcessor});
dataFetcher.addPart('lib.no:imageblock', {processor: imageBlockProcessor});
dataFetcher.addPart('lib.no:introblock', {processor: introBlockProcessor});
dataFetcher.addPart('lib.no:join', {processor: joinProcessor});
// Skip localblock - React component not created yet
// Skip localbranch - React component not created yet
dataFetcher.addPart('lib.no:localbranches', {processor: localBranchesProcessor});
dataFetcher.addPart('lib.no:missionsblock', {processor: missionsBlockProcessor});
dataFetcher.addPart('lib.no:organizational-position', {processor: organizationalPositionProcessor});
dataFetcher.addPart('lib.no:pagelist', {processor: pageListProcessor});
dataFetcher.addPart('lib.no:person', {processor: personProcessor});
dataFetcher.addPart('lib.no:personlist', {processor: personListProcessor});
dataFetcher.addPart('lib.no:programme-main', {processor: programmeMainProcessor});
dataFetcher.addPart('lib.no:programme-part', {processor: programmePartProcessor});
dataFetcher.addPart('lib.no:programme-section', {processor: programmeSectionProcessor});
dataFetcher.addPart('lib.no:quote', {processor: quoteProcessor});
dataFetcher.addPart('lib.no:submenu', {processor: submenuProcessor});
dataFetcher.addPart('lib.no:textblock', {processor: textBlockProcessor});
dataFetcher.addPart('lib.no:titleblock', {processor: titleBlockProcessor});
