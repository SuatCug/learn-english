import BrandMark from '@/components/BrandMark';

export default function AuthBrand() {
  return (
    <div className="flex items-center justify-center gap-2.5 mb-6">
      <BrandMark size={36} />
      <span className="text-2xl font-bold text-gray-900">
        learnenglish
      </span>
    </div>
  );
}
