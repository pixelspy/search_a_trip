import React from 'react';

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li className="search_list_item" key={r.id} onClick>
      <img
        className="search_item_icone"
        src="https://assets.trainline.eu/assets/images/location-5632039ea0e607c803bc503fba864f35.svg"
        alt="logo"/>
      {r.local_name}
    </li>
  ));
  return <ul>{options}</ul>
};

export default Suggestions;
