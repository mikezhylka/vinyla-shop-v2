export function SessionExpiredModal() {
  return (
    <div className="bg-red-900/20 border border-red-500 p-4 mb-8 text-center">
      <p className="text-red-400 text-sm tracking-widest uppercase font-bold">
        Your session has expired. Please log in again.
      </p>
    </div>
  );
}
