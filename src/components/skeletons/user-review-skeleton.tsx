import { Skeleton } from '@/components/ui/skeleton';

export default function UserReviewSkeleton() {
  return (
    <ul className="flex gap-4 flex-wrap">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i}>
          <Skeleton className="w-[800px] h-[114px]" />
        </li>
      ))}
    </ul>
  );
}
