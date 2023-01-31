function Button({ onClick }) {
  return (
    <button className="Button" type="button" name="loadMore" onClick={onClick}>
      Load more...
    </button>
  );
}

export default Button;
