import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BookOpen, ExternalLink, Search, Heart, Stethoscope, Globe, FlaskConical } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  source: string;
  body: string;
  tags: string[];
}

const categoryConfig: Record<string, { icon: typeof BookOpen; color: string; label: string }> = {
  NHS: { icon: Heart, color: 'linear-gradient(135deg, #0088b8 0%, #006699 100%)', label: 'NHS Official' },
  Charity: { icon: Heart, color: 'linear-gradient(135deg, #2d5a3d 0%, #1a3d28 100%)', label: 'Charity' },
  Wikipedia: { icon: Globe, color: 'linear-gradient(135deg, #4a6fa5 0%, #2d4a6f 100%)', label: 'Encyclopedia' },
  Specialist: { icon: Stethoscope, color: 'linear-gradient(135deg, #C41E3A 0%, #8B1A1A 100%)', label: 'Specialist' },
};

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('resources').select('*').order('sort_order');
      if (data) {
        setResources(data.map((r: Record<string, unknown>) => ({
          id: r.id as string,
          title: r.title as string,
          category: r.category as string,
          description: r.description as string,
          url: r.url as string,
          source: r.source as string,
          body: r.body as string,
          tags: r.tags as string[],
        })));
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = resources.filter(r => {
    const matchesSearch = !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];

  return (
    <div className="page-container animate-smoke-reveal">
      <div className="mb-6">
        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
          <BookOpen size={14} className="inline mr-1" />
          Knowledge Base
        </p>
        <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Resources & Research</h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          NHS, charities, encyclopedias, and specialist guidance on ulcerative colitis
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
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
        <div className="menu-card text-center py-12 animate-drop-in">
          <FlaskConical size={32} className="mx-auto mb-3 animate-pulse" style={{ color: 'var(--text-muted)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Loading resources...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="menu-card text-center py-12 animate-drop-in">
          <Search size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>No resources found</p>
        </div>
      ) : (
        <div className="space-y-4 stagger-children">
          {filtered.map((resource, i) => {
            const config = categoryConfig[resource.category] || categoryConfig.Specialist;
            const Icon = config.icon;
            const isExpanded = expandedId === resource.id;

            return (
              <div
                key={resource.id}
                className="menu-card animate-drop-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: config.color, boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                    <Icon size={22} style={{ color: '#fff' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Playfair Display', serif" }}>
                        {resource.title}
                      </h3>
                      <span className="badge-amber">{config.label}</span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {resource.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium"
                          style={{ background: 'var(--surface-hover)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {isExpanded && resource.body && (
                  <div className="mt-4 pt-4 animate-fade-in" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {resource.body}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : resource.id)}
                    className="text-xs transition-colors hover:opacity-100"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold ml-auto transition-all hover:opacity-80"
                      style={{ color: 'var(--crimson)' }}
                    >
                      Visit Source
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
