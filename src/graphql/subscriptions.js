/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($username: String) {
    onCreatePost(username: $username) {
      id
      title
      description
      username
      coverImage
      comments {
        items {
          id
          postID
          content
          parentID
          username
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($username: String) {
    onUpdatePost(username: $username) {
      id
      title
      description
      username
      coverImage
      comments {
        items {
          id
          postID
          content
          parentID
          username
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($username: String) {
    onDeletePost(username: $username) {
      id
      title
      description
      username
      coverImage
      comments {
        items {
          id
          postID
          content
          parentID
          username
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($username: String) {
    onCreateComment(username: $username) {
      id
      postID
      post {
        id
        title
        description
        username
        coverImage
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      parentID
      username
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($username: String) {
    onUpdateComment(username: $username) {
      id
      postID
      post {
        id
        title
        description
        username
        coverImage
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      parentID
      username
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($username: String) {
    onDeleteComment(username: $username) {
      id
      postID
      post {
        id
        title
        description
        username
        coverImage
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      parentID
      username
      createdAt
      updatedAt
    }
  }
`;
