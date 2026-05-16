import { useState } from "react";
import { Upload } from "lucide-react";
import PropTypes from "prop-types";
import ConfirmationScreen from "./ConfirmationScreen";
import BusinessScreen from "./BusinessScreen";

const ApprovalScreen = ({
  personalData,
  businessData,
  onBack,
  initialData,
}) => {
  const [showBusinessScreen, setShowBusinessScreen] = useState(false);
  const [showConfirmationScreen, setShowConfirmationScreen] = useState(false);
  const [photoKtp, setPhotoKtp] = useState(initialData?.photoKtp || null);
  const [photoNpwp, setPhotoNpwp] = useState(initialData?.photoNpwp || null);
  const [error, setError] = useState(null);

  const validateFile = (file, type) => {
    if (!file) {
      return `${type} tidak boleh kosong!`;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return `Ukuran ${type} tidak boleh lebih dari 5MB`;
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return `${type} harus berupa file JPG, JPEG atau PNG`;
    }

    return null;
  };

  const handleButtonBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      setShowBusinessScreen(true);
    }
  };

  if (showBusinessScreen) {
    return (
      <BusinessScreen
        personalData={personalData}
        businessData={businessData}
        initialData={{
          ...businessData,
          photoKtp,
          photoNpwp,
        }}
      />
    );
  }

  const handleButtonNextClick = () => {
    // Validate both files
    const ktpError = validateFile(photoKtp, 'KTP');
    const npwpError = validateFile(photoNpwp, 'NPWP');

    if (ktpError || npwpError) {
      setError(ktpError || npwpError);
      return;
    }

    setShowConfirmationScreen(true);
  };

  const transformedBusinessData = {
    addressBusiness:
      businessData.alamatUsaha?.alamat || businessData.addressBusiness,
    provinceBusiness:
      businessData.alamatUsaha?.provinsi || businessData.provinceBusiness,
    cityBusiness: businessData.alamatUsaha?.kota || businessData.cityBusiness,
    kecamatanBusiness:
      businessData.alamatUsaha?.kecamatan || businessData.kecamatanBusiness,
    kelurahanBusiness:
      businessData.alamatUsaha?.kelurahan || businessData.kelurahanBusiness,
    postalCodeBusiness:
      businessData.alamatUsaha?.kodePos || businessData.postalCodeBusiness,
    typeOfBusiness: businessData.typeOfBusiness,
    noNpwp: businessData.noNpwp,
    salesMedia: businessData.salesMedia,
    businessPackage: businessData.businessPackage,
    brandUsage: businessData.brandUsage,
  };

  if (showConfirmationScreen) {
    return (
      <ConfirmationScreen
        personalData={personalData}
        businessData={transformedBusinessData}
        approvalData={{ photoKtp, photoNpwp }}
        onBack={() => setShowConfirmationScreen(false)}
      />
    );
  }

  const handleFileChange = (event, setFile, fileType) => {
    const file = event.target.files[0];
    if (file) {
      const validationError = validateFile(file, fileType);
      if (validationError) {
        setError(validationError);
        return;
      }
      setFile(file);
      setError(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 animate-fadeIn">
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

      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-8">PERSETUJUAN</h2>

        {error && <p className="text-red-500">{error}</p>}

        <div>
          <h3 className="text-lg font-semibold mb-6">
            Dokumen Pendukung (Wajib Dilampirkan)
          </h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="mb-2 font-medium">1. KTP</p>
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-gray-400">Upload KTP</span>
                <span className="text-xs text-gray-400 mt-2">Format: JPG, JPEG atau PNG (Max 5MB)</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setPhotoKtp, 'KTP')}
                />
              </label>
              {photoKtp && <p className="text-sm mt-2">{photoKtp.name}</p>}
            </div>
            <div>
              <p className="mb-2 font-medium">2. NPWP</p>
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-gray-400">Upload NPWP</span>
                <span className="text-xs text-gray-400 mt-2">Format: JPG, JPEG, PNG (Max 5MB)</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,"
                  onChange={(e) => handleFileChange(e, setPhotoNpwp, 'NPWP')}
                />
              </label>
              {photoNpwp && <p className="text-sm mt-2">{photoNpwp.name}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-12">
          <button
            onClick={handleButtonBackClick}
            className="px-8 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            KEMBALI
          </button>
          <button
            onClick={handleButtonNextClick}
            className="px-8 py-2 bg-[#8B4513] text-white rounded hover:bg-[#723A0F] transition-colors"
          >
            LANJUT →
          </button>
        </div>
      </div>
    </div>
  );
};

ApprovalScreen.propTypes = {
  personalData: PropTypes.object.isRequired,
  businessData: PropTypes.object.isRequired,
  onBack: PropTypes.func,
  initialData: PropTypes.shape({
    photoKtp: PropTypes.object,
    photoNpwp: PropTypes.object
  })
};

export default ApprovalScreen;