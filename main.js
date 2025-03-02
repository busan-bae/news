// const API_KEY = '018d646d760646b3a98b1048c372fd05'  //5삭제
const pageSize = 10
let newsList =[]
const topMenus = document.querySelectorAll(".menus button")
const sideMenus = document.querySelectorAll(".side-menu button")
const searchInput = document.getElementById("search-input")
let totalResults = 0
let page = 1
const groupSize = 5

let usr = new URL(`
    https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${pageSize}`)
    //https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)

topMenus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))
sideMenus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))
searchInput.addEventListener("keyup",function(event){
    if(event.key === "Enter" ){
        event.preventDefault();
        searchNews()
    }
})

const getNews = async () => {
    try{
        url.searchParams.set("page",page)
        url.searchParams.set("pageSize",pageSize)
        const response = await fetch(url)
        const data = await response.json() 
        if(response.status === 200){
            if(data.articles.length===0){
                throw new Error("No result for this Search")
            }
            newsList = data.articles 
            totalResults = data.totalResults
            // console.log(totalResults)
            render()
            paginationRender()
        } else {
            throw new Error(data.message)
        }      
    }catch(error){
    errorRender(error.message)
    }
}

const searchNews = async () => {
    const keyword = searchInput.value
    url = new URL (`
        https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&pageSize=${pageSize}`)
        //https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`)
    page = 1
    getNews()
}


const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase()
    url = new URL (`
        https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&pageSize=${pageSize}`)
        //https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`)
    page = 1
    getNews()    
}


const getLatestNews = async () => {
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${pageSize}`
        //`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    page = 1
    getNews()
}

getLatestNews()

const render = () => { 
    const newsHTML = newsList.map((news)=>
         `<div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${
                        news.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU" }" onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';">
                </div>
                <div class="col-lg-8">
                    <h2>
                        ${news.title}
                    </h2>
                    <p>
                        ${news.description == null || news.description == "" 
                            ? "내용없음"
                            : news.description.length > 200
                            ? news.description.substring(0,200) + "..."
                            : news.description
                        }
                    </p>                                                                                                    
                    <div>
                        ${news.source.name|| "no source" } - ${moment(news.publishedAt).fromNow()} 
                    </div>
                </div>
            </div>`
        ).join("");


    document.getElementById("news-board").innerHTML = newsHTML
}

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`
document.getElementById("news-board").innerHTML=errorHTML
}

const paginationRender=()=>{
    const pageGroup = Math.ceil(page/groupSize)
    const totalPages = Math.ceil(totalResults/pageSize)
    let lastPage = pageGroup * groupSize
    if(lastPage>totalPages){
        lastPage=totalPages
    }
    const firstPage = lastPage - (groupSize - 1)<=0? 1: lastPage - (groupSize - 1) ;
    let paginationHTML = ''
    if(page > 1){
        paginationHTML=`<li class="page-item" onclick="moveToPage(${1})"><a class="page-link">&lt;&lt;</a></li>
        <li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link">&lt;</a></li>`
    } 
    for(let i=firstPage; i<=lastPage;i++){
        paginationHTML+=`<li class="page-item ${
            i===page?"active":""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
        }
    if(page < totalPages){
        paginationHTML += `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link">&gt;</a></li>
        <li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link">&gt;&gt;</a></li>`          
    }
    document.querySelector(".pagination").innerHTML=paginationHTML
}

const moveToPage = (pageNum) => {
    page = pageNum
    getNews()
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
        if (inputArea.style.display === "inline") {
            inputArea.style.display = "none";
        } else {
            inputArea.style.display = "inline";
        }
};
