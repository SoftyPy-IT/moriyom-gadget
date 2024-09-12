const Preloader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-white  flex items-center justify-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Preloader;
