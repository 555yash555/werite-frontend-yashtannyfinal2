//recursive approach gives overhead issue
// export function buildCommentTree(comments, reply_of_comment_id = 0) {
//   return comments
//     ?.filter((comment) => comment.reply_of_comment_id === reply_of_comment_id)
//     .map((comment) => ({
//       comment,
//       children: buildCommentTree(comments, comment.comment_id),
//     }));
// }

//iterative approach
export function buildCommentTree(comments) {
  const tree = [];
  const map = {};

  for (const comment of comments) {
    map[comment.comment_id] = { comment, children: [] };
  }

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    const parent = map[comment.reply_of_comment_id];
    if (parent) {
      parent.children.push(map[comment.comment_id]);
    } else {
      tree.push(map[comment.comment_id]);
    }
  }

  return tree;
}
