const postsContainer = document.querySelector("#posts-container");
const postFilterInput = document.querySelector("#post-filter");

const getAllFakePosts = async () => {
	const res = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");
	const data = await res.json();

	return data;
}

const removeOrAddElementFromPage = (el, className = null, addOrRemove) => {
	const dataEl = document.getElementById(el);
	
	addOrRemove === "add" ? dataEl.classList.add(className) : dataEl.classList.remove(className);
}

const getElementsToBeRemoved = text => {
	const postsTitle = document.querySelectorAll(".card-title");
	const postTitleArray = Array.from(postsTitle).map(post => post.textContent);
	const postTitleArrayFiltered = postTitleArray.filter(value => value !== text);

	return postTitleArrayFiltered;
}

const insertPostsIntoPageAndFilterValues = async () => {
	const posts = await getAllFakePosts();

	const postsTemplate = posts.map( ({body, id, title}) => {
		return `
		<div class="card mx-auto mb-4" id="${id}">
		<img class="card-img-top" src="https://images-na.ssl-images-amazon.com/images/I/7125AinG8EL.jpg" alt="Card image cap">
		<div class="card-body p-4">
		<h5 class="card-title">${id}</h5>
		<p class="card-text">${title}</p>
		<a href="#" class="btn btn-outline-dark btn-pill py-2 px-3">Read More</a>
		</div>
		</div>
		`;
	});

	postsContainer.innerHTML = postsTemplate.join("");

	postFilterInput.addEventListener("input", e => {
	    setTimeout(	() => {
                let text =  e.target.value;
		const titleTemplate = getElementsToBeRemoved().includes(text);

		const elementsToBeRemoved = getElementsToBeRemoved(text);
		elementsToBeRemoved.forEach(el => { 
			removeOrAddElementFromPage(el, "d-none", "add");    
		    if(!titleTemplate) removeOrAddElementFromPage(el, "d-none", "remove");
		});
            }, 2000);
	});
}

insertPostsIntoPageAndFilterValues();
