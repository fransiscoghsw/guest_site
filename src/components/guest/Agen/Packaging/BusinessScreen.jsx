import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import FormScreen from "./FormScreen";
import ApprovalScreen from "./ApprovalScreen";

// Validation utility functions
const validateAddress = (address) => {
  if (!address) return "Alamat Tidak Boleh Kosong!";
  if (typeof address !== "string") return "Alamat harus berupa string!";
  return "";
};

const validateTypeOfBusiness = (type) => {
  if (!type) return "Jenis Usaha Tidak Boleh Kosong!";
  if (typeof type !== "string") return "Jenis Usaha harus berupa string!";
  if (type.length < 1 || type.length > 255)
    return "Jenis Usaha harus diantara 1 dan 255 karakter!";
  return "";
};

const validateSalesMedia = (media) => {
  const validOptions = ["Online", "Offline", "Both"];
  if (!validOptions.includes(media))
    return "Media penjualan harus salah satu dari 'Online', 'Offline' atau 'Keduanya'";
  return "";
};

const validateBusinessPackage = (package_) => {
  const validOptions = ["Starter", "Regular", "Premium"];
  if (!validOptions.includes(package_))
    return "Pilihan paket harus salah satu dari 'starter', 'regular' atau 'premium'";
  return "";
};

const validateNpwp = (npwp) => {
  if (!npwp) return "Nomor NPWP Tidak Boleh Kosong!";
  if (!/^\d+$/.test(npwp)) return "Nomor NPWP harus berupa Angka!";
  return "";
};

// Function to validate brand usage
const validateBrandUsage = (brand) => {
  const validOptions = ["Personal", "Enterprise"];
  if (!validOptions.includes(brand))
    return "Penggunaan Brand harus salah satu dari 'Personal' atau 'Enterprise'";
  return "";
};

const BusinessScreen = ({
  alamatLengkap,
  personalData,
  initialData,
  onBack,
}) => {
  const [showFormScreen, setShowFormScreen] = useState(false);
  const [showApprovalScreen, setShowApprovalScreen] = useState(false);
  const [isAlamatUsahaFocused, setIsAlamatUsahaFocused] = useState(false);
  const [isAlamatSama, setIsAlamatSama] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [businessData, setBusinessData] = useState({
    typeOfBusiness: initialData?.typeOfBusiness || "",
    salesMedia: initialData?.salesMedia || "",
    businessPackage: initialData?.businessPackage || "",
    noNpwp: initialData?.noNpwp || "",
    brandUsage: initialData?.brandUsage || "",
    alamat: initialData?.alamat || "",
  });

  const dropdownUsahaRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownUsahaRef.current &&
        !dropdownUsahaRef.current.contains(event.target)
      ) {
        setIsAlamatUsahaFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validateForm = () => {
    const errors = {};

    // Validate business type
    const typeError = validateTypeOfBusiness(businessData.typeOfBusiness);
    if (typeError) errors.typeOfBusiness = typeError;

    // Validate sales media
    const mediaError = validateSalesMedia(businessData.salesMedia);
    if (mediaError) errors.salesMedia = mediaError;

    // Validate business package
    const packageError = validateBusinessPackage(businessData.businessPackage);
    if (packageError) errors.businessPackage = packageError;

    // Validate NPWP
    const npwpError = validateNpwp(businessData.noNpwp);
    if (npwpError) errors.noNpwp = npwpError;

    //Validate Brand Usage
    const brandError = validateBrandUsage(businessData.brandUsage);
    if (brandError) errors.brandUsage = brandError;

    // Validate business address
    const addressError = validateAddress(businessData.alamat);
    if (addressError) errors.alamat = addressError;

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleButtonBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      setShowFormScreen(true);
    }
  };

  const handleButtonNextClick = () => {
    const isValid = validateForm();
    if (!isValid) {
      // No longer showing alert messages, just update state to show errors
      return;
    }
    setShowApprovalScreen(true);
  };

  if (showFormScreen) {
    return <FormScreen initialData={personalData} />;
  }

  if (showApprovalScreen) {
    return (
      <ApprovalScreen
        personalData={personalData}
        businessData={businessData}
        onBack={() => setShowApprovalScreen(false)}
        initialData={initialData}
      />
    );
  }

  const handleInputChange = (field, value) => {
    setBusinessData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    // Clear validation error for this field
    setValidationErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleAlamatSamaChange = (event) => {
    const isChecked = event.target.checked;
    setIsAlamatSama(isChecked);

    setBusinessData((prevData) => ({
      ...prevData,
      alamat: isChecked ? alamatLengkap.alamat : "",
    }));

    setValidationErrors((prev) => ({
      ...prev,
      alamat: "",
    }));
  };

  const getInputErrorClass = (fieldName) => {
    return validationErrors[fieldName]
      ? "border-red-500 focus:ring-red-500"
      : "focus:ring-[#8B4513]";
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
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            3
          </div>
          <span className="text-gray-500">PERSETUJUAN</span>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-8">INFORMASI USAHA</h2>

        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <label className="block mb-4 text-lg font-semibold">
              Jenis Usaha
              {validationErrors.typeOfBusiness && (
                <span className="text-red-500 text-sm ml-2">
                  {validationErrors.typeOfBusiness}
                </span>
              )}
            </label>
            <div className="flex flex-col gap-3">
              {["distributor", "reseller", "eceran", "pribadi", "lain"].map(
                (type) => (
                  <label key={type} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="jenisUsaha"
                      value={type}
                      checked={businessData.typeOfBusiness === type}
                      onChange={(e) =>
                        handleInputChange("typeOfBusiness", e.target.value)
                      }
                      className={`w-4 h-4 ${getInputErrorClass(
                        "typeOfBusiness"
                      )}`}
                    />
                    <span className="text-base">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block mb-4 text-lg font-semibold">
              Media Penjualan
              {validationErrors.salesMedia && (
                <span className="text-red-500 text-sm ml-2">
                  {validationErrors.salesMedia}
                </span>
              )}
            </label>
            <div className="flex flex-col gap-3">
              {[
                {
                  value: "Online",
                  label: "Online (Shopee, Tokopedia, WhatsApp, dll)",
                },
                { value: "Offline", label: "Offline" },
                { value: "Both", label: "Keduanya" },
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="mediaPenjualan"
                    value={value}
                    checked={businessData.salesMedia === value}
                    onChange={(e) =>
                      handleInputChange("salesMedia", e.target.value)
                    }
                    className={`w-4 h-4 ${getInputErrorClass("salesMedia")}`}
                  />
                  <span className="text-base">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-4 text-lg font-semibold">
              Alamat Usaha
              {validationErrors.alamat && (
                <span className="text-red-500 text-sm ml-2">
                  {validationErrors.alamat}
                </span>
              )}
            </label>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isAlamatSama}
                onChange={handleAlamatSamaChange}
                className="mr-2"
              />
              <span className="text-base">
                Alamat Usaha sama dengan Alamat Lengkap
              </span>
            </div>
            <input
              type="text"
              value={businessData.alamat}
              onChange={(e) => handleInputChange("alamat", e.target.value)}
              className={`w-50% p-3 border rounded-lg focus:outline-none focus:ring-2 ${getInputErrorClass(
                "alamat"
              )}`}
              placeholder="Alamat Usaha"
              onFocus={() => setIsAlamatUsahaFocused(true)}
              disabled={isAlamatSama}
            />
          </div>
          <div>
            <label className="block mb-4 text-lg font-semibold">
              Pilihan Paket
              {validationErrors.businessPackage && (
                <span className="text-red-500 text-sm ml-2">
                  {validationErrors.businessPackage}
                </span>
              )}
            </label>
            <div className="flex flex-col gap-3">
              {[
                {
                  value: "Starter",
                  label: "Starter (Minimal >500 pack/bulan)",
                },
                {
                  value: "Regular",
                  label: "Regular (Minimal 1000-3000 pack/bulan)",
                },
                {
                  value: "Premium",
                  label: "Premium (Minimal >3000 pack/bulan)",
                },
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paket"
                    value={value}
                    checked={businessData.businessPackage === value}
                    onChange={(e) =>
                      handleInputChange("businessPackage", e.target.value)
                    }
                    className={`w-4 h-4 ${getInputErrorClass(
                      "businessPackage"
                    )}`}
                  />
                  <span className="text-base">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-4 text-lg font-semibold">
              NPWP
              {validationErrors.noNpwp && (
                <span className="text-red-500 text-sm ml-2">
                  {validationErrors.noNpwp}
                </span>
              )}
            </label>
            <input
              type="text"
              value={businessData.noNpwp}
              onChange={(e) => handleInputChange("noNpwp", e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${getInputErrorClass(
                "noNpwp"
              )}`}
              placeholder="NPWP"
            />
          </div>

          <div>
            <label className="block mb-4 text-lg font-semibold">
              Penggunaan Brand
              {validationErrors.brandUsage && (
                <span className="text-red-500 text-sm ml-2">
                  {validationErrors.brandUsage}
                </span>
              )}
            </label>
            <div className="flex flex-col gap-3">
              {[
                {
                  value: "Personal",
                  label:
                    "Brand Pribadi (Agen dapat menanggung desain dan percetakan label sendiri, atau menggunakan layanan perusahaan)",
                },
                {
                  value: "Enterprise",
                  label:
                    "Brand dari Perusahaan (Label sudah disediakan oleh perusahaan)",
                },
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="brand"
                    value={value}
                    checked={businessData.brandUsage === value}
                    onChange={(e) =>
                      handleInputChange("brandUsage", e.target.value)
                    }
                    className={`w-4 h-4 ${getInputErrorClass("brandUsage")}`}
                  />
                  <span className="text-base">{label}</span>
                </label>
              ))}
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

BusinessScreen.propTypes = {
  alamatLengkap: PropTypes.shape({
    alamat: PropTypes.string.isRequired,
  }).isRequired,
  personalData: PropTypes.object.isRequired,
  initialData: PropTypes.shape({
    typeOfBusiness: PropTypes.string,
    salesMedia: PropTypes.string,
    businessPackage: PropTypes.string,
    noNpwp: PropTypes.string,
    brandUsage: PropTypes.string,
    alamat: PropTypes.string,
  }),
  onBack: PropTypes.func,
};

export default BusinessScreen;