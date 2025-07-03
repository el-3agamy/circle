'use client'

import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
const {isUserLoggedIn} = useSelector((state : RootState)=>state.auth) ;
const router = useRouter()
  return (
  <>
    {
      isUserLoggedIn ?  router.push('/posts') :router.push('/login') 
    }
  </>
  );
}
