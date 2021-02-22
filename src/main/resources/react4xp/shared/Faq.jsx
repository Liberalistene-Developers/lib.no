import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

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
      <FontAwesomeIcon icon={expandable && visible ? faCaretUp : faCaretDown} size="26" />  
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
    <h2>
      {question}
    </h2>
  ) : (
    <h3>
      {question}
    </h3>
  )

  return (
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
      <div className="background">
        <div
          itemProp="name"
          tabIndex={expandable ? -1 : null}
          onKeyDown={expandable ? keyDownHandler : null} 
          role={expandable ? 'button' : null}
          aria-pressed={expandable ? visible : null}
          onClick={expandable ? toggleIcon : null}
        >
          {headerItem} {headerContent}
        </div>
      </div>
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
