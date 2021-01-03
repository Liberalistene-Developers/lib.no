import React from 'react';

export default ({
  person,
  fields,
}) => (
  <div className="person-list-grid-item">
     { person && person.image && (
       <div>
         <img src={person.image} />
       </div>
     )}
     { person && person.name && (
       <div>
         <div>
           {person.name}
         </div>
         { person.shortDescription && (
           <div>
             {person.shortDescription}
           </div>           
         )}
       </div>  
     )}
  </div>
);