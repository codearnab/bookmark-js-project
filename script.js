const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkFrom = document.getElementById('bookmark-form');
const websiteName = document.getElementById('website-name');
const websiteUrl = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmarks-container');

let bookmarks = [];


function showModal(){
    modal.classList.add('show-modal');
    websiteName.focus();
}
// function closeModal() {
//     modal.classList.remove('show-modal');
// }
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => e.target === modal ? modal.classList.remove('show-modal') : false);

//validate form 
// function searchData(){
//     fetchData();
//     // const {name, url} = bookmarks;
//     const getLocal = localStorage.getItem('bookmarks');
//     bookmarksGet = JSON.parse(getLocal);
//     console.log(bookmarksGet);
// }


function validator(nameValue, urlValue) {
    fetchData();
    for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem('name'));
    }
   
    // console.log(bookmarks);
    const expresso = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regexEpress = new RegExp(expresso);
   
    if(!nameValue || !urlValue) {
        alert('please fill both field');
        return false;
    }

    // if(urlValue.match(regexEpress)){
    //     alert('match');
    // }
    if(!urlValue.match(regexEpress)) {
        alert('please enter a valid Url');
        return false;
    }
    
    return true;
}

//push data in dom

function pushDataToDom(){
    bookmarkContainer.innerText = '',

    bookmarks.forEach((bookmark) => {
        const {name, url} = bookmark;
        const item = document.createElement('div');
        item.classList.add('item');
        const closeItem = document.createElement('i');
        closeItem.classList.add('fa', 'fa-times', 'deleteBook');
        closeItem.setAttribute('title', 'delete bookmark');
        closeItem.setAttribute('id', 'delete-bookmark');
        closeItem.setAttribute('aria-hidden', true);
        closeItem.setAttribute('onclick', `deletBook('${url}')`)
        const itemName = document.createElement('div');
        itemName.classList.add('name');
        const favImage = document.createElement('img');
        favImage.classList.add('fav-image');
        favImage.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favImage.setAttribute('alt', 'fav Icon');
        const urlAnchor = document.createElement('a');
        urlAnchor.setAttribute('href', `${url}`);
        urlAnchor.setAttribute('target', '_blank');
        urlAnchor.textContent = name;
        itemName.append(favImage,urlAnchor);
        item.append(closeItem,itemName);
        bookmarkContainer.appendChild(item);
    });
}

// fetching local storage bookmark

function fetchData(){
    if (localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        
    }
    else {
        bookmarks = [
            {
                name: "Arnab's Space",
                url: "https://arnabsspace.in",
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    // console.log(bookmarks);
    pushDataToDom()
}

function deletBook(url) {
//    console.log(url)

    bookmarks.forEach((bookmark, i) => {
        // bookmarks.splice(bookmark, i);

        if(bookmark.url === url){
            bookmarks.splice(i, 1);
        }
    });

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchData();
}


//storeBookmark function

function storeBookmark(r) {
    r.preventDefault();

    fetchData();
    // const bookmarkExcitet = [];

    const nameValue = websiteName.value;
    let urlValue = websiteUrl.value;

    if(!urlValue.includes('http://','https://')) {
        urlValue = `https://${urlValue}`;
        // if()
    }

    // console.log(nameValue, urlValue);
    
    // console.log(r);
    if(!validator(nameValue,urlValue)){
        return false;
    }

    //  console.log(nameValue, urlValue);

    //  window.localStorage.setItem(nameValue, urlValue);

    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchData();
    bookmarkFrom.reset();
    websiteName.focus();
    // searchData();
}

//event Listener

bookmarkFrom.addEventListener('submit', storeBookmark);

fetchData();
