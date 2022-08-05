// Elements
const quoteText= document.getElementById("quote"); 
const quoteAuthor= document.getElementById("author"); 
const tweetBtn=document.querySelector(".tweet");
const newQuoteBtn=document.querySelector(".new-quote");
const quoteContainer= document.querySelector(".quote-container");
const loading=document.querySelector(".wrapper");

let apiQuote = null;
loading.hidden=true;
let breaker=50;

const showLoading=()=>{
    quoteContainer.hidden=true;
    loading.hidden=false;
}

const hideLoading=()=>{
    if(quoteContainer.hidden){
        quoteContainer.hidden=false;
        loading.hidden=true;
    }
}

// Update the new quote
const newQuote=()=>{
    breaker=50;
    showLoading();
    const quote=apiQuote.quoteText;
    const author=apiQuote.quoteAuthor;
    if (author === "") {
        author="Unknown";
    }
    
    console.log(quote.length);
    if(quote.length>120){
        quoteText.classList.add("quote-long");
    }else{
        quoteText.classList.remove("quote-long");
    }
    quoteText.innerText=quote;
    quoteAuthor.innerText=author;
    hideLoading();
}

// Request quote from API

async function getQuote(){
    showLoading();
    const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
    const quoteUrl="https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    try {
        const response=await fetch(proxyUrl+quoteUrl);
        apiQuote= await response.json();
        newQuote();
    } catch (error) {
        breaker-=1;
        if( breaker <= 0){
            return;
        }
        console.log(error);
        getQuote();

    }

}

const tweet =()=>{
    tweetApi=`https://twitter.com/intent/tweet?text=${apiQuote.quoteText} - ${apiQuote.quoteAuthor}.`;
    window.open(tweetApi,"_blank");
}

newQuoteBtn.addEventListener("click",getQuote);
tweetBtn.addEventListener("click",tweet);
getQuote()
