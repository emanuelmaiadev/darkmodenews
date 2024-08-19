const apiKey = '82688cd025754805b69f1f810e417312'
const apiUrl = `https://newsapi.org/v2/everything?q=tecnologia&language=pt&apiKey=${apiKey}`

fetch(apiUrl)
    .then(response =>{
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.json()
    })
    
    .then(data =>{
        const articles = data.articles

    const mainArticleTitle = document.getElementById('mainArticleTitle')
    const mainArticleDesc = document.getElementById('mainArticleDesc')
    const bTn = document.getElementById('bTn')
    const introImg = document.getElementById('introImg')

        if (articles.length > 0) {
            if (mainArticleTitle && mainArticleDesc && bTn && introImg) {
                mainArticleTitle.textContent = articles[0].title;
                mainArticleDesc.textContent = articles[0].description;
                bTn.href = articles[0].url;
                introImg.src = articles[0].urlToImage || 'mainImg.jpg';
            }

        }

        const newsCards = [
            document.querySelector('#newsItem1'),
            document.querySelector('#newsItem2'),
            document.querySelector('#newsItem3')
        ]

        newsCards.forEach((card, index)=>{
            if(articles[index + 1]){
                card.querySelector('.newsTitle').textContent = articles[index + 1].title
                card.querySelector('.newsDescription').textContent = articles[index + 1].description
                card.href = articles[index + 1].url
            }
        })
        
        const resourceItem = document.querySelector('#resourceItem1')

        if(resourceItem && articles[4]){
            const resourceNumber = resourceItem.querySelector('.resourceNumber');
            const resourceTitle = resourceItem.querySelector('.resourceTitle')
            const resourceDescription = resourceItem.querySelector('.resourceDescription')
            if(resourceTitle && resourceDescription){
            resourceNumber.textContent = `${articles[4].source.name}`
            resourceItem.querySelector('.resourceTitle').textContent = articles[4].title
            resourceItem.querySelector('.resourceDescription').textContent = articles[4].description
            }
        }

    })

    .catch(error => console.error('Erro ao buscar dados da API.', error))

    const darkModeToggle = document.getElementById('darkModeToggle')

    localStorage.setItem('theme', 'dark-mode')

    if(localStorage.getItem('dark-mode') === 'enabled'){
        document.body.classList.add('dark-mode')
        darkModeToggle.checked = true
    }

    darkModeToggle.addEventListener('change', ()=>{

        document.body.classList.contains('dark-mode')

        if(document.body.classList.contains('dark-mode')){
            localStorage.setItem('dark-mode', 'enabled')
        }else{
            localStorage.setItem('dark-mode', 'disabled')
        }

    })