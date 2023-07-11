const addButton = document.querySelector(".comment-submit");

addButton.addEventListener("click", function () {
  // コメントを取得と処理
  const commentText = document.querySelector('textarea[name="comment"]').value;

  // 入力されたコメントが空でない場合のみ処理を実行
  if (commentText.trim() !== "") {
    // 新しいコメント要素を作成
    const newComment = document.createElement("div");
    newComment.className = "post-comment";

    const commentScore = document.createElement("div");
    commentScore.className = "comment-score";

    const incrementButton = document.createElement("button");
    incrementButton.className = "increment-button";
    incrementButton.textContent = "+";

    const score = document.createElement("div");
    score.className = "score";
    score.textContent = "0";

    const decrementButton = document.createElement("button");
    decrementButton.className = "decrement-button";
    decrementButton.textContent = "-";

    commentScore.appendChild(incrementButton);
    commentScore.appendChild(score);
    commentScore.appendChild(decrementButton);

    const listContent = document.createElement("div");
    listContent.className = "list-content";

    const user = document.createElement("div");
    user.className = "user";

    const userImage = document.createElement("div");
    userImage.className = "user-image";

    const userImageImg = document.createElement("img");
    userImageImg.src = "./Image/image.jpg";
    userImageImg.alt = "image";
    userImageImg.width = "50";
    userImageImg.height = "50";

    userImage.appendChild(userImageImg);
    user.appendChild(userImage);

    listContent.appendChild(user);

    const name = document.createElement("div");
    name.className = "name";
    name.textContent = "Ravindu";
    listContent.appendChild(name);

    const day = document.createElement("div");
    day.className = "day";
    day.textContent = "3 days ago";
    listContent.appendChild(day);

    const commentActions = document.createElement("div");
    commentActions.className = "comment-actions";

    const editImage = document.createElement("img");
    editImage.src = "./Image/edit.jpg";
    editImage.alt = "image";
    editImage.width = "20";
    editImage.height = "20";
    commentActions.appendChild(editImage);

    const editComment = document.createElement("div");
    editComment.className = "edit-comment";
    editComment.textContent = "Edit";
    commentActions.appendChild(editComment);

    const deleteImage = document.createElement("img");
    deleteImage.src = "./Image/delete.jpg";
    deleteImage.alt = "image";
    deleteImage.width = "20";
    deleteImage.height = "20";
    commentActions.appendChild(deleteImage);

    const deleteComment = document.createElement("div");
    deleteComment.className = "delete-comment";
    deleteComment.textContent = "Delete";
    commentActions.appendChild(deleteComment);

    listContent.appendChild(commentActions);

    const commentPost = document.createElement("div");
    commentPost.className = "comment-post";
    commentPost.textContent = commentText;
    listContent.appendChild(commentPost);

    newComment.appendChild(commentScore);
    newComment.appendChild(listContent);

    //コンメトセクションに新しいコンメトを追加する

    const commentSection = document.querySelector(".comment-session");
    const commentBox = document.querySelector(".comment-box");
    commentSection.insertBefore(newComment, commentBox);

    //テキストエリアをリセット
    document.querySelector('textarea[name="comment"]').value = "";
  }
});

// Increment button event listener
document.addEventListener("click", function (event) {
  const incrementButton = event.target.closest(".increment-button");
  if (incrementButton) {
    const scoreElement = incrementButton.nextElementSibling;
    let score = parseInt(scoreElement.textContent);
    score += 1;
    scoreElement.textContent = score.toString();
  }

  const decrementButton = event.target.closest(".decrement-button");
  if (decrementButton) {
    const scoreElement = decrementButton.previousElementSibling;
    let score = parseInt(scoreElement.textContent);
    if (score > 0) {
      score -= 1;
      scoreElement.textContent = score.toString();
    }
  }
});

// 共通の機能を持つeditAction関数
const editAction = (comment) => {
  const commentPost = comment.querySelector(".comment-post");
  const textarea = document.createElement("textarea");
  textarea.className = "comment-edit-textarea";
  textarea.value = commentPost?.textContent ? commentPost.textContent : "";
  const commentBox = document.createElement("div");
  commentBox.className = "comment-edit-box";
  commentBox.appendChild(textarea);
  commentPost && commentPost.replaceWith(commentBox);

  const saveButton = document.createElement("button");
  saveButton.className = "save-comment";
  saveButton.textContent = "Update";
  commentBox.appendChild(saveButton);

  saveButton.addEventListener("click", function () {
    const editedText = textarea.value;
    const newCommentPost = document.createElement("div");
    newCommentPost.className = "comment-post";
    newCommentPost.textContent = editedText;
    commentBox.replaceWith(newCommentPost);
  });
};

// Editボタンのクリックイベントリスナーを追加
document.addEventListener("click", function (event) {
  const editButton = event.target.closest(".edit-comment");

  if (editButton) {
    const comment = editButton.closest(".comment");
    const postComment = editButton.closest(".post-comment");

    if (comment) {
      editAction(comment);
    }
    if (postComment) {
      editAction(postComment);
    }
  }
});


// 削除ボタンのクリックイベントリスナーを追加
document.addEventListener("click", function (event) {
  const deleteButton = event.target.closest(".delete-comment");
  if (deleteButton) {
    const comment = deleteButton.closest(".comment");
    const postComment = deleteButton.closest(".post-comment");
    if (comment || postComment) {
      const confirmationDialog = document.getElementById("confirmation-dialog");
      confirmationDialog.showModal();

      const confirmDeleteButton = document.getElementById("confirm-delete");
      const cancelDeleteButton = document.getElementById("cancel-delete");

      confirmDeleteButton.addEventListener("click", function () {
        comment?.remove();
        postComment?.remove()
        confirmationDialog.close();
      });

      cancelDeleteButton.addEventListener("click", function () {
        confirmationDialog.close();
      });
    }
  }
});


// Reply button event listener
const replyButtons = document.querySelectorAll(".reply-button");
replyButtons.forEach((replyButton, index) => {
  replyButton.addEventListener("click", function (event) {
    const replyForms = document.querySelectorAll(".reply-form");
    replyForms.forEach((replyForm) => {
      replyForm.style.display = "none"; // すべての返信フォームを非表示にする
      replyForm.querySelector(".reply-text").value = ""; // テキストエリアをクリア
    });

    const replyForm = replyForms[index];
    replyForm.style.display = "block"; // クリックされた返信フォームを表示する
  });
});


// Step 1: Create the comment score element
const createCommentScoreElement = () => {
  const commentScore = document.createElement("div");
  commentScore.className = "comment-score";

  const incrementButton = document.createElement("button");
  incrementButton.className = "increment-button";
  incrementButton.textContent = "+";

  const score = document.createElement("div");
  score.className = "score";
  score.textContent = "0";

  const decrementButton = document.createElement("button");
  decrementButton.className = "decrement-button";
  decrementButton.textContent = "-";

  commentScore.appendChild(incrementButton);
  commentScore.appendChild(score);
  commentScore.appendChild(decrementButton);

  return commentScore;
};

// Step 2: Create the user element
const createUserElement = () => {
  const user = document.createElement("div");
  user.className = "user";

  const userImage = document.createElement("div");
  userImage.className = "user-image";

  const userImageImg = document.createElement("img");
  userImageImg.src = "./Image/image.jpg";
  userImageImg.alt = "image";
  userImageImg.width = "50";
  userImageImg.height = "50";

  userImage.appendChild(userImageImg);
  user.appendChild(userImage);

  return user;
};

// Step 3: Create the comment actions element
const createCommentActionsElement = () => {
  const commentActions = document.createElement("div");
  commentActions.className = "comment-actions";

  const editImage = document.createElement("img");
  editImage.src = "./Image/edit.jpg";
  editImage.alt = "image";
  editImage.width = "20";
  editImage.height = "20";
  commentActions.appendChild(editImage);

  const editComment = document.createElement("div");
  editComment.className = "edit-comment";
  editComment.textContent = "Edit";
  commentActions.appendChild(editComment);

  const deleteImage = document.createElement("img");
  deleteImage.src = "./Image/delete.jpg";
  deleteImage.alt = "image";
  deleteImage.width = "20";
  deleteImage.height = "20";
  commentActions.appendChild(deleteImage);

  const deleteComment = document.createElement("div");
  deleteComment.className = "delete-comment";
  deleteComment.textContent = "Delete";
  commentActions.appendChild(deleteComment);

  // Editボタンのクリックイベントリスナーを追加
  editComment.addEventListener("click", function (event) {
    const comment = editComment.closest(".comment");
    if (comment) {
      editAction(comment);

    }
  });

  return commentActions;
};

// Step 4: Create a new comment
const createNewComment = (commentText) => {
  const newComment = document.createElement("div");
  newComment.className = "comment";

  const commentScore = createCommentScoreElement();
  const user = createUserElement();
  const commentActions = createCommentActionsElement();

  const listContent = document.createElement("div");
  listContent.className = "list-content";

  listContent.appendChild(user);

  const name = document.createElement("div");
  name.className = "name";
  name.textContent = "Ravindu";
  listContent.appendChild(name);

  const day = document.createElement("div");
  day.className = "day";
  day.textContent = "1 month ago";
  listContent.appendChild(day);

  listContent.appendChild(commentActions);

  const commentPost = document.createElement("div");
  commentPost.className = "comment-post";
  commentPost.textContent = commentText;
  listContent.appendChild(commentPost);

  newComment.appendChild(commentScore);
  newComment.appendChild(listContent);

  return newComment;
};

// Reply submit button event listeners
const submitButtonsA = document.querySelectorAll(".reply-submitA");
submitButtonsA.forEach((submitButton) => {
  submitButton.addEventListener("click", function (event) {
    const replyForm = submitButton.parentNode;

    // Get the reply text
    const replyText = replyForm.querySelector(".reply-text").value;

    // Create a new comment element for the reply
    const replyComment = createNewComment(replyText);

    // Find the appropriate reply-comments container
    const replyCommentsContainer = document.querySelector(".reply-commentsA");

    // Check if the reply-comments container already exists, otherwise create it
    if (!replyCommentsContainer) {
      const replyCommentsWrapper = document.createElement("div");
      replyCommentsWrapper.className = "reply-commentsA";
      commentPost.appendChild(replyCommentsWrapper);
      replyCommentsContainer = replyCommentsWrapper;
    }

    // Insert the reply comment into the reply-comments container
    replyCommentsContainer.appendChild(replyComment);

    // Reset the reply form
    if (replyForm.style.display === "block") {
      replyForm.style.display = "none";
    }
  });
});

// Reply submit button event listeners
const submitButtonsB = document.querySelectorAll(".reply-submitB");
submitButtonsB.forEach((submitButton) => {
  submitButton.addEventListener("click", function (event) {
    const replyForm = submitButton.parentNode;

    // Get the reply text
    const replyText = replyForm.querySelector(".reply-text").value;

    // Create a new comment element for the reply
    const replyComment = createNewComment(replyText);

    // Find the appropriate reply-comments container
    const replyCommentsContainer = document.querySelector(".reply-commentsB");

    // Check if the reply-comments container already exists, otherwise create it
    if (!replyCommentsContainer) {
      const replyCommentsWrapper = document.createElement("div");
      replyCommentsWrapper.className = "reply-commentsB";
      commentPost.appendChild(replyCommentsWrapper);
      replyCommentsContainer = replyCommentsWrapper;
    }

    // Insert the reply comment into the reply-comments container
    replyCommentsContainer.appendChild(replyComment);

    if (replyForm.style.display === "block") {
      replyForm.style.display = "none";
    }
  });
});

fetch('data2.json')
  .then(response => response.json())
  .then(data2 => {
    const commentPosts = document.querySelectorAll('.post-comment');

    data2.comments.forEach((comment, index2) => {
      const commentPost = commentPosts[index2];

      const userImage = commentPost.querySelector('.user-image');
      const name = commentPost.querySelector('.name');
      const day = commentPost.querySelector('.day');
      const commentScore = commentPost.querySelector('.comment-score .score');
      const commentContent = commentPost.querySelector('.comment-post');

      if (userImage) {
        const userImageImg = document.createElement('img');
        userImageImg.src = comment.user.image.png;
        userImageImg.alt = "User Image";
        userImageImg.width = 50;
        userImageImg.height = 50;

        userImage.innerHTML = ''; // 既存のコンテンツをクリア
        userImage.appendChild(userImageImg);
      }
      if (name) {
        name.textContent = comment.user.username;
      }
      if (day) {
        day.textContent = comment.createdAt;
      }
      if (commentScore) {
        commentScore.textContent = comment.score;
      }
      if (commentContent) {
        commentContent.textContent = comment.content;
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  // フィルターボタンのクリックイベントリスナーを追加
const filterButton = document.getElementById("filter-button");
filterButton.addEventListener("click", function () {
  // フィルターの入力値を取得
  const filterValue = document.getElementById("filter-input").value.toLowerCase().trim();
  const filterSelect = document.getElementById("filter-select").value;

  // コメントを取得
  const comments = document.querySelectorAll(".post-comment");

  // コメントの配列に変換
  const commentsArray = Array.from(comments);

  // フィルタリングおよびソート
  const filteredComments = commentsArray.filter((comment) => {
    const name = comment.querySelector(".name").textContent.toLowerCase();
    const day = comment.querySelector(".day").textContent.toLowerCase();
    const score = comment.querySelector(".score").textContent.toLowerCase();

    if (filterSelect === "name" && name.includes(filterValue)) {
      return true;
    } else if (filterSelect === "day" && day.includes(filterValue)) {
      return true;
    } else if (filterSelect === "week" && day.includes(filterValue)) {
      return true;
    } else if (filterSelect === "year" && day.includes(filterValue)) {
      return true;
    } else if (filterSelect === "score" && score.includes(filterValue)) {
      return true;
    }

    return false;
  });

  // コメントセクションをクリア
  const commentSection = document.querySelector(".comment-session");
  commentSection.innerHTML = "";

  // フィルタリングおよびソートされたコメントを表示
  filteredComments.forEach((comment) => {
    commentSection.appendChild(comment);
  });
});

const nextButton = document.getElementById("previous-button");

nextButton.addEventListener("click", function() {
  window.location.href = "index1.html";
});


 