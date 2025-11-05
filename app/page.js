import ChartBar from "./components/ChartBar";
import InfoCard from "./components/Infocard";


export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        <InfoCard label="Clients" count={125}/>
        <InfoCard label="Orders" count={241} />
        <InfoCard label="Products" count={38} />
        <InfoCard label="Sales" count={76350} />
      </div>

      {/* Sales Chart Section */}
      <section className="p-6 mt-10 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">Sales Overview</h2>
   <ChartBar />
      </section>
    </div>
  );
}