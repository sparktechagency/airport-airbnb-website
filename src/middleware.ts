// import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


const paths = ['/login','/register',"/verify/:path*",]
const dashPath = ["/saved-item","/property-info","/steps-of-host",]
export async function middleware(Request:NextRequest) {
    try {
       const path = Request.nextUrl.pathname
       const auth = (await cookies()).get("accessToken")?.value
       if(path.startsWith("/profile") && !auth){
           return NextResponse.redirect(new URL('/login',Request.url))
       }
       
       if(!auth && dashPath.includes(path)){
           return NextResponse.redirect(new URL('/login',Request.url))
       }

       return NextResponse.next()
       
        
    } catch (error) {
        
    }
}

export const config = {
    matcher:['/login','/register',"/profile","/saved-item","/property-info","/steps-of-host",]
}