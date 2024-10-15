import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";
// for chatting
export async function sendMessage(req,res){
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const {message} = req.body;
        let conversation = await conversationModel.findOne({
            participants:{$all:[senderId, receiverId]}
        });
        // establish the conversation if not started yet.
        if(!conversation){
            conversation =await new conversationModel({
                participants:[senderId,receiverId]
            })
        };
        const newMessage = await new messageModel({
            senderId,
            receiverId,
            message
        });
        if(newMessage) conversation.messages.push(newMessage._id);

        await new conversationModel([conversation.save(),newMessage.save()])
        return res.status(201).json({
            success:true,
            newMessage
        })
    } catch (error) {
        console.log(error);
    }
}
export async function getMessage(req,res){
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const conversation = await conversationModel.findOne({
            participants:{$all: [senderId, receiverId]}
        }).populate('messages');
        if(!conversation) return res.status(200).json({success:true, messages:[]});

        return res.status(200).json({success:true, messages:conversation?.messages});
        
    } catch (error) {
        console.log(error);
    }
}