"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { 
  Heart, 
  MessageSquare, 
  Flag, 
  MoreVertical, 
  Reply, 
  User,
  ThumbsUp
} from "lucide-react";

interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    user: "Brian Otieno",
    avatar: "👤",
    content: "Can't wait for this tournament! Who's your favourite team?",
    timestamp: "10:24 AM",
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: "1-1",
        user: "Denis Kariuki",
        avatar: "👤",
        content: "Kasarani Spikers all the way! 🏐",
        timestamp: "10:30 AM",
        likes: 5,
        isLiked: false,
      },
      {
        id: "1-2",
        user: "James Ngugi",
        avatar: "👤",
        content: "I'm rooting for Umoja Warriors. They've been training hard.",
        timestamp: "10:45 AM",
        likes: 3,
        isLiked: false,
      }
    ]
  },
  {
    id: "2",
    user: "Mary Akinyi",
    avatar: "👤",
    content: "Is the entry fee KSh 6,000 per team or per player?",
    timestamp: "9:15 AM",
    likes: 8,
    isLiked: false,
  },
  {
    id: "3",
    user: "Kevin Mwangi",
    avatar: "👤",
    content: "The venue changed? I thought it was at Kasarani Stadium.",
    timestamp: "Yesterday",
    likes: 4,
    isLiked: false,
  },
];

export const CommentSection = ({ tournamentId }: { tournamentId: string }) => {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(prev => prev.map(comment => {
        if (comment.id === parentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return { 
                  ...reply, 
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked
                };
              }
              return reply;
            })
          };
        }
        return comment;
      }));
    } else {
      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          return { 
            ...comment, 
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
        return comment;
      }));
    }
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      user: "You",
      avatar: "👤",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
    };

    setTimeout(() => {
      setComments([newCommentObj, ...comments]);
      setNewComment("");
      setIsSubmitting(false);
    }, 500);
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    const newReply: Comment = {
      id: `${parentId}-${Date.now()}`,
      user: "You",
      avatar: "👤",
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    }));

    setReplyContent("");
    setReplyToId(null);
  };

  const handleReport = (commentId: string) => {
    alert("Comment reported to moderators. Thank you for keeping the community safe!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-vball-navy text-lg">Comments ({comments.length})</h3>
        <span className="text-xs text-gray-400">Join the discussion</span>
      </div>

      {/* Input Area */}
      <Card className="p-3">
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-vball-blue/10 rounded-full flex items-center justify-center text-vball-blue flex-shrink-0">
            <User size={20} />
          </div>
          <textarea
            className="flex-1 bg-vball-bg rounded-xl px-3 py-2 text-sm text-vball-text placeholder:text-vball-muted focus:outline-none focus:ring-2 focus:ring-vball-blue resize-none h-12"
            placeholder="Share your thoughts about this tournament..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmitComment();
              }
            }}
          />
          <Button 
            size="sm" 
            className="self-end" 
            onClick={handleSubmitComment}
            isLoading={isSubmitting}
            disabled={!newComment.trim()}
          >
            Post
          </Button>
        </div>
      </Card>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <Card className="p-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-vball-bg rounded-full flex items-center justify-center text-gray-600 flex-shrink-0 text-lg">
                  {comment.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-vball-navy text-sm">{comment.user}</span>
                      <span className="text-[10px] text-gray-400">{comment.timestamp}</span>
                    </div>
                    <button 
                      onClick={() => handleReport(comment.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Report"
                    >
                      <Flag size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                  
                  {/* Actions Bar */}
                  <div className="flex items-center gap-4 mt-2">
                    <button 
                      className={`flex items-center gap-1 text-xs transition-colors ${comment.isLiked ? 'text-vball-blue' : 'text-gray-500 hover:text-vball-blue'}`}
                      onClick={() => handleLike(comment.id)}
                    >
                      <ThumbsUp size={14} className={comment.isLiked ? 'fill-vball-blue' : ''} />
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                    </button>
                    <button 
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-vball-navy transition-colors"
                      onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                    >
                      <Reply size={14} /> Reply
                    </button>
                  </div>

                  {/* Reply Input */}
                  {replyToId === comment.id && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        className="flex-1 bg-vball-bg rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-vball-blue"
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmitReply(comment.id);
                          }
                        }}
                      />
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyContent.trim()}
                      >
                        Reply
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-6 space-y-2 border-l-2 border-gray-100 ml-4">
                {comment.replies.map((reply) => (
                  <Card key={reply.id} className="p-3 bg-vball-bg">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 flex-shrink-0 text-sm">
                        {reply.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-vball-navy text-xs">{reply.user}</span>
                            <span className="text-[10px] text-gray-400">{reply.timestamp}</span>
                          </div>
                          <button 
                            onClick={() => handleReport(reply.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Flag size={12} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <button 
                            className={`flex items-center gap-1 text-xs transition-colors ${reply.isLiked ? 'text-vball-blue' : 'text-gray-500 hover:text-vball-blue'}`}
                            onClick={() => handleLike(reply.id, true, comment.id)}
                          >
                            <ThumbsUp size={14} className={reply.isLiked ? 'fill-vball-blue' : ''} />
                            {reply.likes > 0 && <span>{reply.likes}</span>}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};