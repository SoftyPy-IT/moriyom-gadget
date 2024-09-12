import Image from "next/image";
import { FC } from "react";
import styles from "./OverlayContainer.module.css";

type Props = {
  imgSrc: string;
  imgSrc2?: string;
  imgAlt?: string;
  children: React.ReactNode;
};

const OverlayContainer: FC<Props> = ({
  imgSrc,
  imgSrc2,
  imgAlt = "",
  children,
}) => (
  <div className={`${styles.imgContainer}`}>
    {imgSrc2 ? (
      <>
        <div className="hidden sm:block w-full">
          <Image
            className={styles.img}
            src={imgSrc}
            alt={imgAlt}
            width={710}
            height={710}
            layout="fill"
          />
        </div>
        <div className="block sm:hidden w-full">
          <Image
            className={styles.img}
            src={imgSrc2}
            alt={imgAlt}
            width={710}
            height={710}
            layout="responsive"
          />
        </div>
      </>
    ) : (
      <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
        <Image
          className={styles.img + " w-full rounded-md h-full"}
          src={imgSrc}
          alt={imgAlt}
          width={500}
          height={500}
        />
      </div>
    )}

    {children}
    <div className={styles.imgOverlay}></div>
    <div className={styles.overlayBorder}></div>
    <div className={styles.overlayBorder2}></div>
  </div>
);

export default OverlayContainer;
