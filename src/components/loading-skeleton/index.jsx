export default function skeleton() {
  return (
    <div className="card-container mx-10 my-5 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="card glass animate-pulse">
        <figure className="relative overflow-hidden">
          <div className="skeleton h-48 w-full"></div>
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-lg font-semibold mb-2">
            <div className="skeleton h-4 w-3/4"></div>
          </h2>
          <p className="card-text text-gray-700 mb-4">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-4/5"></div>
            <div className="skeleton h-4 w-3/4"></div>
          </p>
          <div className="card-actions flex justify-end">
            <div className="skeleton h-8 w-20"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
}
