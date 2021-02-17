import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const Faq = ({ question, answer, expandable = false, expanded = true, Tag = 'h2' }) => {
  const [visible, setVisible] = useState(expanded);

  const toggleIcon = () => setVisible(!visible);

  const keyDownHandler = (e) => {
    if (['Enter', 'Space'].includes(e.code)) {
      setVisible(!visible);
    }
  };
  
  const headerContent = (
    <>
      <FontAwesomeIcon icon={expandable && visible ? faChevronUp : faChevronRight} />  {question}
    </>
  );
  
  const answerItem = (
    <>
      <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="rich-text">
        <div itemProp="text" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </>
  );
  
  const headerItem = Tag === 'h2' ? (
    <h2
      itemProp="name"
      tabIndex={expandable ? -1 : null}
      onKeyDown={expandable ? keyDownHandler : null} 
      role={expandable ? 'button' : null}
      aria-pressed={expandable ? visible : null}
      onClick={expandable ? toggleIcon : null}
    >
      {headerContent}
    </h2>
  ) : (
    <h3
      itemProp="name"
      tabIndex={expandable ? -1 : null}
      onKeyDown={expandable ? keyDownHandler : null} 
      role={expandable ? 'button' : null}
      aria-pressed={expandable ? visible : null}
      onClick={expandable ? toggleIcon : null}
    >
      {headerContent}
    </h3>
  )

  return (
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
      {headerItem}
      { (!expandable || visible) && answerItem }
    </div>
  );
};

Faq.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool,
  Tag: PropTypes.string,
};

Faq.defaultProps = {
  question: '',
  answer: '',
  expandable: false,
  expanded: true,
  Tag: 'h2',
};

export default Faq;

export {
  Faq,
};
