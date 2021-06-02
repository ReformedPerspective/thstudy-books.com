const summaryInclude=500;
const fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  threshold: 0.3,
  distance: 200,
  ignoreLocation: true,
  maxPatternLength: 100,
  minMatchCharLength: 2,
  includeScore: true,
  keys: [
    {name:"title",weight:0.8},
    {name:"contents",weight:0.3},
    {name:"description",weight:0.7},
    {name:"categories",weight:0.5},
    {name: "subtitle",weight: 0.4},
    {name: "publisher", weight: 0.5},
    {name: "author", weight: 0.8}
  ]
};

///////////////////////////////////////////////////////////////////////
// initialize a listener for the search box
const searchInput = document.getElementById("search-query");
// Execute a function when the user releases a key on the keyboard
searchInput.addEventListener("keyup", event => {
  //  Check for the "Enter" key on the keyboard
  if (event.code === 'Enter') {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("search-button").click();
  }
});

var searchQuery = param("s");
if(searchQuery){
  searchInput.value = searchQuery;
  executeSearch(searchQuery);
}else {
  document.getElementById('search-results').innerHTML = "<p class='text-primary'>Please enter a word or phrase above</p>";
}
///////////////////////////////////////////////////////////////////////

function executeSearch(searchQuery) {
  fetch('/index.json')
  .then(response => response.json())
  .then(data => {
    const pages = data;
    const fuse = new Fuse(pages, fuseOptions);
    const result = fuse.search(searchQuery);
    console.log(result);
    const resultsItem = document.getElementById('search-results');
    resultsItem.innerHTML = "";
    if (result.length > 0) {
      resultsItem.innerHTML = `
      <h2 class='text-primary mt-3'>Matching Books</h2>
      <hr class='border-secondary'>
      `;

      populateResults(result);
    } else {
      resultsItem.innerHTML = "<p class='text-danger'>No matches found</p>";
    }
  });
}

function populateResults(result) {
  // Get the search-results div so we can add children to it later
  const resultsDiv = document.getElementById('search-results');
  // Now go through each of the search hits and create a child div
  result.forEach((value, key) => {
    // Only bother with the first key/value pair since it should be the most relevant
    var matchKey = value.matches[0].key;
    var matchValue = value.matches[0].value;    
    var snippet = '';
    // conditionally set up the result 'snippet' depending on the type
    switch (matchKey) {
      case "title":
        snippet += `<strong>Title:</strong> ${matchValue}`;
        break;

      case "author":
        snippet += `<strong>Author:</strong> ${matchValue}`;
        break;
      
      case "categories":
        snippet += `<strong>Categories:</strong> ${matchValue}`;
        break;
      
      case "contents":
        var ind = matchValue.indexOf(searchQuery)
        var start = ind - summaryInclude > 0 ? ind - summaryInclude : 0
        var end = ind + searchQuery.length + summaryInclude < matchValue.length ? ind + searchQuery.length + summaryInclude : matchValue.length

        snippet += matchValue.substring(start, end);
        break;
      
      case "description":
        var ind = matchValue.indexOf(searchQuery)
        var start = ind - summaryInclude > 0 ? ind - summaryInclude : 0
        var end = ind + searchQuery.length + summaryInclude < matchValue.length ? ind + searchQuery.length + summaryInclude : matchValue.length

        snippet += matchValue.substring(start,end);
        break;
      
      case "subtitle":
        snippet += `<strong>Subtitle:</strong> ${matchValue}`;
        break;

      case "publisher":
        snippet += `<strong>Publisher:</strong> ${matchValue}`;
        break;

      default:
        break;
    }
    
    // Create result div with unique id for each. Also create unique id for <p> for highlighting later.
    var thisResult = document.createElement('div');
    thisResult.id = `summary-${key}`;
    thisResult.innerHTML = `
      <h4><a href="${value.item.permalink}">${value.item.title}</a></h4>
      <p id="value-${key}">${snippet}</p>
    `;

    // Now add to parent div
    resultsDiv.appendChild(thisResult);

    // And highlight the search term
    var markInstance = new Mark(document.getElementById(`value-${key}`));
    markInstance.mark(searchQuery);
  });
}

function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

function searchButton() {
  searchQuery = searchInput.value;
  if(searchQuery){
    searchInput.value = searchQuery;
    executeSearch(searchQuery);
  }else {
    document.getElementById("search-results").innerHTML = "<p class='text-dark'>Please enter a word or phrase above</p>"
  }
  return false
}