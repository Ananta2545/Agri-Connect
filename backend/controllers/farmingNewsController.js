import axios from 'axios'

export const getFarmingNews = async(req, res)=>{
    const api_key = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=farming&apiKey=${api_key}`;

    try{
        const response = await axios.get(url);
        // console.log(response);
        const articles = response.data.articles;
        // console.log(" Articles is  : ", articles);
        res.status(200).json(articles);
    }catch(err){
        console.error("Error fetching news : ", err);
        res.status(500).json({message : "Error fetching news"});
    }
}