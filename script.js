// console.log("Hello World");
window.addEventListener(`load`, ()=>{
    fetchNews(`India`); 
})
function reload(){
    window.location.reload();
}
async function fetchNews(query){
const apiKey=`ababe08f428d44d58a42c35d39e3eb5d`;
const url=`https://newsapi.org/v2/everything?q=`;
const response=await fetch(`${url}${query}&apiKey=${apiKey}`);
const finalResponse=await response.json();
console.log(finalResponse);
bindData(finalResponse.articles); //This Is the Function tp bind the data which we got fram the api
}
function bindData(articles){
const container= document.getElementById(`cards-container`);
const template=document.getElementById(`news-template`);
container.innerHTML='';
articles.forEach(article => {
if(!article.urlToImage) return;
    const cardClone=template.content.cloneNode(true);//This Is For Deep Cloning as the components are there in news template so then it should clone all of these!
    filDataInCard(cardClone, article)
    container.appendChild(cardClone);
});
}
function filDataInCard(cardClone, article){
    const newsImage= cardClone.querySelector(`#news-img`);
    const newsTitle= cardClone.querySelector(`#title`);
    const newsSource= cardClone.querySelector(`#news-source`);
    const newsDescription= cardClone.querySelector(`#news-decs`);


    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDescription.innerHTML=article.description;
    newsSource.innerHTML=article.source.name;

// date coverting java script library
    const date= new Date(article.publishedAt).toLocaleString("en-Us", {
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name}📅${date}`;
cardClone.firstElementChild.addEventListener(`click`, ()=>{
window.open(article.url,  "_blank"); // blank is for new tab
})
    
}
let current=null;
function onNavBar(id){
    fetchNews(id);
const navItems=document.getElementById(id);
current?.classList.remove(`active`);
current=navItems;
current.classList.add(`active`);
}
const inputbox=document.getElementById(`input-box`);//input-box
const button=document.getElementById(`btn`);//btn

button.addEventListener(`click`, ()=>{
    const query=inputbox.value;
    if(!query){
        return alert(`Invalid Search`);
    }
    else{
        fetchNews(query);
        current.classList.remove(`active`);
        current=null;
    }
})
