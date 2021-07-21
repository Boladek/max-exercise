const sortByName = (a, b) => {
    if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
}

const sortByHeight = (a, b) => {
    if ( Number(a.height) < Number(b.height) ){
        return -1;
      }
      if (Number(a.height) > Number(b.height) ){
        return 1;
      }
      return 0;
}

module.exports = {sortByName, sortByHeight}