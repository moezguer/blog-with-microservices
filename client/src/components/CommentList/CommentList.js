import React from 'react'

const CommentList = ({ comments }) => {

  const getCommentContentByStatus = (comment) => {
    const { status } = comment
    let content
    switch (status) {
      case 'pending': {
        content = 'This comment is awaiting moderation.'
        break
      }
      case 'approved': {
        content = comment.content
        break
      }
      case 'rejected': {
        content = 'This comment is rejected!'
        break
      }
    }
    return content
  }
  const renderedComments = comments.map(comment => {
    return <li className="list-group-item" key={comment.id}>{getCommentContentByStatus(comment)}</li>
  })

  return (
    <ul className="list-group">
      {renderedComments}
    </ul>
  )
}
export default CommentList