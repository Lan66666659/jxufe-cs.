function handleMap(pair)
{
	const [ footpara, footref ] = pair;
	footref.title = footpara.innerText;
}

function buildFootnote()
{
	const footparas = document.querySelectorAll("p.footpara");
	const footrefs = document.querySelectorAll("a.footref");

	const footPairs = _.zip(footparas, footrefs);
	footPairs.map(handleMap);
}

document.addEventListener("DOMContentLoaded", buildFootnote);
