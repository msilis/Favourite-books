//Variables for DOM elements

//inputs
let bookTitleInput = document.getElementById('book_title');
let bookAuthorInput = document.getElementById('book_author');
let bookGenreInput = document.getElementById('book_genre');
let bookReviewInput = document.getElementById('book_reviews');

//buttons

let addBookButton = document.getElementById('add_book_button');
let editBookButton = document.getElementById('edit_book_info_button');
let deleteBook = document.getElementsByClassName('delete_book_button');
let moreInfoButton = document.getElementById('more_info_button');

//HTML elements needed for display

let bookInfoDisplay = document.getElementById('current_book_display');
let bookCardList = document.getElementById('book_quick_card_list');
let bookCardContainer = document.getElementById('book_quick_card_container')
let editButtons = `<div><button type="button" class="edit_book_button">Edit</button><button type="button" class="delete_book_button">Delete</button></div>`;


//Logic to make page responsive

let storedBookList = JSON.parse(sessionStorage.getItem('bookArray'));

//Create book object
function createBookInfo(bookTitle, bookAuthor, bookGenre, bookReviews){
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookGenre = bookGenre;
    this.bookReviews = bookReviews;
}

//generate book list

function displayBookList(){

    let bookListContent = storedBookList.map(book => `<div class="bookCard"><p>Title: <span class="bookTitle">${book.bookTitle}</span><br>Author: ${book.bookAuthor}<br><span class="hiddenInfo">Genre: ${book.bookGenre}<br>Review: ${book.bookReviews}</span></p><div class='cardEditBttons'>${editButtons}</div></div>`).join('\n');
    bookCardContainer.innerHTML = bookListContent;
}

//Add books to list
function addBook(){
    let favouriteBooksList = JSON.parse(sessionStorage.getItem('bookArray'));
    if(bookTitleInput.value.length == 0 || bookAuthorInput.value.length == 0 || bookGenreInput.value.length == 0){
        alert('Please fill in Title, Author, and Genre.')
    }
    //Check if list is empty so no errors are thrown in console
    if(favouriteBooksList === null){
        console.log('Session storage is empty');
        favouriteBooksList = []

    }  
        let newBook = new createBookInfo(bookTitleInput.value, bookAuthorInput.value, bookGenreInput.value, bookReviewInput.value)
        favouriteBooksList.push(newBook);
        sessionStorage.setItem('bookArray', JSON.stringify(favouriteBooksList));
    
        //Clear Inputs
        bookTitleInput.value = '';
        bookAuthorInput.value = '';
        bookGenreInput.value = '';
        bookReviewInput.value = '';
        console.log(favouriteBooksList)
        location.reload(); 
}

//===================Event listeners

//Event listener for adding book
addBookButton.addEventListener('click', addBook);

//Event listener for clicking on book card
bookCardContainer.addEventListener('click', handleCardClick)

//Event listener for more info button
moreInfoButton.addEventListener('click', handleMoreInfo);

//Event listener for deleting book
bookCardContainer.addEventListener('click', handleBookDelete);

//Event listener for editing book info
bookCardContainer.addEventListener('click', handleBookEdit);

//Action on card click
function handleCardClick(event){
    if(event.target.tagName.toLowerCase() === 'p'){
        bookInfoDisplay.innerHTML = `${event.target.innerHTML}`;}    
}

//========================Functions for handling events

//More info handler
function handleMoreInfo(event){
    let parent = event.target.parentNode.previousElementSibling;
    parent.getElementsByTagName('span')[1].style.display = 'block';    
}

//Delete book handler
function handleBookDelete(event){
    if(event.target.className === 'delete_book_button'){
        let bookName = event.target.parentNode.parentNode.parentNode.firstChild.firstElementChild.textContent;
        let bookArray = JSON.parse(sessionStorage.getItem('bookArray'));
        for (let i = 0; i < bookArray.length; i++){
            if (bookArray[i]['bookTitle'] == bookName.trim()){
                let bookIndex = bookArray.indexOf(bookArray[i]);
                bookArray.splice(bookIndex, 1);
            }   
        }
        //Put back into session storage and reload so changes show
        sessionStorage.setItem('bookArray', JSON.stringify(bookArray));
        location.reload();
    }
}

//Edit book handler
function handleBookEdit(event){
    if(event.target.className === 'edit_book_button'){
        let initialPrompt = prompt('What do you want to edit?\n 1. Book Title\n 2.Book Author\n 3. Book Category\n 4. Review\n (Please enter a number)')
        console.log('edit clicked');
        //get text of element to help loop through array
        let bookName = event.target.parentNode.parentNode.parentNode.firstChild.firstElementChild.textContent
        //get array from sessionStorage
        let bookArray = JSON.parse(sessionStorage.getItem('bookArray'));
        for (let i = 0; i < bookArray.length; i++){
            if (bookArray[i]['bookTitle'] == bookName.trim()){
                let bookIndex = bookArray.indexOf(bookArray[i])
                console.log(bookIndex);
                if (initialPrompt == 1){
                    let namePrompt = prompt('What do you want the new name to be?');
                    bookArray[bookIndex]['bookTitle'] = namePrompt;
                    
                } else if (initialPrompt == 2){
                    let authorPrompt = prompt('What do you want the author name to be?');
                    bookArray[bookIndex]['bookAuthor'] = authorPrompt
                } else if (initialPrompt == 3){
                    let genrePrompt = prompt('What do you want the genre to be?');
                    bookArray[bookIndex]['bookGenre'] = genrePrompt
                } else if(initialPrompt == 4){
                    let reviewPrompt = prompt('What do you want the review to say?');
                    bookArray[bookIndex]['bookReviews'] = reviewPrompt
                }
            }
        }
        //Put back into session storage and reload page so changes show
        sessionStorage.setItem('bookArray', JSON.stringify(bookArray));
        location.reload();
    }
}


//Page load on first visit

window.addEventListener('load', handleInitialLoad)

function handleInitialLoad(){
    if (storedBookList === null){
        storedBookList = []
    } else (displayBookList())
}


