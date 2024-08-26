import { connectToDB } from "@/utils/database";
import Conversation from "@/models/Conversation";

export async function POST(request) {
  try {
    await connectToDB();

    const body = await request.json();
    const senderId = body.senderId;

    const url = new URL(request.url);
    const receiverId = url.pathname.split("/").pop();
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    if (!senderId || !receiverId) {
      return new Response(JSON.stringify({ error: "Sender ID is required" }), {
        status: 400,
      });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
      isGroupChat: false,
    }).populate("messages");
    console.log("hello");
    if (!conversation) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const messages = conversation.messages;
    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Error in receive Message controller" }),
      { status: 500 }
    );
  }
}
