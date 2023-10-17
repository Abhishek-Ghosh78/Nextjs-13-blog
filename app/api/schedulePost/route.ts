import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import schedule from "node-schedule";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { scheduleDateTime, id } = await req.json();
    console.log(scheduleDateTime);
    const result = schedule.scheduleJob(scheduleDateTime, async () => {
      const post = await prisma.post.update({
        where: {
          id: Number(id),
        },
        data: {
          status: "published",
        },
      });
      // console.log(post);
      return NextResponse.json({ message: "successfully scheduled the post" });
    });
    console.log(result);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "something went wrong" });
  }
}
