import { addDoc, getDocs,deleteDoc, collection, query, where, doc, getDoc } from "firebase/firestore";
import { Post as IPost } from "./main"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post:IPost;
}

interface Like {
    likeId:string;
    userId:string;
}

export const Post = (props: Props) => {
    const {post} = props;
    const [user] = useAuthState(auth);
    const [likes,setLikes] = useState<Like [] | null>(null);

    const likeRef = collection(db,"likes");

    const likesDoc = query(likeRef, where("postId","==",post.id))

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=> ({userId:doc.data().userId, likeId:doc.id})));
    }

    const addLike = async () => {
        const newDoc = await addDoc(likeRef, {userId: user?.uid, postId:post.id});
        if(user){
            setLikes((prev) => prev ? [...prev,{userId:user?.uid, likeId:newDoc.id}] : [{userId:user?.uid,likeId:newDoc.id}]);
        }
        
    };



    const removeLike = async () => {

        const likeToDeleteQuery= query(likeRef, where("postId","==",post.id), where("userId","==",user?.uid))
        const likeToDeleteData = await getDocs(likeToDeleteQuery)
        const likeId = likeToDeleteData.docs[0].id;
        const likeToDelete = doc(db,"likes",likeId);
        
        await deleteDoc(likeToDelete);

        if(user){
            setLikes((prev) => prev && prev.filter((like) => like.likeId !==likeId));
        }
        
    };


    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)


    useEffect(() => {
        getLikes();
    }, []);



    return (
        <div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>
               {likes && <p>Likes: {likes.length}</p>}
            </div>
            <br></br>
        </div>
    )
}