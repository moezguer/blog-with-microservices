import React from 'react'
import CreatePost from './components/CreatePost'
import PostList from './components/PostList'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const App = () => {
  return (
    <div className={'container'}>
      <h1>Create Post</h1>
      <CreatePost/>
      <h1>Create Comment</h1>
      <PostList/>
    </div>
  )
}

export default App