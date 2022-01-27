const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    // Blog.find({}).then(blogs => {
    //     response.json(blogs)
    // })
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})
//-----------GET Request By Id---------------------//
blogsRouter.get('/:id', async(request, response, next) => {

        const blog = await Blog.findById(request.params.id)
        if(blog){
            response.status(200).json(blog)
        }else{
            response.status(404).end()
        }

  
    
        
})
//-----------Adding new Blogs ----------//
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    // const token = getTokenFrom(request)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    
  
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })
    
    if(blog.title === undefined || body.url===undefined){
        response.status(400).json({error: 'you missed title or URL'})
    }
    
    const savedBlogs = await blog.save()
    user.blogs = user.blogs.concat(savedBlogs._id)
    await user.save()
    response.status(201).json(savedBlogs)
  
    //----**not synchronised code---**//
    // blog.save()
    //     .then(savedBlog => {
    //         response.json(savedBlog)
    //     })
    //     .catch(error => next(error))
})

//-----------DELETE Request By ID-----------------------//
blogsRouter.delete('/:id', async (request, response, next) => {
   
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id);
    if (!blog) return response.status(404).end();
    const belongsToUser = blog.user.toString() === decodedToken.id;
    
    if (belongsToUser) {
      await blog.remove();
      return response.status(204).end();
    }
    response.status(401).json({error: 'this user dont own this blog'})
})

blogsRouter.put('/:id', async(request, response) => {
    const body = request.body

    // const blog = {
    //     title: body.title,
    //     author: body.author,
    //     url: body.url,
    //     likes: body.likes
    // }
   
    const savedUpdatedBlogs = await Blog.findByIdAndUpdate(request.params.id, body, {new: true})
    response.status(200).json(savedUpdatedBlogs)
})
module.exports = blogsRouter