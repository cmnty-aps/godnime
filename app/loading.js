import Card from "@/components/Cards/Card/Card";

export default function Loading() {
  return (
    <div className="w-full max-w-[96rem] mx-auto px-5 py-28 min-h-screen">
      <div className="grid grid-auto-fit gap-3 mt-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card key={index} index={index} loading />
        ))}
      </div>
    </div>
  );
}