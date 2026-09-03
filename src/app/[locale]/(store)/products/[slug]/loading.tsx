import { cn, containerClass } from '@/components/ui/styles';

const skeletonClass =
  'rounded-md bg-surface-strong motion-safe:animate-[pulse_1.8s_ease-in-out_infinite]';

export default function ProductLoading() {
  return (
    <main
      className={cn(containerClass, 'pt-7 pb-20 max-[639px]:pt-5 max-[639px]:pb-14')}
      id="main-content"
      aria-busy="true"
    >
      <div className="mt-[26px] grid min-h-[520px] grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] gap-[clamp(32px,5vw,72px)] max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <div className={cn(skeletonClass, 'aspect-[4/3]')} />
        <div>
          <div className={cn(skeletonClass, 'mt-4 h-[18px]')} />
          <div className={cn(skeletonClass, 'mt-2 h-[18px] w-[62%]')} />
          <div className={cn(skeletonClass, 'mt-6 h-12')} />
        </div>
      </div>
    </main>
  );
}
