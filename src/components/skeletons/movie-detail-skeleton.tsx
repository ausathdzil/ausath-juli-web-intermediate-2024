import { Skeleton } from '@/components/ui/skeleton';

export default function MovieDetailSkeleton() {
  return (
    <section className="flex gap-12 w-full">
      <div className="relative min-w-[400px] h-[600px] ">
        <Skeleton className="rounded-lg w-full h-full" />
      </div>
      <article className="flex flex-col gap-4 w-full">
        <Skeleton className="w-full h-[40px]" />
        <Skeleton className="w-1/2 h-[24px]" />
        <Skeleton className="w-1/2 h-[22px]" />
        <Skeleton className="w-[12px] h-[24px]" />
        <Skeleton className="w-full h-[144px]" />
        <Skeleton className="w-1/4 h-[24px]" />
        <Skeleton className="w-1/4 h-[24px]" />
        <Skeleton className="w-1/4 h-[24px]" />
      </article>
    </section>
  );
}
