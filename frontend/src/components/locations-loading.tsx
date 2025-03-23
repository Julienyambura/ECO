import { Skeleton } from "@/components/skeleton";

export function LocationsLoading() {
  return (
    <div className="w-full h-full bg-muted/20 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Skeleton className="h-12 w-12 rounded-full mx-auto" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px] mx-auto" />
          <Skeleton className="h-4 w-[160px] mx-auto" />
        </div>
      </div>
    </div>
  );
}
