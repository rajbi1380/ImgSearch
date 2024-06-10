const accessKey = "pfXLddfMk1RI_jmrfzMgKhOEGLbTlBG78h2VKf1WQ6w";
const SearchFrom = document.getElementById("search-form");
const SearchBox = document.getElementById("search-box");
const SearchResult = document.getElementById("search-result");
const ShowBtn = document.getElementById("show-more-btn");
const SearchError = document.getElementById("search-error");

let key = "";

let page = 1;
async function searchImg() {
  key = SearchBox.value;
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${key}&client_id=${accessKey}&per_page=12`;
  let response = await fetch(url);
  let data = await response.json();
  if (SearchBox.value == "") {
    throw new Error((SearchError.innerHTML = "Please enter value"));
  }
  if (page == 1) {
    SearchResult.innerHTML = "";
  }

  let results = data.results;
  results.map((result) => {
    let img = document.createElement("img");
    img.src = result.urls.small;
    let imglink = document.createElement("a");
    imglink.href = result.links.download;
    imglink.target = "_blank";
    imglink.appendChild(img);
    SearchResult.appendChild(imglink);
  });
  SearchError.innerHTML = "";
  ShowBtn.style.display = "block";
}

SearchFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImg();
});
ShowBtn.addEventListener("click", () => {
  page++;
  searchImg();
});
