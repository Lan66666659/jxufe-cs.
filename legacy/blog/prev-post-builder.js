
function makeSureSuccess(result)
{
	if(!result.ok) throw new Error("Network Failed!");
	return result.text();
}

function handleIndexFetch(htmlString)
{
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, "application/xhtml+xml");
	return doc;
}

function addPrevAndPost(htmlDom)
{
	const nodes = Array.from(htmlDom.querySelectorAll('.org-ul > li > a'));
	const currPathname = window.location.pathname;

	const currIndex = nodes.findIndex(function(node) {
		return currPathname.includes(node.getAttribute('href'));
	});

	const body = document.body;
	if (!body) return;

	const upElem = document.createElement('p');
	upElem.className = "up-link-text up-link text";
	upElem.textContent = "Up: ";

	const upLink = document.createElement('a');
	upLink.className = "up-link-href up-link link";
	upLink.href = "index.html";
	upLink.textContent = "Index";

	upElem.appendChild(upLink);

	const newDiv = document.createElement('div');
	newDiv.id = "postamble-links";
	newDiv.className = "links";
	newDiv.append(upElem);

	if (currIndex !== -1)
	{
		const prev = currIndex > 0 ? nodes[currIndex - 1] : undefined;
		const post = currIndex < nodes.length - 1 ? 
			nodes[currIndex + 1] : undefined;

		if (prev !== undefined)
		{
			const prevPElem = document.createElement('p');
			prevPElem.className = "prev-link-text prev-link text";
			prevPElem.textContent = "Prev: ";

			prev.className = "prev-link-href prev-link link";

			prevPElem.appendChild(prev);
			newDiv.append(prevPElem);
		}
		if (post !== undefined)
		{
			const postPElem = document.createElement('p');
			postPElem.className = "post-link-text post-link text";
			postPElem.textContent = "Next: ";

			post.className = "post-link-href post-link link";

			postPElem.appendChild(post);
			newDiv.append(postPElem);
		}
	}

	body.appendChild(newDiv);
}

function buildPrevPost()
{
	fetch("index.html")
		.then(makeSureSuccess)
		.then(handleIndexFetch)
		.then(addPrevAndPost)
		.catch(function(error) { console.log("content fetch failed!", error); });
}

document.addEventListener("DOMContentLoaded", buildPrevPost);
