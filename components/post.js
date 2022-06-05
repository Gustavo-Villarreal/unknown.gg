import { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from './modal';
import EditPost from './edit-post';
import { deletePost } from '../src/graphql/mutations';
import { API } from 'aws-amplify';

const Post = ({post, username}) => {
  const [showModal, setShowModal] = useState(false)  
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const router = useRouter() 


  const sendDelete = async () => {
    let response = await API.graphql({
        query: deletePost,
        variables: { input: { id: post.id }  },
        authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    let { id } = response.data.deletePost
    if(id) setDeleted(true)
  }

  if(deleted) return 

  return(
    <div onClick={()=> router.push(`/posts/${post.id}`) } className="first:mt-10 mt-5 text-neutral-50 rounded bg-purple-700 px-5 py-2 cursor-pointer relative">
      <p>{post.title}</p>
      <p>{post.description}</p>
      <p>by: {post.username}</p>
      {
        post.username == username &&
        
        <div onClick={(e)=>e.stopPropagation()}>
          <div className='absolute bottom-2 right-2 flex'>
            <button onClick={(e)=>{setShowModal(true)}} className='py-1 px-3 mr-3 text-neutral-50 rounded text-sm'>
              Edit
            </button>

            <button onClick={(e)=>{setShowModalDelete(true)}} className='py-1 px-3 text-red-500 rounded text-sm'>
              Delete
            </button>
          </div>
          
          <Modal show={showModal} onDissmiss={()=>setShowModal(false)}>
            <div className="bg-neutral-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <EditPost post={post}/>
            </div>
          </Modal>

          <Modal show={showModalDelete} onDissmiss={()=>setShowModalDelete(false)}>
            <div className="bg-neutral-700 sm:p-6 sm:pb-4">
              <p className='text-neutral-50 mb-3'>Are you sure you wish to delete this post</p>
              <div className='sm:flex sm:flex-row'>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowModalDelete(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => sendDelete()}
                >
                  Delete
                </button>
              </div>
              
            </div>
          </Modal>
          

        </div>
      }
    </div>
  );
}

export default Post;