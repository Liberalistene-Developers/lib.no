import React from 'react';

export default ({ title, description, conclusionTitle, conclusions, tags }) => (
  <div>
    <h3>{title}</h3>
    <div dangerouslySetInnerHTML={{ __html: description }} />
    <div className="conclusions">
      <div className="title">{ conclusionTitle }</div>
      <div>
        { conclusions && conclusions.length && (
          <ul>
            { conclusions.map(({ key, conclusion }) => (
              <li key={key}>
                { conclusion }
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);
