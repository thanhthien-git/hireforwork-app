import styles from './style.module.scss';

const JobDescription = () => {
  return (
    <div className={styles.jobDescription}>
      <h3 className={styles.Description}>Mô tả công việc</h3>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, rerum. Illum incidunt deserunt ex ipsum corporis laborum modi veritatis maxime labore vero distinctio nemo dolorum odit dolore deleniti, vitae tempora?
      </p>
    </div>
  );
};

export default JobDescription;