import React from 'react';
import bookingHistory from '../data/bookingHistory';
import Navigation1 from '../navigation/navigation1';
import Footer from '../footer/footer';

const HistoriqueDesServices = () => {
  // Assume this variable determines if the user is signed up or not
  const isUserSignedUp = true; // Replace with actual user authentication logic

  return (
    <div>
      <Navigation1></Navigation1>

    <div className="max-w-6xl mx-auto mt-16 p-8 bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-xl">
      <h1 className="text-4xl text-start font-bold text-black mb-10">
        Historique des Services
      </h1>

      {!isUserSignedUp ? (
        <div className="text-center py-10">
          <p className="text-lg text-start text-gray-600">
            Vous devez vous inscrire pour accéder à votre historique des services.
          </p>
          <button className="mt-4 px-5 py-3 bg-new hover:bg-hover text-white rounded-full font-bold text-lg shadow-lg transition-all">
            S'inscrire
          </button>
        </div>
      ) : bookingHistory.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">
            Vous n'avez encore aucun service réservé.
          </p>
          <button className="mt-4 px-5 py-3 bg-new hover:bg-hover text-white rounded-full font-bold text-lg shadow-lg transition-all">
            Réserver un nouveau service
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="w-full text-left bg-white border-collapse border border-gray-200">
            <thead className="bg-new hover:bg-hover text-white">
              <tr>
                <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                  Stylist
                </th>
                <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider text-right">
                  Prix
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking, index) => (
                <tr
                  key={booking.id}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-6 py-4 text-gray-800 font-caladea text-base">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-caladea text-base">
                    {booking.stylist}
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-caladea text-base">
                    {new Date(booking.date).toLocaleDateString('fr-FR', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-gray-800 text-sm text-right">
                    {booking.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <div className='mt-24'>
    <Footer></Footer>
    </div>
    </div>
  );
};

export default HistoriqueDesServices;
