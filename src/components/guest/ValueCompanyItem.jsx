import PropTypes from "prop-types";

const ValueCompanyItem = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-full md:w-72 h-32 md:h-80 lg:h-96 transition-transform transform hover:scale-105 relative">
       {/* Mobile View */}
      <div className="md:hidden h-full flex items-start justify-start p-4">
        <div className="flex flex-col items-start text-left">
          <div className="self-start">
            <img src={image} alt={title} className="w-16 h-16 object-contain" />
          </div>
          <div className="mt-3">
            <h3 className="font-semibold text-sm text-left text-black overflow-hidden">
              {title}
            </h3>
            <p className="text-xs text-left text-gray-600">{description}</p>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex h-full flex-col items-start justify-start p-4 text-left">
        <div className="flex flex-col items-start gap-4">
          <div className="h-40 lg:h-52 flex items-start justify-start w-full -mb-10">
            <img
              src={image}
              alt={title}
              className="max-w-full max-h-full object-contain mt-10"
            />
          </div>
          <h3 className="font-semibold text-xl md:text-2xl text-left text-black overflow-hidden line-clamp-3">
            {title}
          </h3>
          <p className="text-left text-gray-600 mt-2 line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

ValueCompanyItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ValueCompanyItem;