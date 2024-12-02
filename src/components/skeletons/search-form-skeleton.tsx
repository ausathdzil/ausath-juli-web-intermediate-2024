import { Skeleton } from '@/components/ui/skeleton';

export default function SearchFormSkeleton() {
  return (
    <div className="w-3/5 mx-auto flex flex-col items-center gap-4">
      <Skeleton className="w-[300px] h-[25px]" />
      <Skeleton className="w-full h-[40px]" />
    </div>
  );
}
