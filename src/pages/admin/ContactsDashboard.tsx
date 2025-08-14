// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Phone, Clock, User, MessageSquare, Calendar, Download, Search, X, Send, ArrowLeft, RefreshCw } from 'lucide-react';
import { db } from '@/lib/firebase';            // make sure this file exists!
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import emailjs from '@emailjs/browser';

// EmailJS configuration - Direct values (replace with your actual credentials)
const EMAILJS_CONFIG = {
  publicKey: '-O6hkDshkSmTs6Nfe',    // Replace with your EmailJS public key
  serviceId: 'service_5x9n0db',    // Replace with your EmailJS service ID  
  templateId: 'template_wp00sw8'   // Replace with your EmailJS template ID
};

// Initialize EmailJS
if (typeof window !== 'undefined') {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}
// Demo data – only used when USE_MOCK = true
const USE_MOCK = false;                        // flip to true for offline demo
const mockSubmissions = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 555 0123',
    message:
      'Hi! I am planning a 5-day trip to Sri Lanka with my family in March. We are interested in cultural sites, especially Anuradhapura and Sigiriya. Could you help us plan an itinerary?',
    timestamp: '2024-08-09T14:30:00Z',
    status: 'new'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    email: 'marcus.chen@gmail.com',
    phone: '+61 400 123 456',
    message: 'Looking for a 3-day photography tour focusing on ancient temples and wildlife. What packages do you offer?',
    timestamp: '2024-08-09T10:15:00Z',
    status: 'replied'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@outlook.com',
    phone: '',
    message:
      'Hello, I will be visiting Anuradhapura next month. Do you have availability for accommodation from March 15-20? Also interested in local cooking classes.',
    timestamp: '2024-08-08T16:45:00Z',
    status: 'archived'
  }
];

// Email templates
const EMAIL_TEMPLATES = {
  welcome: {
    subject: 'Thank you for your inquiry about Anuradhapura Homestay',
    body: `Hi {name},

Thank you for reaching out to us about your Anuradhapura Homestay! We're excited to help you create an unforgettable experience.

We've received your message and will get back to you within 24 hours with detailed information tailored to your specific interests and requirements.

In the meantime, feel free to browse our website for inspiration, and don't hesitate to reach out if you have any immediate questions.

Best regards,
[Your Name]
Anuradhapura Homestay Team`
  },
  custom: {
    subject: 'Re: Your inquiry about Anuradhapura Homestay',
    body: `Hi {name},

Thank you for your interest in our Anuradhapura Homestay.

[Your personalized response here]

Best regards,
[Your Name]
Anuradhapura Homestay Team`
  }
};

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('custom');
  const [sendingEmail, setSendingEmail] = useState(false);

  // IMPORTANT: change this or, better, use real authentication
  const ADMIN_PASSWORD = 'admin2024';

  // Check for saved authentication on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_authenticated');
    const authTimestamp = localStorage.getItem('admin_auth_timestamp');
    
    if (savedAuth === 'true' && authTimestamp) {
      // Check if authentication is still valid (24 hours)
      const now = new Date().getTime();
      const authTime = parseInt(authTimestamp);
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      if (now - authTime < twentyFourHours) {
        setIsAuthenticated(true);
      } else {
        // Clear expired authentication
        localStorage.removeItem('admin_authenticated');
        localStorage.removeItem('admin_auth_timestamp');
      }
    }
  }, []);

  /* ---------- LOGIN HANDLER ---------- */
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // Save authentication state with timestamp
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_auth_timestamp', new Date().getTime().toString());
    } else {
      alert('Incorrect password');
    }
  };

  /* ---------- LOGOUT HANDLER ---------- */
  const handleLogout = () => {
    setIsAuthenticated(false);
    // Clear authentication state
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_auth_timestamp');
    // Clear form data
    setPassword('');
    setSubmissions([]);
  };

  /* ---------- LOAD SUBMISSIONS ---------- */
  const loadSubmissions = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    
    try {
      if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 800)); // fake network delay
        setSubmissions(mockSubmissions);
        return;
      }

      const q = query(collection(db, 'contact_submissions'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      const rows = snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          timestamp: data.timestamp?.toDate?.()?.toISOString() || data.timestamp
        };
      });
      setSubmissions(rows);
      
      if (isRefresh) {
        // Show brief success message for refresh
        const originalTitle = document.title;
        document.title = '✓ Data refreshed';
        setTimeout(() => {
          document.title = originalTitle;
        }, 2000);
      }
    } catch (err) {
      console.error('Error loading submissions:', err);
      if (isRefresh) {
        alert('Failed to refresh data. Please try again.');
      }
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  /* ---------- REFRESH HANDLER ---------- */
  const handleRefresh = () => {
    loadSubmissions(true);
  };

  // fetch once after successful login
  useEffect(() => {
    if (isAuthenticated) loadSubmissions();
  }, [isAuthenticated]);

  /* ---------- EMAIL MODAL HANDLERS ---------- */
  const openEmailModal = (submission) => {
    setSelectedSubmission(submission);
    setEmailSubject(EMAIL_TEMPLATES.custom.subject);
    setEmailBody(EMAIL_TEMPLATES.custom.body.replace('{name}', submission.name));
    setEmailTemplate('custom');
    setShowEmailModal(true);
  };

  const applyTemplate = (templateKey) => {
    const template = EMAIL_TEMPLATES[templateKey];
    setEmailSubject(template.subject);
    setEmailBody(template.body.replace('{name}', selectedSubmission.name));
    setEmailTemplate(templateKey);
  };

  // Send email using EmailJS
  const sendEmailWithEmailJS = async (emailData) => {
    try {
      const templateParams = {
        to_email: emailData.to,
        subject: emailData.subject,
        message: emailData.body,
        from_name: 'Anuradhapura Homestay', // Your business name
        reply_to: 'admin@anuradhapurahomestay.com', // Your email address
        original_name: selectedSubmission.name,
        original_email: selectedSubmission.email,
        original_date: new Date(selectedSubmission.timestamp).toLocaleString(),
        original_message: selectedSubmission.message
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      console.log('Email sent successfully:', result);
      return result;
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw error;
    }
  };

  const sendEmail = async () => {
    if (!selectedSubmission || !emailSubject.trim() || !emailBody.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Validate EmailJS configuration
    if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId ||
        EMAILJS_CONFIG.publicKey === 'your_public_key_here') {
      alert('EmailJS is not configured. Please check your environment variables.');
      return;
    }

    setSendingEmail(true);
    
    try {
      // Send email using EmailJS
      await sendEmailWithEmailJS({
        to: selectedSubmission.email,
        subject: emailSubject,
        body: emailBody,
        submissionId: selectedSubmission.id
      });
      
      // Update submission status to 'replied'
      await updateStatus(selectedSubmission.id, 'replied');
      
      alert('Email sent successfully!');
      setShowEmailModal(false);
      
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Show specific error messages
      if (error.status === 422) {
        alert('Email sending failed: Invalid template parameters. Please check your EmailJS template configuration.');
      } else if (error.status === 400) {
        alert('Email sending failed: Invalid request. Please check your EmailJS service configuration.');
      } else if (error.text) {
        alert(`Email sending failed: ${error.text}`);
      } else {
        alert('Failed to send email. Please check your EmailJS configuration and try again.');
      }
    } finally {
      setSendingEmail(false);
    }
  };

  /* ---------- FILTERING ---------- */
  const filteredSubmissions = submissions.filter(sub => {
    const matchesFilter = filter === 'all' || sub.status === filter;
    const matchesSearch =
      searchTerm === '' ||
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  /* ---------- UPDATE STATUS ---------- */
  const updateStatus = async (id, newStatus) => {
    // optimistic UI
    setSubmissions(prev => prev.map(s => (s.id === id ? { ...s, status: newStatus } : s)));

    if (USE_MOCK) return;

    try {
      await updateDoc(doc(db, 'contact_submissions', id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error updating status:', err);
      // rollback on error
      setSubmissions(prev => prev.map(s => (s.id === id ? { ...s, status: s.status } : s)));
    }
  };

  /* ---------- CSV EXPORT ---------- */
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Message', 'Date', 'Status'];
    const csvData = filteredSubmissions.map(sub => [
      sub.name,
      sub.email,
      sub.phone || 'N/A',
      sub.message.replace(/"/g, '""'), // escape inner quotes
      new Date(sub.timestamp).toLocaleDateString(),
      sub.status
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---------- LOGIN SCREEN ---------- */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin Access</h1>
            <p className="text-gray-600">Enter password to view contact submissions</p>
          </div>

          <div className="space-y-4">
            <label htmlFor="adminPwd" className="sr-only">
              Admin password
            </label>
            <div className="relative">
              <input
                id="adminPwd"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Access Dashboard
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Demo Password:</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- MAIN DASHBOARD ---------- */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Contact Submissions</h1>
              <p className="text-gray-600">Manage inquiries from your website</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh data"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<MessageSquare />} label="Total Submissions" value={submissions.length} color="text-blue-600" />
          <StatCard
            icon={<Mail />}
            label="New Messages"
            value={submissions.filter(s => s.status === 'new').length}
            color="text-orange-600"
          />
          <StatCard
            icon={<MessageSquare />}
            label="Replied"
            value={submissions.filter(s => s.status === 'replied').length}
            color="text-green-600"
          />
          <StatCard
            icon={<Calendar />}
            label="Today"
            value={
              submissions.filter(
                s => new Date(s.timestamp).toDateString() === new Date().toDateString()
              ).length
            }
            color="text-purple-600"
          />
        </div>

        {/* Filters & Export */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <label htmlFor="statusFilter" className="sr-only">
                Filter by status
              </label>
              <select
                id="statusFilter"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
                title="Refresh submissions data"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </span>
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>
          
          {/* Last updated info */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleString()} 
              {refreshing && <span className="ml-2 text-blue-600">• Refreshing...</span>}
            </p>
          </div>
        </div>

        {/* Submissions */}
        <div className="space-y-4">
          {loading ? (
            <Loader />
          ) : filteredSubmissions.length === 0 ? (
            <EmptyState hasFilters={!!searchTerm || filter !== 'all'} />
          ) : (
            filteredSubmissions.map(sub => (
              <SubmissionCard 
                key={sub.id} 
                submission={sub} 
                onStatusChange={updateStatus}
                onReply={openEmailModal}
              />
            ))
          )}
        </div>

        {/* Info boxes */}
        <Instructions />
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <EmailModal
          submission={selectedSubmission}
          subject={emailSubject}
          body={emailBody}
          template={emailTemplate}
          sending={sendingEmail}
          onSubjectChange={setEmailSubject}
          onBodyChange={setEmailBody}
          onTemplateChange={applyTemplate}
          onSend={sendEmail}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
};

/* ---------- EMAIL MODAL COMPONENT ---------- */
const EmailModal = ({ 
  submission, 
  subject, 
  body, 
  template,
  sending,
  onSubjectChange, 
  onBodyChange, 
  onTemplateChange,
  onSend, 
  onClose 
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            disabled={sending}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Reply to {submission.name}</h2>
            <p className="text-sm text-gray-600">{submission.email}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded"
          disabled={sending}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row h-[calc(90vh-140px)]">
        {/* Original Message */}
        <div className="lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r bg-gray-50 overflow-y-auto">
          <h3 className="font-semibold text-gray-800 mb-3">Original Message</h3>
          <div className="text-sm text-gray-600 mb-2">
            {new Date(submission.timestamp).toLocaleString()}
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
              {submission.message}
            </p>
          </div>
        </div>

        {/* Reply Form */}
        <div className="lg:w-2/3 p-6 flex flex-col overflow-y-auto">
          {/* Template Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Template
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => onTemplateChange('welcome')}
                className={`px-3 py-2 text-sm rounded-lg border ${
                  template === 'welcome'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                disabled={sending}
              >
                Welcome Template
              </button>
              <button
                onClick={() => onTemplateChange('custom')}
                className={`px-3 py-2 text-sm rounded-lg border ${
                  template === 'custom'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                disabled={sending}
              >
                Custom Template
              </button>
            </div>
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              id="email-subject"
              type="text"
              value={subject}
              onChange={(e) => onSubjectChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={sending}
            />
          </div>

          {/* Body */}
          <div className="mb-6 flex-1">
            <label htmlFor="email-body" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="email-body"
              value={body}
              onChange={(e) => onBodyChange(e.target.value)}
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={sending}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={sending}
            >
              Cancel
            </button>
            <button
              onClick={onSend}
              disabled={sending || !subject.trim() || !body.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Email
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ---------- Reusable pieces ---------- */
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
      <div className={`w-8 h-8 ${color}`}>{icon}</div>
    </div>
  </div>
);

const Loader = () => (
  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
    <p className="text-gray-600">Loading submissions...</p>
  </div>
);

const EmptyState = ({ hasFilters }) => (
  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <p className="text-gray-600">
      {hasFilters ? 'No submissions match your filters' : 'No submissions yet'}
    </p>
  </div>
);

const SubmissionCard = ({ submission, onStatusChange, onReply }) => (
  <div className="bg-white rounded-lg shadow-sm border">
    <div className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-semibold text-lg text-gray-800">{submission.name}</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                submission.status
              )}`}
            >
              {submission.status.toUpperCase()}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${submission.email}`} className="hover:text-blue-600">
                {submission.email}
              </a>
            </div>
            {submission.phone && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <a href={`tel:${submission.phone}`} className="hover:text-blue-600">
                  {submission.phone}
                </a>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-gray-500 mb-4">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {new Date(submission.timestamp).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{submission.message}</p>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-col gap-2">
          <label htmlFor={`status-${submission.id}`} className="sr-only">
            Change status
          </label>
          <select
            id={`status-${submission.id}`}
            value={submission.status}
            onChange={e => onStatusChange(submission.id, e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="new">New</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>

          <button
            onClick={() => onReply(submission)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors text-center"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  </div>
);

const statusColor = status => {
  switch (status) {
    case 'new':
      return 'bg-orange-100 text-orange-800';
    case 'replied':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Instructions = () => (
  <>
    <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="font-semibold text-blue-800 mb-2">How to Use This Dashboard</h3>
      <ul className="text-sm text-blue-700 space-y-1">
        <li>• <strong>New submissions</strong> appear in orange and need your attention</li>
        <li>• Click <strong>"Reply"</strong> to compose responses directly in the dashboard</li>
        <li>• Choose from <strong>email templates</strong> or write custom responses</li>
        <li>• Status automatically updates to <strong>"Replied"</strong> after sending</li>
        <li>• Use <strong>search and filters</strong> to find specific submissions</li>
        <li>• Click <strong>"Refresh"</strong> to get the latest data from your database</li>
        <li>• <strong>Export CSV</strong> for backup or analysis</li>
        <li>• Your login session lasts 24 hours before requiring re-authentication</li>
      </ul>
    </div>

    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 className="font-semibold text-green-800 mb-2">EmailJS Integration Status</h3>
      <div className="text-sm text-green-700 space-y-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${
            EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.publicKey !== 'your_public_key_here' 
              ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          <span>Public Key: {
            EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.publicKey !== 'your_public_key_here' 
              ? 'Configured' : 'Not configured'
          }</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${
            EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.serviceId !== 'your_service_id_here' 
              ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          <span>Service ID: {
            EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.serviceId !== 'your_service_id_here' 
              ? 'Configured' : 'Not configured'
          }</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${
            EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.templateId !== 'your_template_id_here' 
              ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          <span>Template ID: {
            EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.templateId !== 'your_template_id_here' 
              ? 'Configured' : 'Not configured'
          }</span>
        </div>
        {(!EMAILJS_CONFIG.publicKey || EMAILJS_CONFIG.publicKey === 'your_public_key_here') && (
          <p className="text-red-700 mt-2">
            ⚠️ Please configure your EmailJS credentials in the .env.local file
          </p>
        )}
      </div>
    </div>

    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="font-semibold text-blue-800 mb-2">Features Added</h3>
      <ul className="text-sm text-blue-700 space-y-1">
        <li>• ✅ <strong>EmailJS Integration</strong> - Real email sending capability</li>
        <li>• ✅ <strong>Email templates</strong> for quick responses</li>
        <li>• ✅ <strong>Original message view</strong> while composing replies</li>
        <li>• ✅ <strong>Auto-status update</strong> to "replied" after sending</li>
        <li>• ✅ <strong>Professional email interface</strong> with subject/body fields</li>
        <li>• ✅ <strong>Error handling</strong> with specific error messages</li>
        <li>• ✅ <strong>Configuration validation</strong> to prevent send failures</li>
      </ul>
    </div>
  </>
);

export default AdminDashboard;