import React from 'react';

import ToDo from '../../components/ToDo/ToDoHOC';
import './Completed.scss';

const Completed = ({ list }) => {
  return (
    <div className="completed-page">
      <ul className="list-group">
        {
          list && list.length > 0 ? (
            list.map(item => (
              <ToDo
                key={item.uuid}
                todo={item}
              />
            ))) : (
              <p>No items found</p>
            )
        }
      </ul>
    </div>
  );
};

export default Completed;
