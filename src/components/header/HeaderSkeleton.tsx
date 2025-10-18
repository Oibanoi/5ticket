"use client";

/**
 * Skeleton loader component for Header
 * Shows while session is loading to prevent flash of unauthenticated content
 */
export function HeaderAuthSkeleton() {
  return (
    <div className="flex items-center space-x-2 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-gray-700" />
      <div className="hidden md:block w-20 h-4 rounded bg-gray-700" />
    </div>
  );
}

export function HeaderAuthSkeletonMobile() {
  return (
    <div className="pt-2 border-t border-gray-700 animate-pulse">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-700" />
        <div className="w-24 h-4 rounded bg-gray-700" />
      </div>
    </div>
  );
}
