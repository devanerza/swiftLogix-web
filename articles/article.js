// DOM Elements
const blogContainer = document.querySelector('.blog-posts');
const blogPost = document.createElement('article');
blogPost.classList.add('blog-post');

// fetch articles & contents from strapi
const fetchArticles = async () => {
    try {
        const contents = await fetch('http://localhost:1337/api/blogs');
        const cover = await fetch('http://localhost:1337/api/blogs?populate=Cover');
        const data = await contents.json();
        const coverData = await cover.json();
        console.log(data);
        console.log(coverData.data);
        

        // DOM Manipulation
        for (let i = 0; i < data.data.length; i++) {
            blogContainer.appendChild(blogPost);
            blogPost.innerHTML = `
            <div class="post-image">
                <img src="${coverData.data[i].attributes.Cover.url}">
            </div>
            <div class="post-content">
                <h2><a href="blog-post.html">${data.data[i].attributes.Title}</a></h2>
                <div class="post-meta">
                    <span>${data.data[i].attributes.Date}</span> • <span>${data.data[i].attributes.readingTime} min read</span> • <span>${data.data[i].attributes.category}</span>
                </div>
                <p class="post-excerpt">${data.data[i].attributes.description}</p>
                <a href="blog-post.html" class="read-more">Read More →</a>
            </div>
            `;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


document.addEventListener('DOMContentLoaded', fetchArticles);


