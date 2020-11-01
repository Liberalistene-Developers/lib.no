import React from 'react';

import FAQ from '../faq/faq.jsx';

export default ({ faqs }) => (
  <>
    { faqs && faqs.length && faqs
        .map(({ faqID, answer, question }) => (
          <FAQ key={faqID} answer={answer} question={question} />
        ))
    }
  </>
);
