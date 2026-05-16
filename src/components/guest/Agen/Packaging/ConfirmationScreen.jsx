import { useState } from "react";
import ApprovalScreen from "./ApprovalScreen";
import { createRegistrationAgen } from "../../../../services/agen.service";

const ConfirmationScreen = ({ personalData, businessData, approvalData }) => {
  const [showApprovalScreen, setShowApprovalScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleButtonBackClick = () => {
    setShowApprovalScreen(true);
  };

  if (showApprovalScreen) {
    return (
      <ApprovalScreen
        personalData={personalData}
        businessData={businessData}
        approvalData={approvalData}
      />
    );
  }

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();

    // Data Personal
    formData.append("fullname", personalData.fullname);
    formData.append("address", personalData.address);
    formData.append("province", personalData.province);
    formData.append("city", personalData.city);
    formData.append("kecamatan", personalData.kecamatan);
    formData.append("kelurahan", personalData.kelurahan);
    formData.append("postalCode", personalData.postalCode);
    formData.append("placeAndDateOfBirth", JSON.stringify(personalData.placeAndDateOfBirth));
    formData.append("gender", personalData.gender);
    formData.append("noPhone", personalData.noPhone);
    formData.append("noKtp", personalData.noKtp);
    formData.append("email", personalData.email);

    // Data Bisnis
    formData.append("typeOfBusiness", businessData.typeOfBusiness);
    formData.append("salesMedia", businessData.salesMedia);
    formData.append("addressBusiness", businessData.addressBusiness);
    formData.append("provinceBusiness", businessData.provinceBusiness);
    formData.append("cityBusiness", businessData.cityBusiness);
    formData.append("kecamatanBusiness", businessData.kecamatanBusiness);
    formData.append("kelurahanBusiness", businessData.kelurahanBusiness);
    formData.append("postalCodeBusiness", businessData.postalCodeBusiness);
    formData.append("businessPackage", businessData.businessPackage);
    formData.append("noNpwp", businessData.noNpwp);
    formData.append("brandUsage", businessData.brandUsage);

    // Data Approval
    if (approvalData.photoKtp)
      formData.append("photoKtp", approvalData.photoKtp);
    if (approvalData.photoNpwp)
      formData.append("photoNpwp", approvalData.photoNpwp);

    try {
      await createRegistrationAgen(formData);
      setSuccess(true);
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message ||
          "Terjadi kesalahan saat mendaftar. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 animate-fadeIn">
      {!success ? (
        <>
          <div className="flex mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center text-white">
                1
              </div>
              <span className="font-semibold">INFORMASI PRIBADI</span>
            </div>
            <div className="flex-1 border-t-2 mx-4 my-4"></div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center text-white">
                2
              </div>
              <span className="font-semibold">INFORMASI USAHA</span>
            </div>
            <div className="flex-1 border-t-2 mx-4 my-4"></div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center text-white">
                3
              </div>
              <span className="font-semibold">PERSETUJUAN</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Konfirmasi Pendaftaran</h2>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Data Pribadi</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Nama:</span> {personalData.fullname}</p>
                  <p><span className="font-medium">Alamat:</span> {personalData.address}</p>
                  <p><span className="font-medium">Provinsi:</span> {personalData.province}</p>
                  <p><span className="font-medium">Kota:</span> {personalData.city}</p>
                  <p><span className="font-medium">Tempat & Tanggal Lahir:</span> {personalData.placeAndDateOfBirth.place}, {new Date(personalData.placeAndDateOfBirth.date).toLocaleDateString('id-ID')}</p>
                  <p><span className="font-medium">Jenis Kelamin:</span> {personalData.gender === 'Male' ? 'Pria' : 'Wanita'}</p>
                  <p><span className="font-medium">No. Telepon:</span> {personalData.noPhone}</p>
                  <p><span className="font-medium">Email:</span> {personalData.email}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Data Usaha</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Jenis Usaha:</span> {businessData.typeOfBusiness}</p>
                  <p><span className="font-medium">Media Penjualan:</span> {businessData.salesMedia}</p>
                  <p><span className="font-medium">Alamat Usaha:</span> {businessData.addressBusiness}</p>
                  <p><span className="font-medium">Provinsi:</span> {businessData.provinceBusiness}</p>
                  <p><span className="font-medium">Kota:</span> {businessData.cityBusiness}</p>
                  <p><span className="font-medium">Paket Bisnis:</span> {businessData.businessPackage}</p>
                  <p><span className="font-medium">No. NPWP:</span> {businessData.noNpwp}</p>
                  <p><span className="font-medium">Penggunaan Merek:</span> {businessData.brandUsage}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold mb-4">Informasi Penting</h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Kami sangat menghargai waktu dan minat Anda untuk bergabung bersama
                  kami. Dengan menjadi bagian dari jaringan agen kami, Anda tidak hanya
                  berpeluang mengembangkan bisnis, tetapi juga turut mendukung
                  distribusi produk berkualitas kepada masyarakat.
                </p>
                <p className="text-gray-700 font-medium">
                  Langkah selanjutnya:
                </p>
                <p className="text-gray-700">
                  Setelah mengisi formulir, harap konfirmasi ke nomor berikut:
                  <a href="https://wa.me/6285814688322" className="text-[#8B4513] hover:underline ml-2">
                    wa.me/6285814688322
                  </a>
                  (Marketing PT SQI)
                </p>
                <p className="text-gray-700">
                  PT SQI akan memberikan formulir perjanjian kerjasama yang harus
                  ditandatangani untuk kelanjutan kerja sama agen telur puyuh.
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="flex justify-center gap-4">
              <button
                onClick={handleButtonBackClick}
                className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                disabled={loading}
              >
                KEMBALI
              </button>
              <button
                onClick={handleRegister}
                className="px-8 py-3 bg-[#8B4513] text-white rounded-lg hover:bg-[#723A0F] transition-colors font-medium"
                disabled={loading}
              >
                {loading ? "MENGIRIM..." : "DAFTAR"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#8B4513] mb-6">Pendaftaran Berhasil!</h2>
              <div className="space-y-4 text-left">
                <p>Terima kasih telah mengisi formulir pendaftaran ini. Kami akan segera memproses pendaftaran Anda dan menghubungi Anda untuk konfirmasi lebih lanjut. Jika ada pertanyaan atau kebutuhan tambahan, jangan ragu untuk menghubungi kami.</p>
                <p>Kami berharap kerja sama ini dapat berjalan dengan baik dan saling menguntungkan. Semoga Anda puas dengan layanan kami! 😊</p>
                <p className="mt-6">Hormat kami,</p>
                <p className="font-bold">PT Sukaharja Quail Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationScreen;