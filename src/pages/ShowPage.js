import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ShowPage = () => {
    const{id} = useParams();
    const[post, setPosts] = useState(null);
    const[loading, setLoading] = useState(true);

    const getPosts = () =>{
        axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
            setPosts(res.data)
            setLoading(false);
        })
    };

    useEffect(() => {
        getPosts(id)
    }, [id])

    const printDate = (timestamp) =>{
        return new Date(timestamp).toLocaleString();
    }

    if(loading){
        return <LoadingSpinner/>
    }

    return <div>
        <div className="d-flex">
            <h1 className="flex-grow-1">{post.title}</h1>
            <div>
                <Link className="btn btn-primary"
                to ={`/blogs/${id}/edit`}>
                    Edit
                </Link>
            </div>
        </div>
        <small className="text-muted">
            Create At: {printDate(post.createdAt)}
            </small>
            <hr/>
        <p>{post.body}</p>
    </div>;
    
};

export default ShowPage;