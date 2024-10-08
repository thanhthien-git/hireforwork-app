import Image from 'next/image';
import Link from 'next/link';
import { DollarOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import logo from '../../../../assets/google-icon.png'; 

const similarJobs = [
  {
    id: '1',
    company: 'Google',
    title: 'Software Engineer',
    salary: '20 triệu - 30 triệu',
    location: 'Hà Nội',
    datePosted: '15/09/2024',
    logo: logo,
  },
  {
    id: '2',
    company: 'Microsoft',
    title: 'Data Scientist',
    salary: '15 triệu - 25 triệu',
    location: 'Đà Nẵng',
    datePosted: '10/09/2024',
    logo: logo,
},
{
    id: '3',
    company: 'Amazon',
    title: 'Cloud Architect',
    salary: '30 triệu - 50 triệu',
    location: 'TP.HCM',
    datePosted: '05/09/2024',
    logo: logo,
},
{
    id: '4',
    company: 'Amazon',
    title: 'Cloud Architect',
    salary: '30 triệu - 50 triệu',
    location: 'TP.HCM',
    datePosted: '05/09/2024',
    logo: logo,
},
{
    id: '5',
    company: 'Amazon',
    title: 'Cloud Architect',
    salary: '30 triệu - 50 triệu',
    location: 'TP.HCM',
    datePosted: '05/09/2024',
    logo: logo,
}, {
    id: '6',
    company: 'Amazon',
    title: 'Cloud Architect',
    salary: '30 triệu - 50 triệu',
    location: 'TP.HCM',
    datePosted: '05/09/2024',
    logo: logo,
}, {
    id: '7',
    company: 'Amazon',
    title: 'Cloud Architect',
    salary: '30 triệu - 50 triệu',
    location: 'TP.HCM',
    datePosted: '05/09/2024',
    logo: logo,
},

];

const SimilarJobs = () => {
  return (
    <div className={styles.similarJobs}>
      <div className={styles.similarJobsHeader}>
        <h3>Việc làm tương tự</h3>
        <Link href="/jobs">
          <button className={styles.viewAllButton}>
            Xem tất cả
          </button>
        </Link>
      </div>
      <div className={styles.similarJobsList}>
        {similarJobs.map(job => (
          <Link key={job.id} href={`/job-details/${job.id}`}>
            <div className={styles.similarJobItem}>
              <Image src={job.logo} alt={`${job.company} Logo`} width={60} height={60} />
              <div className={styles.similarJobInfo}>
                <h4>{job.title}</h4>
                <p>{job.company}</p>
                <p><DollarOutlined />{job.salary}</p>
                <p><EnvironmentOutlined />{job.location}</p>
                <p><CalendarOutlined />{job.datePosted}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarJobs;