import { Skeleton } from '@/components/ui/skeleton';

export default function UserReviewSkeleton() {
  return (
    <ul className="flex gap-4 flex-wrap justify-center">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i}>
          <Skeleton className="w-[400px] h-[138px]" />
        </li>
      ))}
    </ul>
  );
}
