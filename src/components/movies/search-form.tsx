'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function MovieSearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
      params.delete('page');
    }
    replace(`${pathname}?${params}`);
  }, 500);

  return (
    <div className="w-3/5 mx-auto text-center space-y-4">
      <Label className="text-xl font-semibold" htmlFor="query">
        Search{' '}
        {searchParams.get('query')
          ? `results for "${searchParams.get('query')}"`
          : 'for a movie'}
      </Label>
      <div className="relative">
        <Input
          id="query"
          name="query"
          className="peer pe-9 ps-9"
          placeholder="Search for a movie..."
          type="search"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
