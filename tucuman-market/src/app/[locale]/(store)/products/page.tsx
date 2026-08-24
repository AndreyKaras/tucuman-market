import { CatalogView } from '@/components/store/catalog-view';
import type { RawSearchParams } from '@/features/catalog/model/catalog-query';

export default function ProductsPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  return <CatalogView searchParams={searchParams} />;
}
