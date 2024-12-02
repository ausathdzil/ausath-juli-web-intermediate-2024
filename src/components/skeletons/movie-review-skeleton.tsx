import { Skeleton } from '@/components/ui/skeleton';

export default function MovieReviewSkeleton() {
  return (
    <section className="flex justify-between gap-8">
      <Skeleton className="rounded-lg w-1/2 h-[288px]" />
      <Skeleton className="rounded-lg w-1/2 h-[288px]" />
    </section>
  );
}
