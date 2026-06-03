import { Info } from 'lucide-react';

export default function WorkingDraftBanner({ artist }: { artist: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-500/10 border-t border-amber-500/20 px-4 py-2 flex items-center justify-center gap-2 text-amber-400 text-xs backdrop-blur-sm">
      <Info className="w-3.5 h-3.5 flex-shrink-0" />
      <span>
        <strong>{artist}</strong> — Working Draft.{' '}
        <a href="https://mindwaveja.com" target="_blank" rel="noreferrer" className="underline hover:text-amber-300 transition-colors">
          mindwaveja.com
        </a>
      </span>
    </div>
  );
}
