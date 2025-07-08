import Head from 'next/head';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Head>
        <title>Website Under Maintenance</title>
      </Head>
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🚧 Maintenance in Progress</h1>
        <p className="text-lg text-gray-600 mb-6">
          We're currently performing scheduled maintenance. The website will be back shortly.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">
            For urgent inquiries, please contact us at:<br />
            <a href="mailto:support@anuradhapura-adventures.com" className="text-blue-600 hover:underline">
              support@anuradhapura-adventures.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}