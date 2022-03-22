import React from 'react'

const AttachImage = ({ att, post }) => {
  return (
    <img
      style={{
        display: "block",
        margin: "2px",
        maxWidth:
          post.attachments.length > 1
            ? window.innerWidth < 500
              ? "20%"
              : "48%"
            : "70%",
      }}
      src={att.photo.sizes[att.photo.sizes.length - 1].url}
      alt={att.photo.text}
    />
  )
}

export default AttachImage;
