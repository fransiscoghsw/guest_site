import { useState } from 'react';
import { createRegistrationAgenTray } from '../../../../services/agen.service'; // sesuaikan dengan path yang benar

const ConfirmationScreen = ({ ordererData, orderDetails, shippingData, paymentData, onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      // Menggabungkan semua data untuk dikirim
      const formData = {
        // Data Pemesan
        email: ordererData.email,
        fullname: ordererData.fullname,
        address: ordererData.address,
        noPhone: ordererData.noPhone,

        // Detail Pesanan
        qty: orderDetails.qty,
        orderFrequency: orderDetails.orderFrequency,
        unit: orderDetails.unit,

        // Data Pengiriman
        shippingAddress: shippingData.shippingAddress,
        shippingSchedule: shippingData.shippingSchedule,
        shippingCost: shippingData.shippingCost,

        // Data Pembayaran
        bankName: paymentData.bankName,
        noRekeningAndName: paymentData.noRekeningAndName,
      };

      await createRegistrationAgenTray(formData);
      setIsSuccess(true);
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Terjadi kesalahan saat mengirim data');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 animate-fadeIn">
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-8 text-center space-y-6">
          {!isSuccess ? (
            <>
              <h2 className="text-2xl font-bold text-[#8B4513] mb-6">Konfirmasi Pesanan</h2>
              
              <div className="bg-[#FDF5E6] p-6 rounded-lg space-y-4 text-left">
                <h3 className="font-semibold mb-4">Ringkasan Pesanan:</h3>
                <div className="space-y-2">
                  <p>Nama: {ordererData?.fullname}</p>
                  <p>Email: {ordererData?.email}</p>
                  <p>No. Telepon: {ordererData?.noPhone}</p>
                  <p>Jumlah: {orderDetails?.qty} {orderDetails?.unit}</p>
                  <p>Frekuensi: {orderDetails?.orderFrequency}</p>
                  <p>Alamat Pengiriman: {shippingData?.shippingAddress}</p>
                  <p>Jadwal Pengiriman: {
                    shippingData?.shippingSchedule === 'morning' ? 'Pagi (08.00-12.00)' :
                    shippingData?.shippingSchedule === 'afternoon' ? 'Siang (12.00-15.00)' :
                    'Sore (15.00-18.00)'
                  }</p>
                  <p>Biaya Pengiriman: {
                    shippingData?.shippingCost === 'customer' ? 'Ditanggung Pemesan' : 'Ditanggung Penyedia'
                  }</p>
                  <p>Bank: {paymentData?.bankName}</p>
                  <p>No. Rekening & Nama: {paymentData?.noRekeningAndName}</p>
                </div>
              </div>

              {submitError && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                  {submitError}
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={onBack}
                  className="px-8 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                  disabled={isSubmitting}
                >
                  KEMBALI
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-2 bg-[#8B4513] text-white rounded hover:bg-[#723A0F] transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting ? 'MENGIRIM...' : 'KIRIM PESANAN'}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#8B4513] mb-6">Pesanan Berhasil!</h2>
                <div className="space-y-4 text-left">
                  <p>Terima kasih telah mengisi formulir pemesanan ini. Kami akan segera memproses pesanan Anda dan menghubungi Anda untuk konfirmasi lebih lanjut. Jika ada pertanyaan atau kebutuhan tambahan, jangan ragu untuk menghubungi kami.</p>
                  <p>Kami berharap kerja sama ini dapat berjalan dengan baik dan saling menguntungkan. Semoga Anda puas dengan layanan kami! 😊</p>
                  <p className="mt-6">Hormat kami,</p>
                  <p className="font-bold">PT Sukaharja Quail Indonesia</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;