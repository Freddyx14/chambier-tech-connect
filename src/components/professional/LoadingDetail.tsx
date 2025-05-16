
const LoadingDetail = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chambier-bright mb-4"></div>
      <p className="text-gray-600">Cargando información del profesional...</p>
    </div>
  );
};

export default LoadingDetail;
