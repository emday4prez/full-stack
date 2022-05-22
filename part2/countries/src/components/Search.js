const Search = ({filter, handleFilterChange}) => {

 return (
  <>
   <h3>search</h3>
   <input type="text" value={filter} onChange={handleFilterChange} />
  </>
 )
}

export default Search;