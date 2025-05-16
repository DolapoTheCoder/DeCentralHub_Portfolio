import React, { useState, useEffect } from 'react';

function CommunityBoard() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    useEffect(() => {
        const savedPosts = localStorage.getItem('communityPosts');
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        }
    }, []);

    const addPost = () => {
        if (newPost.trim() !== '') {
            const updatedPosts = [...posts, { id: Date.now(), text: newPost, likes: 0 }];
            setPosts(updatedPosts);
            localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
            setNewPost('');
        }
    };

    const likePost = (id) => {
        const updatedPosts = posts.map(post =>
            post.id === id ? { ...post, likes: post.likes + 1 } : post
        );
        setPosts(updatedPosts);
        localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
    };

    return (
        <div className="community-board">
            <h3>Community Board</h3>
            <div className="post-form">
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your progress or encourage others..."
                    rows="3"
                />
                <button onClick={addPost}>Post</button>
            </div>
            <div className="posts">
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <p>{post.text}</p>
                        <button onClick={() => likePost(post.id)}>
                            👍 {post.likes}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommunityBoard;
