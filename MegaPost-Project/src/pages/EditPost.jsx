import React from 'react'
import {Container, PostForm} from "../components"
import appwriteService from "../appwrite/config"
import { useEffect , useState} from 'react'
import {useParams, useNavigate} from "react-router-dom"


function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() =>{
    if(slug){
        appwriteService.getPost(slug).then((post) =>{
            if(post){
                setPost(post)
            }
        })
    }else{
        navigate('/');
    }
    }, [slug, navigate])

  return post ? (
    <div className='pt-8'>
        <Container>
            <PostForm post={post} />
        </Container>

    </div>
  ) : null
}

export default EditPost
