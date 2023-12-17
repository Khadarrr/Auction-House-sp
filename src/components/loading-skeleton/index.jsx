export default function Skeleton() {
  return (
    <div className="card-container mx-3 md:mx-10 my-3 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="card glass animate-pulse p-4">
          <div className="skeleton h-48 md:h-56 lg:h-64 xl:h-72 w-full mb-4"></div>
          <h2 className="card-title text-xl font-semibold mb-2">
            <div className="skeleton h-4 w-3/4"></div>
          </h2>
          <p className="card-text text-gray-700 mb-4">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-5/6"></div>
            <div className="skeleton h-4 w-4/6"></div>
          </p>
          <div className="indicator">
            <span className="indicator-item badge badge-secondary bg-green-500">
              <div className="skeleton h-4 w-8"></div>
            </span>
            <div className="skeleton h-8 w-16 sm:w-20"></div>
          </div>
          <div className="card-actions flex justify-between mt-4">
            <div className="skeleton h-8 w-24 sm:w-32"></div>
            <div className="skeleton h-8 w-24 sm:w-32"></div>
          </div>
          <div className="bid-input-container mb-4">
            <div className="skeleton h-8 w-full max-w-xs"></div>
            <div className="skeleton h-8 w-24 sm:w-32 mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
