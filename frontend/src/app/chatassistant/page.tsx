"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ai-elements/prompt-input";
import { Action, Actions } from "@/components/ai-elements/actions";
import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Response } from "@/components/ai-elements/response";
import { CopyIcon } from "lucide-react";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { Loader } from "@/components/ai-elements/loader";

const AIChat = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, append, status, error } = useChat() as any;

  const handleSubmit = () => {
    if (input.trim()) {
      const text = input.trim();
      setInput("");
      if (typeof sendMessage === "function") {
        sendMessage({ text });
      } else if (typeof append === "function") {
        append({ role: "user", content: text });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
      <div className="flex flex-col h-full">
        <Conversation className="h-full overflow-y-auto">
          <ConversationContent>
            {messages && messages.length === 0 && (
              <div className="text-center text-muted-foreground my-8">
                <h3 className="text-lg font-medium">👋 Welcome to MindHaven AI</h3>
                <p className="text-sm mt-1">How can I support your mental well-being today?</p>
              </div>
            )}

            {messages && messages.map((message: any) => {
              const sourceParts = message.parts?.filter((part: any) => part.type === "source-url") || [];
              const parts = message.parts && message.parts.length > 0
                ? message.parts
                : [{ type: "text" as const, text: message.content || "" }];

              return (
                <div key={message.id} className="mb-4">
                  {message.role === "assistant" && sourceParts.length > 0 && (
                    <Sources>
                      <SourcesTrigger count={sourceParts.length} />
                      {sourceParts.map((part: any, i: number) => (
                        <SourcesContent key={`${message.id}-src-${i}`}>
                          <Source href={part.url} title={part.url} />
                        </SourcesContent>
                      ))}
                    </Sources>
                  )}
                  {parts.map((part: any, i: number) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <React.Fragment key={`${message.id}-${i}`}>
                            <Message from={message.role}>
                              <MessageContent>
                                <Response>{part.text}</Response>
                              </MessageContent>
                            </Message>
                            {message.role === "assistant" && i === parts.length - 1 && (
                              <Actions className="mt-2">
                                <Action
                                  onClick={() => navigator.clipboard.writeText(part.text)}
                                  label="Copy"
                                >
                                  <CopyIcon className="size-3" />
                                </Action>
                              </Actions>
                            )}
                          </React.Fragment>
                        );
                      case "reasoning":
                        return (
                          <Reasoning
                            key={`${message.id}-${i}`}
                            className="w-full"
                            isStreaming={
                              status === "streaming" &&
                              i === parts.length - 1 &&
                              message.id === messages.at(-1)?.id
                            }
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>{part.text}</ReasoningContent>
                          </Reasoning>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              );
            })}

            {status === "submitted" && <Loader />}

            {error && (
              <div className="p-3 my-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                ⚠️ {error.message || "An error occurred while communicating with MindHaven AI."}
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput onSubmit={handleSubmit} className="mt-4">
          <PromptInputTextarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Type your message or concerns..."
          />
          <PromptInputToolbar>
            <PromptInputSubmit disabled={!input.trim()} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default AIChat;
