import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import ResetPassword from '@/components/reset-password/combineStep';

export default function HomeSearch() {
    const router = useRouter();

    // Hàm điều hướng tới trang đăng nhập
    const goToLoginPage = () => {
        router.push('/login');
    };

    // Hàm điều hướng tới trang chủ
    const goToHomePage = () => {
        router.push('/');
    };

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
                <div 
                    style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', cursor: 'pointer' }}
                    onClick={goToHomePage} // Gọi hàm điều hướng về trang chủ
                >
                    Nhiều Việc
                </div>

                {/* Nút Đăng nhập */}
                <Button onClick={goToLoginPage} type="primary" style={{ height: '40px' }}>
                    Đăng nhập
                </Button>
            </header>

            <div style={{ flex: 1 }}>
                <ResetPassword />
            </div>

            {/* Footer */}
            <footer style={{
                textAlign: 'center', 
                padding: '10px', 
                background: '#f0f0f0',
                color: '#333',
                borderTop: '1px solid #ddd'
            }}>
                <p style={{ margin: 0, fontSize: '12px' }}>© {new Date().getFullYear()} Nhiều Việc. Tất cả các quyền được bảo lưu.</p>
                <p style={{ margin: 0, fontSize: '12px' }}>Liên hệ: hiresonarforwork@gmail.com</p>
            </footer>
        </div>
    );
}
