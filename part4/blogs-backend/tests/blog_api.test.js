const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')



beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})
//--------------- all blogs are returned -------------//
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)


test('numbers of blogs', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})


describe('blog is about', () => {
    test('the frist blog is about...', async () => {
        const response = await api.get('/api/blogs')
        
        const titles = response.body.map(title => title.title)
        expect(titles).toContain('Canonical string reduction')
    })
})


//------------new blog add tester-------------------//
test('Blog is added', async () => {
  const newBlog= {
      
    title: "POST Method Testing",
    author: "is it done?",
    url: "localhost",
    likes: 2
     
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const title = blogsAtEnd.map(r => r.title)
  expect(title).toContain('POST Method Testing')


  // const response = await api.get('/api/blogs')
  // const title = response.body.map(r => r.title)
  // expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  // expect(title).toContain('Type wars')
})
//-------Invalid Blog(without title)----//
test('blog without title and url', async() => {
  const newBlog= {
    
    title: "without url",
    author: "Michael Chan",
   
    
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    // const response = await api.get('/api/blogs')
    // expect(response.body).toHaveLength(helper.initialBlogs.length)
})

//-----------------View By ID-------------------//
test('a specific blog can be viewed', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToVeiw = blogsAtStart[0]
  
  const resultBlog = await api
    .get(`/api/blogs/${blogToVeiw.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBogToview = JSON.parse(JSON.stringify(blogToVeiw))
  
  expect(resultBlog.body).toEqual(processedBogToview)
  
})
//---------------- DELETE Request Testing----------//
test('a blog can be deleted', async() => {
  const blogsAtStart = await Blog.find({})
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await Blog.find({})   
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const title = blogsAtEnd.map(r => r.title)
    expect(title).not.toContain(blogToDelete)

})

//--------------Verifying the existence of a property--------//
 test('valid ID', async() => {
  const response = await api.get("/api/blogs");
  const blogId = response.body.map(blog => blog.id)
  expect(blogId).toBeDefined()
 }) 


 test('missing like', async() => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogs = await Blog.find({})
  console.log(blogs.length)
  expect(blogs[blogs.length-1].likes).toBe(0)
})

test('Blog is added', async () => {
  const newBlog= {
      
    title: "POST Method Testing",
    author: "is it done?",
    url: "localhost",
    likes: 2
     
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const title = blogsAtEnd.map(r => r.title)
  expect(title).toContain('POST Method Testing')


  // const response = await api.get('/api/blogs')
  // const title = response.body.map(r => r.title)
  // expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  // expect(title).toContain('Type wars')
})
//-------------Testing User db-------//
describe('when there is initially one user in db', () => {
 

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})
afterAll(() => {
  mongoose.connection.close()
})