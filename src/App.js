import { connect } from "react-redux";
import { getPost } from "./redux/action/action";
import { use, useEffect } from "react";

function App({ post, getPost }) {
  useEffect(() => {
    getPost();
  }, [getPost]);
  console.log("Post", post[7]?.title); // ❌ This will throw an error if post is undefined
  return (
    <div>
      <h2>Post Titles:</h2>
      <ul>
        {post?.map((post, index) => (
          <li key={post.id || index}>{post.title || "No Title Available"}</li> // ✅ Safe Access
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("Redux State:", state); // Debugging

  return {
    post: Array.isArray(state?.Post?.data) ? state.Post.data : [], // ✅ Ensure post is always an array
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: () => dispatch(getPost(getPost())),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
