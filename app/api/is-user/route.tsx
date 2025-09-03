import { db } from "@/utils/db";
import { users } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {user} =await req.json();

    try {
        const userInfo = await db.select().from(users)
        .where(eq(users.email,user?.primaryEmailAddress?.emailAddress))
        console.log(userInfo)
        
        if(userInfo.length ==0){
            console.log("Inserting new user...");
            const newUser = await db.insert(users).values({
                name:user?.fullName,
                email:user?.primaryEmailAddress?.emailAddress,
            }).returning({users:users})
            console.log("User inserted!");
            return NextResponse.json({result:newUser[0].users})
        }

        return NextResponse.json({result:userInfo[0]})
    } catch (error) {
        return NextResponse.json({result:error})
    }
}