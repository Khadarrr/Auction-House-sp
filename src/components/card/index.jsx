import someImage from "../../assets/icon-auction.png"

export default function Card() {
    return (
        <>
         <div className="card-container m-20 flex items-center justify-center">
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 m-5">
              <div className="card glass transform hover:scale-105 transition-transform duration-300">
                <figure>
                  <img
                    src={someImage}
                    alt="Car in a garage"
                    className="card-image"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life Hack</h2>
                  <p className="card-text">
                    Learn how to efficiently park your car in your garage.
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Bid</button>
                  </div>
                </div>
              </div>
            </div>     

            <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 m-5">
              <div className="card glass transform hover:scale-105 transition-transform duration-300">
                <figure>
                  <img
                    src={someImage}
                    alt="Car in a garage"
                    className="card-image"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life Hack</h2>
                  <p className="card-text">
                    Learn how to efficiently park your car in your garage.
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Bid</button>
                  </div>
                </div>
              </div>
            </div> 

            <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 m-5">
              <div className="card glass transform hover:scale-105 transition-transform duration-300">
                <figure>
                  <img
                    src={someImage}
                    alt="Car in a garage"
                    className="card-image"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life Hack</h2>
                  <p className="card-text">
                    Learn how to efficiently park your car in your garage.
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Bid</button>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
        </>
    )
}