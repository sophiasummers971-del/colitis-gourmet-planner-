import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Circle as HelpCircle, ChevronDown, Mail, MessageCircle, Send, Lightbulb, Bug, Sparkles, CircleCheck as CheckCircle, LifeBuoy, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const supportContacts = [
  {
    icon: LifeBuoy,
    title: 'Crohns & Colitis UK Helpline',
    description: 'Free, confidential support from trained IBD nurses.',
    contact: '0300 222 5700',
    url: 'https://www.crohnsandcolitis.org.uk/support/',
    color: 'linear-gradient(135deg, #2d5a3d 0%, #1a3d28 100%)',
  },
  {
    icon: Mail,
    title: 'NHS 111',
    description: 'Non-emergency medical advice, available 24/7.',
    contact: 'Call 111',
    url: 'https://111.nhs.uk/',
    color: 'linear-gradient(135deg, #0088b8 0%, #006699 100%)',
  },
  {
    icon: MessageCircle,
    title: 'IBD Relief Community',
    description: "Connect with others living with UC and Crohn's.",
    contact: 'Visit community',
    url: 'https://www.ibdrelief.com/',
    color: 'linear-gradient(135deg, #C41E3A 0%, #8B1A1A 100%)',
  },
];

const suggestionCategories = [
  { key: 'feature', label: 'Feature Idea', icon: Lightbulb, color: 'var(--ember)' },
  { key: 'improvement', label: 'Improvement', icon: Sparkles, color: 'var(--crimson)' },
  { key: 'bug', label: 'Bug Report', icon: Bug, color: 'var(--avoid)' },
  { key: 'other', label: 'Other', icon: MessageCircle, color: 'var(--smoke-green)' },
];

export default function HelpSupport() {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState<FaqEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Feedback form state
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackBody, setFeedbackBody] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState('feature');
  const [feedbackContact, setFeedbackContact] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('faq_entries').select('*').order('sort_order');
      if (data) {
        setFaqs(data.map((f: Record<string, unknown>) => ({
          id: f.id as string,
          question: f.question as string,
          answer: f.answer as string,
          category: f.category as string,
        })));
      }
      setLoading(false);
    }
    load();
  }, []);

  const faqCategories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];
  const filteredFaqs = selectedCategory === 'All' ? faqs : faqs.filter(f => f.category === selectedCategory);

  const handleSubmit = async () => {
    if (!feedbackTitle.trim()) return;
    setSubmitting(true);
    try {
      await supabase.from('suggestions').insert({
        title: feedbackTitle.trim(),
        body: feedbackBody.trim(),
        category: feedbackCategory,
        contact: feedbackContact.trim() || null,
        status: 'new',
      });
      setSubmitted(true);
      setFeedbackTitle('');
      setFeedbackBody('');
      setFeedbackContact('');
      setTimeout(() => {
        setSubmitted(false);
        setShowFeedback(false);
      }, 2500);
    } catch {
      // show error state
    }
    setSubmitting(false);
  };

  return (
    <div className="page-container animate-smoke-reveal">
      <div className="mb-6">
        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
          <HelpCircle size={14} className="inline mr-1" />
          We're Here for You
        </p>
        <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Help & Support</h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          FAQs, support contacts, and a place to share your ideas
        </p>
      </div>

      {/* FAQ Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Playfair Display', serif" }}>
          Frequently Asked Questions
        </h3>

        {/* Category pills */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {faqCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="menu-card text-center py-8 animate-drop-in">
            <p style={{ color: 'var(--text-muted)' }}>Loading FAQs...</p>
          </div>
        ) : (
          <div className="space-y-3 stagger-children">
            {filteredFaqs.map((faq, i) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="menu-card animate-drop-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="font-semibold pr-4" style={{ color: 'var(--text-primary)', fontFamily: "'Playfair Display', serif" }}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className="shrink-0 transition-transform duration-300"
                      style={{
                        color: 'var(--text-muted)',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  {isExpanded && (
                    <div className="mt-3 pt-3 animate-fade-in" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Support Contacts */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Playfair Display', serif" }}>
          Support Contacts
        </h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
          If you're experiencing a flare or need medical advice, reach out to these trusted organisations.
        </p>
        <div className="space-y-3 stagger-children">
          {supportContacts.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <a
                key={i}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="menu-card flex items-center gap-3 animate-drop-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: contact.color, boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                  <Icon size={22} style={{ color: '#fff' }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{contact.title}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{contact.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold" style={{ color: 'var(--crimson)' }}>{contact.contact}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Feedback / Suggestions */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Playfair Display', serif" }}>
          Share Your Ideas
        </h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
          Got an idea to make Colitis Gourmet better? We'd love to hear it. Every suggestion is reviewed and helps shape future updates.
        </p>

        {!showFeedback ? (
          <button
            onClick={() => setShowFeedback(true)}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Lightbulb size={18} />
            Share an Idea
          </button>
        ) : (
          <div className="menu-card animate-drop-in">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="mx-auto mb-3 animate-glow-pulse" style={{ color: 'var(--safe)' }} />
                <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Thank you!</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Your idea has been received. We appreciate you helping us improve.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Category selector */}
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: 'var(--text-muted)' }}>Type</label>
                  <div className="flex flex-wrap gap-2">
                    {suggestionCategories.map(cat => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.key}
                          onClick={() => setFeedbackCategory(cat.key)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                          style={{
                            background: feedbackCategory === cat.key ? `rgba(${cat.color === 'var(--crimson)' ? '196,30,58' : cat.color === 'var(--ember)' ? '212,160,23' : cat.color === 'var(--avoid)' ? '168,50,50' : '45,90,61'},0.15)` : 'var(--surface-hover)',
                            color: feedbackCategory === cat.key ? cat.color : 'var(--text-secondary)',
                            border: `1px solid ${feedbackCategory === cat.key ? cat.color : 'var(--border-subtle)'}`,
                          }}
                        >
                          <Icon size={14} />
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>Title</label>
                  <input
                    type="text"
                    placeholder="Brief summary of your idea..."
                    value={feedbackTitle}
                    onChange={e => setFeedbackTitle(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>Details</label>
                  <textarea
                    placeholder="Tell us more about your idea, what you'd like to see, or what could be improved..."
                    value={feedbackBody}
                    onChange={e => setFeedbackBody(e.target.value)}
                    className="input-field min-h-[100px] resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-muted)' }}>
                    Email (optional — only if you want a reply)
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={feedbackContact}
                    onChange={e => setFeedbackContact(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleSubmit}
                    disabled={!feedbackTitle.trim() || submitting}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                    {submitting ? 'Sending...' : 'Submit'}
                  </button>
                  <button
                    onClick={() => setShowFeedback(false)}
                    className="px-4 py-3 rounded-lg text-sm font-semibold transition-all"
                    style={{ background: 'var(--surface-hover)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => navigate('/resources')}
          className="menu-card flex items-center gap-2 text-left"
        >
          <BookOpen size={18} style={{ color: 'var(--crimson)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Resources</span>
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="menu-card flex items-center gap-2 text-left"
        >
          <HelpCircle size={18} style={{ color: 'var(--ember)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Settings</span>
        </button>
      </div>
    </div>
  );
}
