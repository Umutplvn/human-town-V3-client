import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const PrivateRouter = () => {
    const { userId } = useSelector((state) => state.auth);

    if (!userId) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Bu sayfayı görüntülemek için giriş yapmalısınız.</h2>
            </div>
        );
    }

    return <Outlet />;
};

export default PrivateRouter;
