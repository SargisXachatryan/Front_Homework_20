import { IPost } from "../helpers/types"
import { BASE } from "../helpers/default"
import { handlePostReaction } from "../helpers/api"
import { Preview } from "./Preview"
import { useState } from "react"

interface Props {
  posts: IPost[]
  onUpdate?: (id: number) => void
}

export function Gallery({ posts, onUpdate }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [currentPost, setCurrentPost] = useState<number>(-1)

  const handleReact = (id: number) => {
    handlePostReaction(id).then(() => {
      if (onUpdate) onUpdate(id)
    })
  }

  return (
    <div className="list">
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <div className="post">
              <img src={BASE + post.picture} />
              <div
                onClick={() => {
                    setOpen(true)
                    setCurrentPost(post.id)
                }}
                className="cover"
              ></div>
              <img
                className="like-button"
                onClick={() => handleReact(post.id)}
                src={
                  !post.isLiked
                    ? "https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_white.png"
                    : "https://cdn0.iconfinder.com/data/icons/sweets/128/heart_love_pink.png"
                }
              />
            </div>
            <p>
              {post.title} <small>({post.likes.length} likes)</small>
            </p>
            {
                currentPost != -1
                && <Preview
                    post={currentPost}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            }
          </div>
        )
      })}
    </div>
  )
}
