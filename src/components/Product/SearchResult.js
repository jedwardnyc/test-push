import React from 'react';
import { connect } from 'react-redux';

const SearchResult = (props) => {
  console.log('props :', props);
  return(
    <div className='container'>
      <hr />
    </div>
  );
}


export default connect(null)(SearchResult);
