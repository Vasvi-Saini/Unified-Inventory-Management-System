import { ProductCardSkeleton, UserSkeleton } from "@/Components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="w-full px-4 sm:px-6 md:px-12 pb-12">
      <div className="flex flex-col lg:flex-row gap-6 justify-between w-full">
        <div className="flex w-full lg:w-[70%] xl:w-[72%] flex-col gap-4 py-6">
          <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md mb-2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[28%] xl:w-[25%] p-6 dark:bg-gray-950 rounded-2xl mt-4 shadow-md space-y-6">
          <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <UserSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
