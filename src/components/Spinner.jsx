const Spinner = () => {
  return (
    // <div className="flex items-center justify-center z-9999 min-h-screen">
    //   <div className="flex justify-center items-center h-screen">
    //     <span class="loader"></span>
    //   </div>
    // </div>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
