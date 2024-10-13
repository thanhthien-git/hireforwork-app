import styles from './style.module.scss';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchJobById } from '../../../../services/jobService';
import { fetchCompaniesByID } from '../../../../services/companyService';

const ContactInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (id && typeof id === 'string') {
        try {
          const jobResponse = await fetchJobById(id);
          const companyID = jobResponse.doc.companyID?.toString();
          if (companyID) {
            const companyResponse = await fetchCompaniesByID(companyID);
            setCompany(companyResponse.doc);
          } else {
            console.error("Company ID is not available");
          }
        } catch (err) {
          console.error("Error fetching company data:", err);
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCompanyDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const contact = company?.contact || {};
  const contactPhone = contact.companyPhone || "N/A";
  const contactEmail = contact.companyEmail || "N/A";
  const address = contact.companyAddress || "N/A";

  return (
    <div className={styles.contactInfo}>
      <h3>Thông tin liên hệ</h3>
      <p><strong>Người liên hệ:</strong> {company?.companyName || "Unknown Contact"}</p>
      <p><strong>Email liên hệ:</strong> {contactEmail}</p>
      <p><strong>SDT liên hệ:</strong> {contactPhone}</p>
      <p><strong>Địa chỉ:</strong> {address}</p>
    </div>
  );
};

export default ContactInfo;
