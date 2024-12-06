// app.js

import {API_KEY} from "./config.js";

const newsList = document.getElementById("news-list");

const ENDPOINT = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

// 뉴스 데이터 가져오기
async function fetchNews() {
    try {
        const response = await fetch(ENDPOINT);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        newsList.innerHTML = `<li>Error loading news. Please try again later.</li>`;
    }
}

// 뉴스 데이터 화면에 표시
function displayNews(articles) {
    newsList.innerHTML = ""; // 기존 목록 초기화
    articles.forEach(article => {
        const newsItem = document.createElement("li");
        newsItem.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsList.appendChild(newsItem);
    });
}

// 페이지 로드 시 뉴스 가져오기
fetchNews();