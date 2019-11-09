import React from 'react';

import ToDo from '../../components/ToDo/ToDoHOC';
import './Home.scss';

const Home = ({ list }) => {
  return (
    <div className="home-page">
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

export default Home;
