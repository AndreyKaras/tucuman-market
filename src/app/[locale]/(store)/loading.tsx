import { getTranslations } from 'next-intl/server';
import { cn, containerClass } from '@/components/ui/styles';

const skeletonClass =
  'rounded-md bg-surface-strong motion-safe:animate-[pulse_1.8s_ease-in-out_infinite]';

export default async function StoreLoading() {
  const t = await getTranslations('Common');

  return (
    <main className={cn(containerClass, 'min-h-[64vh] pt-16 pb-[72px]')} id="main-content">
      <p className="sr-only" role="status">
        {t('loading')}
      </p>
      <div className={cn(skeletonClass, 'mb-8 h-12 w-[min(320px,75%)]')} />
      <div
        className="grid grid-cols-4 gap-4 max-[1279px]:grid-cols-3 max-[639px]:grid-cols-2 max-[639px]:gap-2"
        aria-hidden="true"
      >
        {Array.from({ length: 8 }, (_, index) => (
          <div className="rounded-xl border border-line p-3" key={index}>
            <div className={cn(skeletonClass, 'aspect-[4/3]')} />
            <div className={cn(skeletonClass, 'mt-4 h-[18px]')} />
            <div className={cn(skeletonClass, 'mt-2 h-[18px] w-[62%]')} />
            <div className={cn(skeletonClass, 'mt-6 h-12')} />
          </div>
        ))}
      </div>
    </main>
  );
}
