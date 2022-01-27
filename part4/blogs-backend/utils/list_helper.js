
//dummy function
const dummy = (blogs) => {
    return 1
}

//totalLikes function
const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
      return sum + blog.likes;
    };
  
    return blogs.length === 0 
        ? 0 
        : blogs.reduce(reducer, 0);
  };
//favorite blogs function
const favoriteBlog = (blogs) => {
    const reducer = (prev, blog) => {
      if (blog.likes > prev.likes) {
        return { title: blog.title, author: blog.author, likes: blog.likes };
      }
  
      return prev;
    };
  
    return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0]);
  };
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}