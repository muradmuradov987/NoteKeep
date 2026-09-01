import styles from "../InfoCard/InfoCard.module.css";

export const InfoCard = ({ data }) => {
  return (
    <div
      className={styles.card}
      style={{
        borderLeft: `4px solid ${data.cardBorder}`,
      }}
    >
      <div
        className={styles.card_decoration}
        style={{
          background: `${data.cardIconColor}`,
        }}
      ></div>
      <div className={styles.card_header}>
        <h3 className={styles.card_title}>{data.cardName}</h3>
        <span
          className={`${styles.card_icon} material-symbols-outlined`}
          style={{
            background: `${data.cardIconColor}`,
          }}
        >
          {data.cardIcon}
        </span>
      </div>
      <div className={styles.card_content}>
        <span className={styles.card_number}>{data.cardQuantity}</span>
        <div
          className={styles.card_change}
          style={{
            color: data.cardStatusColor,
          }}
        >
          <span className={`${styles.card_arrow} material-symbols-outlined`}>
            {data.cardStatusIcon}
          </span>
          <span>{data.cardStatus}</span>
        </div>
      </div>
    </div>
  );
};
