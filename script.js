document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts-container');
    const postForm = document.getElementById('post-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    let posts = [];

    // Load posts from localStorage (if any)
    function loadPosts() {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = savedPosts;
        displayPosts();
    }

    // Display all posts
    function displayPosts() {
        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button onclick="deletePost(${index})">Delete</button>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Delete a post
    window.deletePost = function(index) {
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
    };

    // Handle new post submission
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newPost = {
            title: titleInput.value,
            content: contentInput.value
        };

        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();

        // Clear form
        titleInput.value = '';
        contentInput.value = '';
    });

    // Initialize the app
    loadPosts();
});
