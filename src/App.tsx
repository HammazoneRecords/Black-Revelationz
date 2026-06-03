import { useState } from 'react';
import {
  Home, Search, PlusSquare, Video, User,
  Heart, MessageCircle, Send, Bookmark,
  Grid, Film, Music2, Play, X, ChevronLeft,
  MoreHorizontal, ExternalLink, Mail, ShoppingCart,
} from 'lucide-react';
import './index.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type PostType = 'image' | 'video' | 'music';
type Page = 'home' | 'reels' | { type: 'post'; id: string } | { type: 'artist'; name: string };

interface Post {
  id: string;
  type: PostType;
  thumb: string;
  caption: string;
  likes: number;
  artistName: string;
  youtubeId?: string;
  appleEmbed?: string;
  comments?: { user: string; text: string }[];
}

interface Artist {
  name: string;
  handle: string;
  genre: string;
  avatar: string;
  bio: string;
  spotifyUrl?: string;
}

// ─── Adinkra Symbols (3 selected) ────────────────────────────────────────────
// #4  Gye Nyame — "Except God" — supremacy, power, omnipotence
// #14 Sankofa — "Return and get it" — learning from the past, cultural heritage
// #67 Dwennimmen — "Ram's horns" — strength, humility

const ADINKRA = {
  gyeNyame: (cls = 'w-5 h-5') => (
    // Gye Nyame — stylised cross with flourishes
    <svg viewBox="0 0 100 100" className={cls} fill="currentColor" aria-label="Gye Nyame">
      <path d="M50 5 C38 5 30 15 30 25 C30 32 34 38 40 41 L40 59 C34 62 30 68 30 75 C30 85 38 95 50 95 C62 95 70 85 70 75 C70 68 66 62 60 59 L60 41 C66 38 70 32 70 25 C70 15 62 5 50 5Z M50 15 C57 15 62 20 62 25 C62 30 57 35 50 35 C43 35 38 30 38 25 C38 20 43 15 50 15Z M50 65 C57 65 62 70 62 75 C62 80 57 85 50 85 C43 85 38 80 38 75 C38 70 43 65 50 65Z"/>
      <rect x="46" y="35" width="8" height="30" rx="2"/>
      <ellipse cx="20" cy="50" rx="12" ry="6" transform="rotate(-30 20 50)"/>
      <ellipse cx="80" cy="50" rx="12" ry="6" transform="rotate(30 80 50)"/>
    </svg>
  ),
  sankofa: (cls = 'w-5 h-5') => (
    // Sankofa — bird looking backward
    <svg viewBox="0 0 100 100" className={cls} fill="currentColor" aria-label="Sankofa">
      <path d="M50 20 C35 20 22 30 20 45 C18 57 25 67 35 72 L30 85 L45 80 L50 90 L55 80 L70 85 L65 72 C75 67 82 57 80 45 C78 30 65 20 50 20Z"/>
      <circle cx="38" cy="38" r="5" fill="#000"/>
      <path d="M50 30 C50 30 60 20 70 25 C65 35 55 32 50 30Z" fill="#000" opacity="0.4"/>
      <path d="M30 55 Q20 45 25 35 Q35 45 30 55Z" fill="#000" opacity="0.3"/>
    </svg>
  ),
  dwennimmen: (cls = 'w-5 h-5') => (
    // Dwennimmen — ram's horns (strength + humility)
    <svg viewBox="0 0 100 100" className={cls} fill="currentColor" aria-label="Dwennimmen">
      <circle cx="50" cy="50" r="8"/>
      <path d="M50 42 C50 42 35 35 25 20 C15 5 20 0 28 8 C36 16 42 30 50 38Z"/>
      <path d="M50 42 C50 42 65 35 75 20 C85 5 80 0 72 8 C64 16 58 30 50 38Z"/>
      <path d="M50 58 C50 58 35 65 25 80 C15 95 20 100 28 92 C36 84 42 70 50 62Z"/>
      <path d="M50 58 C50 58 65 65 75 80 C85 95 80 100 72 92 C64 84 58 70 50 62Z"/>
    </svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const LABEL = {
  name: 'Black RevelationZ',
  handle: 'blackrevelationz',
  bio: 'Reggae · Dancehall · Culture 🇯🇲\nFounded by Romaine "Sabukie" Allen · Kingston, JM',
  link: 'open.spotify.com/artist/77bvWgoc1XRFU4P3UtP0uD',
  linkFull: 'https://open.spotify.com/artist/77bvWgoc1XRFU4P3UtP0uD',
  instagramUrl: 'https://instagram.com/blackrevelationz',
  followersCount: 1916,
  listenersCount: 129,
  postsCount: 12,
  artistsCount: 6,
  releasesCount: 18,
  avatar: 'https://picsum.photos/seed/brzlogo/200/200',
  founded: 'Kingston, JM',
};

const HIGHLIGHTS = [
  { label: 'Music', icon: 'music' },
  { label: 'Videos', icon: 'video' },
  { label: 'Artists', icon: 'user' },
  { label: 'Legacy', icon: 'sankofa' },
  { label: 'Merch', icon: 'merch' },
  { label: 'Contact', icon: 'mail' },
];

const ARTISTS: Artist[] = [
  { name: 'Chronik', handle: 'chronik_brz', genre: 'Dancehall', avatar: 'https://picsum.photos/seed/chronik/200/200', bio: 'Raw dancehall energy.' },
  { name: 'Empress Zara', handle: 'empresszara', genre: 'Reggae', avatar: 'https://picsum.photos/seed/zara/200/200', bio: 'Roots and culture. One love.' },
  { name: 'Kade Ryders', handle: 'kaderyders', genre: 'Reggae · Rap', avatar: 'https://picsum.photos/seed/kade/200/200', bio: 'Bridging reggae and rap.' },
  { name: 'D-Flame', handle: 'dflame_official', genre: 'Dancehall', avatar: 'https://picsum.photos/seed/dflame/200/200', bio: 'Setting the dance floor on fire.' },
];

const POSTS: Post[] = [
  { id: 'p1', type: 'music', thumb: 'https://picsum.photos/seed/brz1/600/600', caption: '🎵 New vibes out now. Stream the latest from Black RevelationZ on all platforms. Link in bio. #BlackRevelationZ #Reggae #Dancehall', likes: 1842, artistName: 'Black RevelationZ', appleEmbed: 'https://embed.music.apple.com/ca/artist/77bvWgoc1XRFU4P3UtP0uD', comments: [{ user: 'chronik_brz', text: 'Big tunes 🔥' }, { user: 'empresszara', text: 'We keep rising 🌿' }] },
  { id: 'p2', type: 'video', thumb: 'https://picsum.photos/seed/brz2/600/600', caption: '🎬 Visual out now. Real culture, real music. #BRZ', likes: 3210, artistName: 'Chronik', youtubeId: 'dQw4w9WgXcQ', comments: [{ user: 'dflame_official', text: 'Big tune Chronik! 🔥🔥' }] },
  { id: 'p3', type: 'image', thumb: 'https://picsum.photos/seed/brz3/600/600', caption: '🌿 Roots. Culture. Truth. Black RevelationZ — more than a label, a movement. #Reggae', likes: 987, artistName: 'Empress Zara', comments: [{ user: 'reggaevibes', text: 'Real culture 💚❤️💛' }] },
  { id: 'p4', type: 'image', thumb: 'https://picsum.photos/seed/brz4/600/600', caption: 'Studio session 🎙️ Coming soon. #NewMusic #BlackRevelationZ', likes: 2104, artistName: 'Kade Ryders', comments: [] },
  { id: 'p5', type: 'video', thumb: 'https://picsum.photos/seed/brz5/600/600', caption: '🎬 Behind the scenes. The process never stops. #BRZ #Dancehall', likes: 1567, artistName: 'D-Flame', youtubeId: 'dQw4w9WgXcQ', comments: [] },
  { id: 'p6', type: 'image', thumb: 'https://picsum.photos/seed/brz6/600/600', caption: '💛 The culture lives. Black RevelationZ. Always.', likes: 754, artistName: 'Black RevelationZ', comments: [] },
  { id: 'p7', type: 'music', thumb: 'https://picsum.photos/seed/brz7/600/600', caption: '🎵 New single dropping soon. Pre-save now. Link in bio.', likes: 2890, artistName: 'Empress Zara', comments: [{ user: 'rootslover', text: 'Empress always delivering 🌿' }] },
  { id: 'p8', type: 'image', thumb: 'https://picsum.photos/seed/brz8/600/600', caption: 'In the studio 🎙️ The dancehall king never rests. #Chronik #BRZ', likes: 1320, artistName: 'Chronik', comments: [] },
  { id: 'p9', type: 'video', thumb: 'https://picsum.photos/seed/brz9/600/600', caption: 'Live session footage 🔥 Feel the frequency. #BlackRevelationZ', likes: 4100, artistName: 'Black RevelationZ', youtubeId: 'dQw4w9WgXcQ', comments: [] },
  { id: 'p10', type: 'image', thumb: 'https://picsum.photos/seed/brz10/600/600', caption: '🇯🇲 From Jamaica to the world. Black RevelationZ. #Reggae', likes: 1890, artistName: 'Black RevelationZ', comments: [] },
  { id: 'p11', type: 'music', thumb: 'https://picsum.photos/seed/brz11/600/600', caption: '🎵 Kade Ryders — "Frequency" out now on all platforms.', likes: 2200, artistName: 'Kade Ryders', comments: [{ user: 'musichead', text: 'Pure fire 🔥' }] },
  { id: 'p12', type: 'image', thumb: 'https://picsum.photos/seed/brz12/600/600', caption: 'The crew. The movement. The sound. 🙏 #BRZ #Family', likes: 3450, artistName: 'Black RevelationZ', comments: [{ user: 'chronik_brz', text: '❤️' }, { user: 'empresszara', text: '🌿' }] },
];

const REELS = [
  { youtubeId: 'dQw4w9WgXcQ', title: 'Black RevelationZ — Latest Visual', artistName: 'Chronik', likes: 3210 },
  { youtubeId: 'dQw4w9WgXcQ', title: 'Empress Zara — Studio Session', artistName: 'Empress Zara', likes: 2100 },
  { youtubeId: 'dQw4w9WgXcQ', title: 'D-Flame — Behind The Scenes', artistName: 'D-Flame', likes: 1760 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

// ─── HighlightIcon ────────────────────────────────────────────────────────────

function HighlightIcon({ icon }: { icon: string }) {
  const cls = 'w-6 h-6 text-[#c9a84c]';
  switch (icon) {
    case 'music':   return <Music2 className={cls} />;
    case 'video':   return <Video className={cls} />;
    case 'user':    return <User className={cls} />;
    case 'mail':    return <Mail className={cls} />;
    case 'merch':   return <ShoppingCart className={cls} />;
    case 'sankofa': return ADINKRA.sankofa(cls);
    default:        return <Heart className={cls} />;
  }
}

// ─── TopBar ───────────────────────────────────────────────────────────────────

function TopBar({ onBack, title }: { onBack?: () => void; title: string }) {
  return (
    <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-md flex items-center justify-between px-4 py-3">
      {onBack ? (
        <button onClick={onBack} className="text-white p-1">
          <ChevronLeft className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-8" />
      )}
      <span className="font-black text-sm tracking-wide">{title}</span>
      <button className="text-white p-1">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
}

// ─── ProfileHeader ────────────────────────────────────────────────────────────

function ProfileHeader({ onMessageClick }: { onMessageClick: () => void }) {
  return (
    <div className="px-4 pt-4 pb-2 fade-up">
      {/* Avatar + stats */}
      <div className="flex items-center gap-6 mb-4">
        <div className="story-ring flex-shrink-0">
          <div className="story-ring-inner">
            <img src={LABEL.avatar} alt={LABEL.name} className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover" />
          </div>
        </div>
        <div className="flex gap-5 flex-1 justify-around">
          {[
            { label: 'Posts', value: LABEL.postsCount },
            { label: 'Artists', value: LABEL.artistsCount },
            { label: 'Releases', value: LABEL.releasesCount },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-black text-base text-white">{value}</p>
              <p className="text-xs text-[#a8a8a8]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Name + bio + adinkra accent */}
      <div className="mb-3 fade-up-1">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-black text-sm text-white">{LABEL.name}</p>
          {/* Gye Nyame — supremacy of the label's purpose */}
          <span className="text-[#c9a84c] opacity-70" title="Gye Nyame — Except God">
            {ADINKRA.gyeNyame('w-4 h-4')}
          </span>
        </div>
        <p className="text-xs text-[#c9a84c] font-semibold mb-1">{LABEL.founded}</p>
        {LABEL.bio.split('\n').map((line, i) => (
          <p key={i} className="text-sm text-[#a8a8a8]">{line}</p>
        ))}
        <p className="text-xs text-[#a8a8a8] mt-1">
          {formatCount(LABEL.followersCount)} followers · {LABEL.listenersCount} monthly listeners · 987 website visits
        </p>
        <a href={LABEL.linkFull} target="_blank" rel="noreferrer"
          className="text-[#c9a84c] text-sm font-semibold flex items-center gap-1 mt-1.5 hover:text-yellow-300 transition-colors w-fit">
          <ExternalLink className="w-3.5 h-3.5" />
          {LABEL.link}
        </a>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mb-4 fade-up-2">
        <a href={LABEL.instagramUrl} target="_blank" rel="noreferrer"
          className="flex-1 py-1.5 bg-[#1c1c1e] hover:bg-[#2c2c2e] text-white text-sm font-bold rounded-lg text-center transition-colors">
          Follow
        </a>
        <button onClick={onMessageClick}
          className="flex-1 py-1.5 bg-[#1c1c1e] hover:bg-[#2c2c2e] text-white text-sm font-bold rounded-lg transition-colors">
          Message
        </button>
        <a href={LABEL.instagramUrl} target="_blank" rel="noreferrer"
          className="px-3 py-1.5 bg-[#1c1c1e] hover:bg-[#2c2c2e] text-white rounded-lg transition-colors flex items-center">
          <Send className="w-4 h-4" />
        </a>
      </div>

      {/* About strip — Dwennimmen (strength + humility) */}
      <div className="bg-[#1c1c1e] rounded-xl px-4 py-3 mb-4 flex items-start gap-3 fade-up-3">
        <span className="text-[#c9a84c] mt-0.5 flex-shrink-0" title="Dwennimmen — Strength & Humility">
          {ADINKRA.dwennimmen('w-8 h-8')}
        </span>
        <p className="text-xs text-[#a8a8a8] leading-relaxed">
          Founded by Romaine "Sabukie" Allen, Shane "Eyeball" Morgan & Stephen Brown — transitioning from sound system into a modern production and artist development hub, built on years of Jamaican musical heritage and social consciousness.
        </p>
      </div>
    </div>
  );
}

// ─── StoriesRow ───────────────────────────────────────────────────────────────

function StoriesRow() {
  return (
    <div className="flex gap-4 px-4 pb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
      {HIGHLIGHTS.map((h) => (
        <div key={h.label} className="flex flex-col items-center gap-1.5 flex-shrink-0">
          <div className="story-ring">
            <div className="story-ring-inner">
              <div className="w-14 h-14 rounded-full bg-[#1c1c1e] flex items-center justify-center">
                <HighlightIcon icon={h.icon} />
              </div>
            </div>
          </div>
          <span className="text-[10px] text-[#a8a8a8] font-medium">{h.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── GridTabs ─────────────────────────────────────────────────────────────────

function GridTabs({ tab, onTab }: { tab: 'grid' | 'reels'; onTab: (t: 'grid' | 'reels') => void }) {
  return (
    <div className="flex border-t border-[#2c2c2e]">
      {[{ key: 'grid', icon: Grid }, { key: 'reels', icon: Film }].map(({ key, icon: Icon }) => (
        <button key={key} onClick={() => onTab(key as 'grid' | 'reels')}
          className={`flex-1 py-3 flex items-center justify-center transition-colors ${tab === key ? 'text-white border-t-2 border-white' : 'text-[#a8a8a8]'}`}>
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
}

// ─── PostGrid ─────────────────────────────────────────────────────────────────

function PostGrid({ posts, onPostClick }: { posts: Post[]; onPostClick: (id: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-px bg-[#2c2c2e]">
      {posts.map((p) => (
        <button key={p.id} onClick={() => onPostClick(p.id)}
          className="relative aspect-square overflow-hidden group bg-black">
          <img src={p.thumb} alt={p.caption.slice(0, 30)} className="w-full h-full object-cover" />
          {p.type === 'video' && <Play className="absolute top-2 right-2 w-4 h-4 text-white drop-shadow" />}
          {p.type === 'music' && <Music2 className="absolute top-2 right-2 w-4 h-4 text-white drop-shadow" />}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <span className="flex items-center gap-1 text-white font-bold text-xs">
              <Heart className="w-4 h-4 fill-white" /> {formatCount(p.likes)}
            </span>
            <span className="flex items-center gap-1 text-white font-bold text-xs">
              <MessageCircle className="w-4 h-4 fill-white" /> {p.comments?.length ?? 0}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── PostModal ────────────────────────────────────────────────────────────────

function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col md:flex-row md:items-stretch md:justify-center">
      <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white bg-black/40 rounded-full p-1.5">
        <X className="w-5 h-5" />
      </button>
      {/* Image / video */}
      <div className="w-full md:w-1/2 md:max-w-lg bg-black flex-shrink-0 flex items-center">
        {post.youtubeId ? (
          <div className="w-full aspect-square md:aspect-auto md:h-full">
            <iframe src={`https://www.youtube-nocookie.com/embed/${post.youtubeId}`}
              allow="autoplay; encrypted-media; fullscreen" allowFullScreen className="w-full h-full" />
          </div>
        ) : (
          <div className="w-full aspect-square">
            <img src={post.thumb} alt="" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
      {/* Detail */}
      <div className="flex-1 bg-[#1c1c1e] md:max-w-sm flex flex-col overflow-y-auto max-h-screen">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2c2c2e] flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 flex items-center justify-center">
            <Music2 className="w-4 h-4 text-[#c9a84c]" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">{post.artistName}</p>
            <p className="text-xs text-[#a8a8a8]">Black RevelationZ</p>
          </div>
          <button className="ml-auto text-[#a8a8a8]"><MoreHorizontal className="w-5 h-5" /></button>
        </div>
        <div className="px-4 py-3 flex-1">
          <p className="text-sm text-white leading-relaxed">{post.caption}</p>
          {post.appleEmbed && (
            <div className="mt-4">
              <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameBorder="0" height={175}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src={post.appleEmbed} className="w-full rounded-xl" />
            </div>
          )}
          {post.comments && post.comments.length > 0 && (
            <div className="mt-4 space-y-2 border-t border-[#2c2c2e] pt-3">
              {post.comments.map((c, i) => (
                <p key={i} className="text-sm text-[#a8a8a8]">
                  <span className="font-bold text-white">{c.user}</span> {c.text}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="px-4 py-3 border-t border-[#2c2c2e] flex-shrink-0">
          <div className="flex items-center gap-4 mb-2">
            <button onClick={() => setLiked(l => !l)}>
              <Heart className={`w-6 h-6 transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
            </button>
            <button><MessageCircle className="w-6 h-6 text-white" /></button>
            <button><Send className="w-6 h-6 text-white" /></button>
            <button onClick={() => setSaved(s => !s)} className="ml-auto">
              <Bookmark className={`w-6 h-6 transition-colors ${saved ? 'fill-white text-white' : 'text-white'}`} />
            </button>
          </div>
          <p className="text-sm font-bold text-white">{formatCount(post.likes + (liked ? 1 : 0))} likes</p>
          {post.comments && post.comments.length > 0 && (
            <p className="text-xs text-[#a8a8a8] mt-1">View all {post.comments.length} comments</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ReelsFeed ────────────────────────────────────────────────────────────────

function ReelsFeed({ onBack }: { onBack: () => void }) {
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  return (
    <div className="snap-feed pb-16 md:pb-0">
      <button onClick={onBack} className="fixed top-4 left-4 z-40 text-white bg-black/40 rounded-full p-2 backdrop-blur-sm">
        <ChevronLeft className="w-5 h-5" />
      </button>
      {REELS.map((r, i) => (
        <div key={i} className="snap-item relative h-screen bg-black flex items-center justify-center">
          <iframe src={`https://www.youtube-nocookie.com/embed/${r.youtubeId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen className="w-full h-full" />
          <div className="absolute right-4 bottom-28 flex flex-col gap-5 items-center">
            <button onClick={() => setLikes(l => ({ ...l, [i]: !l[i] }))}>
              <Heart className={`w-7 h-7 ${likes[i] ? 'text-red-500 fill-red-500' : 'text-white'}`} />
              <p className="text-white text-xs text-center mt-1">{formatCount(r.likes + (likes[i] ? 1 : 0))}</p>
            </button>
            <button><MessageCircle className="w-7 h-7 text-white" /></button>
            <button><Send className="w-7 h-7 text-white" /></button>
          </div>
          <div className="absolute bottom-24 left-4 right-20">
            <p className="text-white font-bold text-sm">{r.artistName}</p>
            <p className="text-white/70 text-xs mt-1">{r.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ArtistPage ───────────────────────────────────────────────────────────────

function ArtistPage({ artist, allPosts, onBack, onPostClick }: {
  artist: Artist; allPosts: Post[]; onBack: () => void; onPostClick: (id: string) => void;
}) {
  const artistPosts = allPosts.filter(p => p.artistName === artist.name);
  return (
    <div className="min-h-screen bg-black pb-20 md:pb-0">
      <TopBar onBack={onBack} title={artist.handle} />
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-6 mb-4">
          <div className="story-ring flex-shrink-0">
            <div className="story-ring-inner">
              <img src={artist.avatar} alt={artist.name} className="w-20 h-20 rounded-full object-cover" />
            </div>
          </div>
          <div className="flex gap-6 flex-1">
            {[{ label: 'Posts', value: artistPosts.length }, { label: 'Genre', value: artist.genre.split(' ')[0] }].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-black text-base text-white">{value}</p>
                <p className="text-xs text-[#a8a8a8]">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="font-black text-sm text-white">{artist.name}</p>
        <p className="text-xs text-[#c9a84c] font-medium mt-0.5">{artist.genre} · Black RevelationZ</p>
        <p className="text-sm text-[#a8a8a8] mt-1">{artist.bio}</p>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 py-1.5 bg-[#1c1c1e] text-white text-sm font-bold rounded-lg">Follow</button>
          {artist.spotifyUrl && (
            <a href={artist.spotifyUrl} target="_blank" rel="noreferrer"
              className="flex-1 py-1.5 bg-[#1c1c1e] text-white text-sm font-bold rounded-lg text-center">Spotify</a>
          )}
        </div>
      </div>
      <div className="border-t border-[#2c2c2e] mt-3">
        {artistPosts.length > 0
          ? <PostGrid posts={artistPosts} onPostClick={onPostClick} />
          : <p className="text-center text-[#a8a8a8] py-12 text-sm">No posts yet.</p>}
      </div>
    </div>
  );
}

// ─── BottomNav ────────────────────────────────────────────────────────────────

function BottomNav({ page, onNav }: { page: string; onNav: (p: string) => void }) {
  const items = [
    { key: 'home', icon: Home },
    { key: 'search', icon: Search },
    { key: 'new', icon: PlusSquare },
    { key: 'reels', icon: Video },
    { key: 'profile', icon: User },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black border-t border-[#2c2c2e] flex md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {items.map(({ key, icon: Icon }) => (
        <button key={key} onClick={() => (key === 'home' || key === 'reels') && onNav(key)}
          className="flex-1 py-3 flex items-center justify-center">
          <Icon className={`w-6 h-6 ${page === key ? 'text-white' : 'text-[#a8a8a8]'}`} />
        </button>
      ))}
    </nav>
  );
}

// ─── DemoMessageModal ─────────────────────────────────────────────────────────

function DemoMessageModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6">
      <div className="bg-[#1c1c1e] rounded-2xl p-6 max-w-sm w-full">
        <div className="flex items-center gap-2 mb-3">
          {/* Sankofa — return to your roots */}
          <span className="text-[#c9a84c]" title="Sankofa — Return to your roots">{ADINKRA.sankofa('w-6 h-6')}</span>
          <h3 className="font-black text-white text-lg">Contact</h3>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3 mb-4">
          <p className="text-amber-400 text-xs font-bold">
            Messaging activates after site purchase. For bookings and enquiries, reach the label directly via official channels.
          </p>
        </div>
        <a href={LABEL.instagramUrl} target="_blank" rel="noreferrer"
          className="block w-full py-2.5 bg-[#c9a84c] text-black font-black text-sm rounded-lg text-center mb-2">
          DM on Instagram
        </a>
        <button onClick={onClose}
          className="w-full py-2.5 border border-[#2c2c2e] text-[#a8a8a8] text-sm font-bold rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [gridTab, setGridTab] = useState<'grid' | 'reels'>('grid');
  const [showDemoMsg, setShowDemoMsg] = useState(false);

  const currentPageKey = typeof page === 'string' ? page : page.type;
  const openPost = (id: string) => setPage({ type: 'post', id });
  const goHome = () => setPage('home');

  if (typeof page === 'object' && page.type === 'post') {
    const post = POSTS.find(p => p.id === page.id);
    if (post) return (
      <>
        <PostModal post={post} onClose={goHome} />
      </>
    );
  }

  if (typeof page === 'object' && page.type === 'artist') {
    const artist = ARTISTS.find(a => a.name === page.name);
    if (artist) return (
      <div className="min-h-screen bg-black">
        <ArtistPage artist={artist} allPosts={POSTS} onBack={goHome} onPostClick={openPost} />
        <BottomNav page={currentPageKey} onNav={(k) => k === 'reels' ? setPage('reels') : goHome()} />
      </div>
    );
  }

  if (page === 'reels') return (
    <div className="bg-black">
      <ReelsFeed onBack={goHome} />
      <BottomNav page="reels" onNav={(k) => k === 'home' ? goHome() : setPage('reels')} />
    </div>
  );

  return (
    <div className="min-h-screen bg-black pb-20 md:pb-0">
      <TopBar title={LABEL.handle} />
      <ProfileHeader onMessageClick={() => setShowDemoMsg(true)} />
      <StoriesRow />
      <GridTabs tab={gridTab} onTab={(t) => { if (t === 'reels') setPage('reels'); else setGridTab(t); }} />
      <PostGrid posts={POSTS} onPostClick={openPost} />
      <BottomNav page={currentPageKey} onNav={(k) => k === 'reels' ? setPage('reels') : goHome()} />
      {showDemoMsg && <DemoMessageModal onClose={() => setShowDemoMsg(false)} />}
    </div>
  );
}
