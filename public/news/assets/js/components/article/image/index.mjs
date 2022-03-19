export default function ArticleImage(props) {
  const { post, att } = props;

  return `
  <a 
    style="
      display: block;
      max-width: ${post.attachments.length > 1 ? window.innerWidth < 500 ? "20%" : "48%" : "70%"};
      margin: 2px;
    "
    href="${window.VK_LINK}/${window.VK_GROUP_ID}?w=wall${post.owner_id}_${post.id}" rel="noreferrer" target="_blank"
    title="Ссылка на пост VK.com"
  >
    <img
      style="
        width: 100%;
      "
      src="${att.photo.sizes[att.photo.sizes.length - 1].url}"
      alt="${att.photo.text}"
    />
  </a>
  `;
}