function StatCard({ icon, title, value }: { icon: string; title: string; value: string | number }) {
  return (
    <div className="bg-white p-4 rounded shadow flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-lg font-bold">{value}</div>
      </div>
    </div>
  );
}
export default StatCard;