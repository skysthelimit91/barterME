function messageConversation(message, conversations){
  return conversations.find(conversation => conversation.id === message.conversation_id);
}

function messagesForUser(userId, messages, conversations){
  return messages.filter(message => {
    const conversation = messageConversation(message, conversations);
    return conversation.recipient_id === userId || conversation.sender_id === userId;
  });
}

export {
  messagesForUser, messageConversation
};