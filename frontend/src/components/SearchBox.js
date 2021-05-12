import React, { useState } from 'react';
import { useHistory } from 'react-router';

export default function SearchBox() {
  const [name, setName] = useState('');
  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/search/name/${name}`);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex search-box mb-2">
          <input className="mr-2" type="text" placeholder='Search' name="q" id="q" onChange={(e) => setName(e.target.value)} />

          <button className="btn" type="submit">
              <i className="lni lni-search-alt"></i>
          </button>
      </div>
    </form>
  );
}
