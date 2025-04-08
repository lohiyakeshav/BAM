import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="relative w-[75px] h-[100px]">
        <div className="absolute bottom-0 w-[10px] h-[50%] bg-primary shadow-sm origin-bottom animate-barUp1 left-0"></div>
        <div className="absolute bottom-0 w-[10px] h-[50%] bg-primary shadow-sm origin-bottom animate-barUp2 left-[15px]"></div>
        <div className="absolute bottom-0 w-[10px] h-[50%] bg-primary shadow-sm origin-bottom animate-barUp3 left-[30px]"></div>
        <div className="absolute bottom-0 w-[10px] h-[50%] bg-primary shadow-sm origin-bottom animate-barUp4 left-[45px]"></div>
        <div className="absolute bottom-0 w-[10px] h-[50%] bg-primary shadow-sm origin-bottom animate-barUp5 left-[60px]"></div>
        <div className="absolute bottom-[10px] left-0 w-[10px] h-[10px] bg-primary/80 rounded-full animate-ball"></div>
      </div>
    </div>
  );
};

export { Loader }; 