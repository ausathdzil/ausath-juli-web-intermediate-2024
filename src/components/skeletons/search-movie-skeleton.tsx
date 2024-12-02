import { Skeleton } from '@/components/ui/skeleton';

export default function SearchMovieSkeleton() {
  return (
    <ul className="max-w-[80%] flex flex-wrap justify-center gap-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index}>
          <Skeleton className="w-[250px] h-[375px] rounded-lg" />
        </li>
      ))}
    </ul>
  );
}
