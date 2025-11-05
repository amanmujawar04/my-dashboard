import PropTypes from "prop-types";

export default function InfoCard({ label = "Label", count = 1 }) {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
      <div className="text-3xl font-bold text-gray-800">{count}</div>
      <div className="text-base text-gray-500">{label}</div>
    </div>
  );
}

InfoCard.propTypes = {
  label: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
