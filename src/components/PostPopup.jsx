/* eslint-disable react/prop-types */

const PostPopup = ({ post, closePopup }) => {
  const handlePopupClick = (e) => {
    if (e.target.classList.contains("popup-background")) {
      closePopup();
    }
  };

  return (
    <div className="popup-background" onClick={handlePopupClick}>
      <div className="popup-content">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default PostPopup;
