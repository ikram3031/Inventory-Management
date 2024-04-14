import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { UserCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallbackPage() {
    const navigate = useNavigate();
    
    const { user } = useAuth0();
    const { createUser } = useCreateMyUser();
    
    const hasCreatedUser = useRef(false)
    
    useEffect(() => {
        if(user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({ auth0Id: user.sub, email: user.email })
            hasCreatedUser.current = true
        }
        navigate('/')
    }, [createUser, navigate, UserCircle]);
    
    return (
        <>Loading...</>
    )
}
