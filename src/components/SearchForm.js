import React, { useState } from 'react';
const SearchForm = ({setSearch, initialPlaceholder}) => {
    const [query, setQuery] = useState(initialPlaceholder)

    const onChange = event => setQuery(event.target.value)

    const onSubmit = event => {
      event.preventDefault();
      setSearch(query)
    }

    return(
      <form className="container search-form" onSubmit={onSubmit} > 
        <input type="text" value={query} onChange={onChange} />
      </form>
    )
};


export default SearchForm;
