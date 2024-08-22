import {
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit'
import { Box, Modal } from '@mui/material'
import { IPost } from '../helpers/types'
import { BASE } from '../helpers/default'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { handleComment } from '../helpers/api'

interface Props {
  isOpen: boolean
  close: () => void
  post: IPost
}

export function Preview({ isOpen, close, post }: Props) {

  const [comment, setComment] = useState<string>('')
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  }

  const commentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment.trim()) {
      handleComment(post.id, comment)
      .then(res=>{
        console.log(res);
        
      })
    }
    setComment('')
  }

  return (
    <Modal open={isOpen} onClose={close}>
      <Box sx={style}>
        <MDBRow style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <MDBCol md="8" style={{ height: '100%', overflow: 'hidden' }}>
            <img
              className='preview-post'
              src={BASE + post.picture}
              alt="Post"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </MDBCol>

          <MDBCol md="4" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MDBCardBody className="p-0" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div className="mb-1">
                <strong>{post.likes.length} likes, {post.comments.length} comments</strong>
                <p>Likes:💖</p>
                <div className='my-3'>
                  {post.likes?.[0] && (
                    <div className='my-2'>
                      <img
                        src={BASE + post.likes?.[0]?.picture}
                        alt={post.likes?.[0]?.name + " " + post.likes?.[0]?.surname}
                        className="rounded-circle me-2"
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          border: '2px solid #ddd',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Link to={'/profile/' + post.likes?.[0].id}>
                        {post.likes?.[0]?.name} {post.likes?.[0]?.surname}
                      </Link>
                    </div>
                  )}

                  {post.likes?.[1] && (
                    <div className='my-2'>
                      <img
                        src={BASE + post.likes?.[1]?.picture}
                        alt={post.likes?.[1]?.name + " " + post.likes?.[1]?.surname}
                        className="rounded-circle me-2"
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          border: '2px solid #ddd',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Link to={'/profile/' + post.likes?.[1].id}>
                        {post.likes?.[1]?.name} {post.likes?.[1]?.surname}
                      </Link>
                    </div>
                  )}

                  {post.likes?.[2] && (
                    <div className='my-2'>
                      <img
                        src={BASE + post.likes?.[2]?.picture}
                        alt={post.likes?.[2]?.name + " " + post.likes?.[2]?.surname}
                        className="rounded-circle me-2"
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          border: '2px solid #ddd',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Link to={'/profile/' + post.likes?.[2].id}>
                        {post.likes?.[2]?.name} {post.likes?.[2]?.surname}
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-1">
                <p>Comments:💭</p>
                {post.comments?.slice(-3).map((comment) => (
                  <div key={comment.id}>
                    <strong>{comment.user.name}</strong>
                    <div>
                      <small>{comment.content}</small>
                    </div>
                  </div>
                ))}
              </div>


              <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                <form onSubmit={commentHandler} style={{ display: 'flex', width: '100%', margin: 0 }}>
                  <MDBInput
                    placeholder="What you think?"
                    type="text"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                  <button type="submit" className='btn btn-success' style={{ marginLeft: '10px' }}>
                    Comment
                  </button>
                </form>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </Box>
    </Modal>
  )
}