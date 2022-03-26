const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id

  res.send(commentsByPostId[postId] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex')

  const { content } = req.body
  const postId = req.params.id

  const comments = commentsByPostId[postId] || []

  comments.push({ id: commentId, content, status: 'pending' })

  commentsByPostId[postId] = comments

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      status: 'pending',
      postId
    }
  }).catch(err => {
    console.log(err.message)
  })

  res.status(201).send(comments)
})

app.post('/events', async (req, res) => {

  const { type, data } = req.body
  console.log('Received Event', req.body)

  const { postId, id, status, content } = data
  switch (type) {
    case 'CommentModerated': {
      const comments = commentsByPostId[postId]
      const comment = comments.find(comment => comment.id === id)
      comment.status = status

      await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentUpdated',
        data: {
          id,
          status,
          postId,
          content
        }
      }).catch(err => {
        console.log(err.message)
      })
    }
  }
  res.send({})
})

app.listen(4001, () => {
  console.log('Listening on 4001')
})