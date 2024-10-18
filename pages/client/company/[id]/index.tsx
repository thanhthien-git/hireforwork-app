import React, { useCallback, useEffect, useState } from 'react';
import styles from './style.module.scss';
import LayoutClient from '@/layouts/layout-client';
import CompanyCard from '@/components/commons/user/item-companydetail/CompanyCard';
import CompanyDetails from '@/components/commons/user/item-companydetail/CompanyDetails';
import JobList from '@/components/commons/user/item-companydetail/JobList';
import { Card, notification, Skeleton } from 'antd';
import { fetchCompaniesByID } from '@/services/companyService';
import { useRouter } from 'next/router';
import { ICompanyDetails } from '@/interfaces/ICompanyDetail';

export default function CompanyProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [companyDetail, setCompanyDetail] = useState<ICompanyDetails>({
    companyName: "",
    companyImage: {
      imageURL: "",
      coverURL: "",
    },
    contact: {
      companyEmail: "",
      companyAddress: "",
      companyPhone: "",
      companyWebsite: "",
    },
    description: "",
    typeOfCompany: [],
    createAt: new Date(),
    employeeSize: 0,
  });

  const fetchCompanyDetail = useCallback(
    async (value: string) => {
      try {
        setLoading(true);
        const res = await fetchCompaniesByID(value);
        setCompanyDetail({
          companyName: res.doc.companyName || "",
          companyImage: {
            imageURL: res.doc.companyImage?.imageURL || "",
            coverURL: res.doc.companyImage?.coverURL || "",
          },
          contact: {
            companyEmail: res.doc.contact?.companyEmail || "",
            companyAddress: res.doc.contact?.companyAddress || "",
            companyPhone: res.doc.contact?.companyPhone || "",
            companyWebsite: res.doc.contact?.companyWebsite || "",
          },
          description: res.doc.description || "",
          typeOfCompany: res.doc.typeOfCompany || [],
          createAt: new Date(res.doc.createAt),
          employeeSize: res.doc.employeeSize || 0,
        });
      } catch {
        notification.error({ message: "There was an error fetching data" });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (router.query.id) {
      fetchCompanyDetail(router.query.id as string);
    }
  }, [router.query.id]);

  return (
    <LayoutClient title="Company Details">
      <div className={styles.container}>
        <Skeleton loading={loading} avatar active>
          <CompanyCard
            companyName={companyDetail.companyName}
            avatar={companyDetail.companyImage.imageURL}
            coverImage={companyDetail.companyImage.coverURL}
            website={companyDetail.contact.companyWebsite}
            employeeCount={companyDetail.employeeSize}
          />
        </Skeleton>

        <Skeleton loading={loading} active paragraph={{ rows: 4 }}>
          <CompanyDetails
            description={companyDetail.description}
            address={companyDetail.contact.companyAddress}
            phone={companyDetail.contact.companyPhone}
          />
        </Skeleton>

        <Skeleton loading={loading} active>
          <Card className={styles.recruitmentCard}>
            <JobList
              companyName={companyDetail.companyName}
              companyImage={companyDetail.companyImage.imageURL}
            />
          </Card>
        </Skeleton>
      </div>
    </LayoutClient>
  );
}
