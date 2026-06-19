import React from "react";

export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-muted h-64 w-full rounded-sm" />
      <div className="mt-3 space-y-2">
        <div className="bg-muted h-3 w-3/4 rounded" />
        <div className="bg-muted h-3 w-1/4 rounded" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="animate-pulse flex items-center gap-4 py-3 px-4 border border-border">
      <div className="bg-muted w-16 h-16 shrink-0 rounded" />
      <div className="flex-1 space-y-2">
        <div className="bg-muted h-3 w-1/2 rounded" />
        <div className="bg-muted h-3 w-1/4 rounded" />
      </div>
    </div>
  );
}

export function SkeletonText({ width = "w-full", height = "h-3" }) {
  return (
    <div className={`animate-pulse bg-muted rounded ${width} ${height}`} />
  );
}

export function SkeletonOrderRow() {
  return (
    <div className="animate-pulse flex flex-col gap-3 border border-border p-4">
      <div className="flex gap-3">
        <div className="bg-muted w-8 h-8 rounded shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="bg-muted h-3 w-1/2 rounded" />
          <div className="bg-muted h-3 w-1/3 rounded" />
          <div className="bg-muted h-3 w-2/3 rounded" />
        </div>
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-border">
        <div className="bg-muted h-4 w-16 rounded" />
        <div className="bg-muted h-8 w-32 rounded" />
      </div>
    </div>
  );
}
