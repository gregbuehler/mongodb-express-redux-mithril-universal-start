const LOADALL   = 'my-app/post/LOADALL';
const LOAD   = 'my-app/post/LOAD';
const CREATE = 'my-app/post/CREATE';
const UPDATE = 'my-app/post/UPDATE';
const REMOVE = 'my-app/post/REMOVE';


function reducer(state, action) {
  switch (action.type) {
    // do reducer stuff
    default: return state;
  }
}

function loadPosts() {
  return { type: LOADALL };
}

function loadPost(id) {
  return { type: LOAD, id };
}

function createPost(post) {
  return { type: CREATE, post: post };
}

function updatePost(post) {
  return { type: UPDATE, post: post };
}

function removePost(id) {
  return { type: REMOVE, id };
}

modules.exports = {
	reducer: reducer,
	loadPosts: loadPosts,
	loadPost: loadPost,
	createPost: createPost,
	updatePost: updatePost,
	removePost: removePost
}

