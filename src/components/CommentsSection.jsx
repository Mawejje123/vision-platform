import React, { useState } from 'react';
import { MessageCircle, Heart, Send, User } from 'lucide-react';

const CommentsSection = ({ projectId, initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, oldest, popular

  // Mock current user - Replace with real auth later
  const currentUser = {
    id: 1,
    name: "Current User",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"
  };

  // Add new comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: currentUser,
      text: newComment,
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  // Add reply to comment
  const handleAddReply = (commentId) => {
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      user: currentUser,
      text: replyText,
      timestamp: new Date(),
      likes: 0,
      isLiked: false
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));

    setReplyText('');
    setReplyingTo(null);
  };

  // Toggle like on comment
  const handleLikeComment = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments.map(comment => 
        comment.id === parentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? {
                      ...reply,
                      isLiked: !reply.isLiked,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      ));
    }
  };

  // Sort comments
  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.timestamp - a.timestamp;
      case 'oldest':
        return a.timestamp - b.timestamp;
      case 'popular':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  // Format timestamp
  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(timestamp)) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    
    return new Date(timestamp).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <MessageCircle size={24} className="text-orange-500" />
            <span>Comments ({comments.length})</span>
          </h2>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Add Comment Box */}
        <div className="mb-8">
          <div className="flex items-start space-x-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this project..."
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500 resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Send size={18} />
                  <span>Post Comment</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {sortedComments.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle size={48} className="text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            sortedComments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                {/* Main Comment */}
                <div className="flex items-start space-x-3">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{comment.user.name}</h4>
                        <span className="text-gray-500 text-sm">{formatTime(comment.timestamp)}</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{comment.text}</p>
                    </div>
                    
                    {/* Comment Actions */}
                    <div className="flex items-center space-x-4 mt-2 ml-4">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center space-x-1 text-gray-400 hover:text-orange-500 transition-colors"
                      >
                        <Heart
                          size={16}
                          className={comment.isLiked ? 'fill-orange-500 text-orange-500' : ''}
                        />
                        <span className="text-sm">{comment.likes > 0 ? comment.likes : 'Like'}</span>
                      </button>
                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                      >
                        Reply
                      </button>
                    </div>

                    {/* Reply Box */}
                    {replyingTo === comment.id && (
                      <div className="mt-4 ml-4 flex items-start space-x-3">
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Reply to ${comment.user.name}...`}
                            rows={2}
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 transition-colors placeholder-gray-500 resize-none text-sm"
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText('');
                              }}
                              className="text-gray-400 hover:text-white px-4 py-1 rounded text-sm transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleAddReply(comment.id)}
                              disabled={!replyText.trim()}
                              className="bg-orange-500 text-white px-4 py-1 rounded text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 ml-4 space-y-3 border-l-2 border-gray-800 pl-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-3">
                            <img
                              src={reply.user.avatar}
                              alt={reply.user.name}
                              className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="bg-gray-800/50 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <h5 className="text-white font-semibold text-sm">{reply.user.name}</h5>
                                  <span className="text-gray-500 text-xs">{formatTime(reply.timestamp)}</span>
                                </div>
                                <p className="text-gray-300 text-sm">{reply.text}</p>
                              </div>
                              <div className="flex items-center space-x-4 mt-1 ml-3">
                                <button
                                  onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                  className="flex items-center space-x-1 text-gray-400 hover:text-orange-500 transition-colors"
                                >
                                  <Heart
                                    size={14}
                                    className={reply.isLiked ? 'fill-orange-500 text-orange-500' : ''}
                                  />
                                  <span className="text-xs">{reply.likes > 0 ? reply.likes : 'Like'}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;