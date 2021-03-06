const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())
const posts = {}

// app.get('/posts', (req, res) => {
//   res.send(posts)
// })

app.post('/posts/create', async (req, res) => {
  const postId = randomBytes(4).toString('hex')

  const { title } = req.body

  posts[postId] = {
    id: postId, title
  }

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id: postId, title
    }
  }).catch(err => {
    console.log(err.message)
  })

  res.status(201).send(posts[postId])
})

app.post('/events', ((req, res) => {
  console.log('Received Event', req.body)

  res.send({})
}))

app.listen(4000, () => {
  console.log('v30')
  console.log('Listening on 4000')
})