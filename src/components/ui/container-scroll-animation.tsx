"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[30rem] md:h-[45rem] flex items-center justify-center relative p-2 md:px-20 md:py-0"
      ref={containerRef}
    >
      <div
        className="py-0 md:py-0 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-0 bg-[#E8E8ED] rounded-[18px] shadow-2xl overflow-hidden flex flex-col"
    >
      {/* Safari-style chrome */}
      <div className="h-9 w-full bg-gradient-to-b from-[#E8E8ED] to-[#D8D8DD] border-b border-[#C4C4C9] flex items-center px-3 gap-2 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#DEA123]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white/80 border border-[#C4C4C9] rounded-md px-3 py-0.5 text-[11px] text-[#5F5F63] font-medium min-w-[200px] text-center">
            🔒 app.dentdock.com
          </div>
        </div>
        <div className="w-[54px]" />
      </div>
      <div className="flex-1 w-full overflow-hidden bg-gray-100 dark:bg-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};
