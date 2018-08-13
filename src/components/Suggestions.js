import React from 'react';

const Suggestions = (props, handleClickBtn) => {
  const options = props.results.map(r => (
    <li
      className="searchListItem"
      key={r.id}
      onClick={() => props.handleClickBtn(r.local_name, r.unique_name, props.departure)}
      >
      <img
        className="searchItemIcone"
        src="https://assets.trainline.eu/assets/images/location-5632039ea0e607c803bc503fba864f35.svg"
        alt="logo"/>
      {r.local_name}
    </li>
  ));
  return <ul>{options}</ul>
};

export default Suggestions;
