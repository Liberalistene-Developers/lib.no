import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export const Faq = ({ question, answer, expandable = false, expanded = true, Tag = 'h2' }) => {
  const [visible, setVisible] = useState(expanded);

  const toggleIcon = () => setVisible(!visible);

  const keyDownHandler = (e) => {
    if (['Enter', 'Space'].includes(e.code)) {
      setVisible(!visible);
    }
  };

  return (
    <div itemscope="itemscope" itemprop="mainEntity" itemtype="https://schema.org/Question">
      <Tag itemprop="name" tabIndex={expandable ? -1 : null} onKeyDown={expandable ? keyDownHandler : null} role={expandable ? 'button' : null} aria-pressed={expandable ? visible : null} onClick={expandable ? toggleIcon : null}><FontAwesomeIcon icon={expandable && visible ? faChevronUp : faChevronRight} /> {question}</Tag>
      { (!expandable || visible) && (
        <div itemscope="itemscope" itemprop="acceptedAnswer" itemtype="https://schema.org/Answer" className="rich-text">
          <div itemprop="text" dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      )}
    </div>
  );
};

export default Faq;
