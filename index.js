const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
	const query = {
		part: "snippet",
		key: "AIzaSyCc83loc2gllyDhzsjFtTs7ueurzLuU_8U",
		q: `${searchTerm}` 
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResultsPerPage(result) {
	return `
	<h2>${result} Results</h2>
	`
}

function renderResults(result) { 
	return `
		<p>${result.snippet.title}</p>
		<div>
			<a href='https://www.youtube.com/watch?v=${result.id.videoId}' target='_blank'>
				<img src='${result.snippet.thumbnails.medium.url}' alt='YouTube thumbnail image'></img>
			</a>
		</div>
	`
}

function displayYouTubeSearchData(data) {
	const resultCount = data.items.length;
	console.log(resultCount);
	const displayCount = renderResultsPerPage(resultCount);
	$('#query-results-count').html(displayCount);
	const results = data.items.map((item, index) => 
		renderResults(item));
	$('#query-results').html(results);
}

function watchSubmit() {
	$('#search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('#query');
		const query = queryTarget.val();
		queryTarget.val('');
		getDataFromApi(query, displayYouTubeSearchData);
	});
}

$(watchSubmit);