import {
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit'
import { Box, Modal } from '@mui/material'
import { IComment, IPost } from '../helpers/types'
import { BASE } from '../helpers/default'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPost, handleComment } from '../helpers/api'

interface Props {
  open: boolean
  post: number
  onClose: () => void
}
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

export function Preview({ open, onClose, post }: Props) {
  const [comment, setComment] = useState<string>('')
  const [postInfo, setPostInfo] = useState<IPost | null>(null)
  useEffect(() => {

    getPost(post)
      .then(response => {
        setPostInfo(response.payload as IPost)
      })
  }, [post])

  const commentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!postInfo) {
      return
    }
    if (comment.trim()) {
      handleComment(comment, postInfo.id)
        .then(res => {
          const payload = res.payload as IComment
          if (payload) {
            setPostInfo({ ...postInfo, comments: [...postInfo.comments, payload] })
          }
          setComment("")
        })
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <MDBRow style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {
          postInfo && (
          <MDBCol md="8" style={{ height: '100%', overflow: 'hidden' }}>
            <img
              className='preview-post'
              src={BASE + postInfo.picture}
              alt="Post"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </MDBCol>
          )
          }

          <MDBCol md="4" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MDBCardBody className="p-0" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div className="mb-1">
                <strong>{postInfo?.likes.length} likes, {postInfo?.comments.length} comments</strong>
                <p>Likes:💖</p>
                <div className='my-3'>
                  {postInfo?.likes?.slice(-3).map((like) => (
                    <div key={like.id} className='my-2'>
                      <img
                        src={BASE + like.picture}
                        alt={like.name + " " + like.surname}
                        className="rounded-circle me-2"
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          border: '2px solid #ddd',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Link to={'/profile/' + like.id}>
                        {like.name} {like.surname}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>


              <div className="mb-1">
                <p>Comments:💭</p>
                {postInfo?.comments?.slice(-3).map((comment) => (
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