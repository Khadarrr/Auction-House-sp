import React, { useState } from 'react';

const CreateAuction = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    startingBid: '',
    reservePrice: '',
    auctionEnds: '',
  });
  const [createdListing, setCreatedListing] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // New state for success message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const accessKey = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    };

    const newAuction = {
      title: formData.title,
      description: formData.description,
      media: [formData.imageUrl],
      startingBid: parseFloat(formData.startingBid),
      reservePrice: parseFloat(formData.reservePrice),
      endsAt: formData.auctionEnds,
    };

    try {
      const response = await fetch('https://api.noroff.dev/api/v1/auction/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...accessKey.headers,
        },
        body: JSON.stringify(newAuction),
      });

      if (response.ok) {
        const createdListingData = await response.json();
        setCreatedListing(createdListingData);
        setIsSuccess(true); // Set success status to true
        console.log('Auction listing created successfully!');
      } else {
        setIsSuccess(false); // Set success status to false in case of failure
        throw new Error('Failed to create auction listing');
      }
    } catch (error) {
      console.error('Error creating auction listing:', error);
      setIsSuccess(false); // Set success status to false in case of error
      if (error.response) {
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    }
  };

  const handleUpdate = async () => {
    // Assuming createdListing has the data of the created listing
    if (createdListing) {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${createdListing.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            media: [formData.imageUrl],
          }),
        });

        if (response.ok) {
          console.log('Auction listing updated successfully!');
          // You might want to update the state or perform other actions after a successful update
        } else {
          throw new Error('Failed to update auction listing');
        }
      } catch (error) {
        console.error('Error updating auction listing:', error);
      }
    }
  };

  const handleDelete = async () => {
    // Assuming createdListing has the data of the created listing
    if (createdListing) {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${createdListing.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          console.log('Auction listing deleted successfully!');
          // You might want to update the state or perform other actions after a successful delete
        } else {
          throw new Error('Failed to delete auction listing');
        }
      } catch (error) {
        console.error('Error deleting auction listing:', error);
      }
    }
  };

  return (
    <div>
      <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>
        Create Auction
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-3xl font-semibold mb-6">Create Auction</h2>
          {isSuccess && (
            <div className="text-green-500 font-semibold mb-4">
              Auction listing created successfully!
            </div>
          )}
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 mb-4"
              placeholder="Title"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 mb-4"
              rows="4"
              placeholder="Description"
              required
            />
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 mb-4"
              placeholder="Image URL"
            />
            <input
              type="number"
              name="startingBid"
              value={formData.startingBid}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 mb-4"
              placeholder="Starting Bid"
            />
            <input
              type="number"
              name="reservePrice"
              value={formData.reservePrice}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 mb-4"
              placeholder="Reserve Price"
            />
            <input
              type="datetime-local"
              name="auctionEnds"
              value={formData.auctionEnds}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 mb-4"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Create Auction
            </button>
          </form>
          {createdListing && (
            <div>
              <button
                onClick={handleUpdate}
                className="btn bg-green-500 text-white mx-2"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="btn bg-red-500 text-white mx-2"
              >
                Delete
              </button>
            </div>
          )}
          <button className="btn" onClick={() => document.getElementById('my_modal_5').close()}>
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default CreateAuction;
