import Link from 'next/link';
import { WifiOff, ArrowRight } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff size={36} className="text-henna-400" />
        </div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-henna-700 mb-3">You&apos;re Offline</h1>
        <p className="text-henna-400 mb-6">It looks like you&apos;re not connected to the internet. Please check your connection and try again.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-henna-700 text-cream-100 rounded-full font-semibold hover:bg-henna-600">
          Try Again <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
