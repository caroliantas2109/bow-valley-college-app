import React, { useState, useEffect } from 'react';
import './messages.css';
import {messagesData} from '../../../data/mockData';

const Messages = () => {
  // Initialize messages from JSON data
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Convert timestamp strings to Date objects when loading data
    const loadedMessages = messagesData.map(message => ({
      ...message,
      timestamp: new Date(message.timestamp)
    }));
    setMessages(loadedMessages);
  }, []);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, starred
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [newMessage, setNewMessage] = useState({
    to: '',
    subject: '',
    body: ''
  });

  // Filter messages based on current filter and search term
  const filteredMessages = messages.filter(message => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'unread' ? !message.read :
      filter === 'starred' ? message.starred : true;

    const matchesSearch = 
      searchTerm === '' ? true :
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.body.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Get unique senders for the sidebar
  const uniqueSenders = [...new Set(messages.map(msg => ({
    email: msg.sender,
    name: msg.senderName
  })).map(JSON.stringify))].map(JSON.parse);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, read: true } : msg
      ));
    }
  };

  const handleStarToggle = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  const handleSendMessage = () => {
    if (newMessage.to && newMessage.subject && newMessage.body) {
      const message = {
        id: Date.now(),
        sender: 'you@email.com',
        senderName: 'You',
        subject: newMessage.subject,
        body: newMessage.body,
        timestamp: new Date(),
        read: true,
        starred: false
      };
      
      setMessages(prev => [message, ...prev]);
      setNewMessage({ to: '', subject: '', body: '' });
      setShowCompose(false);
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="messages-app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Messages</h2>
          <button 
            className="compose-btn"
            onClick={() => setShowCompose(true)}
          >
            + Compose
          </button>
        </div>

        {/* Filters */}
        <div className="filters">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({messages.length})
          </button>
          <button 
            className={filter === 'unread' ? 'active' : ''}
            onClick={() => setFilter('unread')}
          >
            Unread ({messages.filter(m => !m.read).length})
          </button>
          <button 
            className={filter === 'starred' ? 'active' : ''}
            onClick={() => setFilter('starred')}
          >
            Starred ({messages.filter(m => m.starred).length})
          </button>
        </div>

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Contacts */}
        <div className="contacts">
          <h3>Contacts</h3>
          {uniqueSenders.map((sender, index) => (
            <div key={index} className="contact-item">
              <div className="avatar">
                {sender.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="contact-info">
                <div className="contact-name">{sender.name}</div>
                <div className="contact-email">{sender.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {!selectedMessage && !showCompose ? (
          <div className="message-list">
            <h3>
              {filter === 'all' ? 'All Messages' : 
               filter === 'unread' ? 'Unread Messages' : 'Starred Messages'}
              {searchTerm && ` - Search: "${searchTerm}"`}
            </h3>
            {filteredMessages.length === 0 ? (
              <div className="no-messages">No messages found</div>
            ) : (
              filteredMessages.map(message => (
                <div 
                  key={message.id}
                  className={`message-item ${!message.read ? 'unread' : ''}`}
                  onClick={() => handleMessageClick(message)}
                >
                  <div className="message-header">
                    <div className="sender-info">
                      <div className="avatar small">
                        {message.senderName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="sender-name">{message.senderName}</div>
                        <div className="sender-email">{message.sender}</div>
                      </div>
                    </div>
                    <div className="message-meta">
                      <button
                        className={`star-btn ${message.starred ? 'starred' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStarToggle(message.id);
                        }}
                      >
                        ★
                      </button>
                      <div className="timestamp">{formatTime(message.timestamp)}</div>
                    </div>
                  </div>
                  <div className="message-subject">{message.subject}</div>
                  <div className="message-preview">
                    {message.body.substring(0, 100)}...
                  </div>
                </div>
              ))
            )}
          </div>
        ) : showCompose ? (
          <div className="compose-message">
            <div className="compose-header">
              <h3>Compose Message</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCompose(false)}
              >
                ×
              </button>
            </div>
            <div className="compose-form">
              <input
                type="email"
                placeholder="To:"
                value={newMessage.to}
                onChange={(e) => setNewMessage(prev => ({ ...prev, to: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Subject:"
                value={newMessage.subject}
                onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
              />
              <textarea
                placeholder="Message body..."
                value={newMessage.body}
                onChange={(e) => setNewMessage(prev => ({ ...prev, body: e.target.value }))}
                rows={15}
              />
              <div className="compose-actions">
                <button className="send-btn" onClick={handleSendMessage}>
                  Send Message
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => setShowCompose(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="message-detail">
            <div className="message-detail-header">
              <button 
                className="back-btn"
                onClick={() => setSelectedMessage(null)}
              >
                ← Back to Messages
              </button>
              <button
                className={`star-btn ${selectedMessage.starred ? 'starred' : ''}`}
                onClick={() => handleStarToggle(selectedMessage.id)}
              >
                ★
              </button>
            </div>
            <div className="message-detail-content">
              <div className="message-sender">
                <div className="avatar large">
                  {selectedMessage.senderName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="sender-details">
                  <h3>{selectedMessage.senderName}</h3>
                  <p>{selectedMessage.sender}</p>
                  <p>{selectedMessage.timestamp.toLocaleString()}</p>
                </div>
              </div>
              <h2 className="message-subject">{selectedMessage.subject}</h2>
              <div className="message-body">
                {selectedMessage.body}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
