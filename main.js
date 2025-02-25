// const API_KEY = '018d646d760646b3a98b1048c372fd05'
let PAGE_SIZE = 20
let news =[]


const getLatestNews = async () => {
    const url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`
        // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        // `https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines`
    );
    const response = await fetch(url)
    const data = await response.json()
    news = data.articles
    console.log(news)
}

getLatestNews()