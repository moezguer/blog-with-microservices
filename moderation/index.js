const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', async (req, res) => {

  const { type, data } = req.body

  console.log('Received Event', req.body)

  switch (type) {
    case 'CommentCreated': {
      const { id, content, postId } = data
      const status = content.includes('orange') ? 'rejected' : 'approved'
      await axios.post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data: {
          id,
          postId: postId,
          status,
          content
        }
      }).catch(err => {
        console.log(err.message)
      })
      break
    }
  }
  res.send({})
})

app.listen(4003, () => {
  console.log('Listening on 4003')
})