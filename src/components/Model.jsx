/* eslint-disable react/prop-types */

function Model({ data }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{data?.title}</h2>
        <p>{data?.body}</p>
      </div>
    </div>
  );
}

export default Model;
