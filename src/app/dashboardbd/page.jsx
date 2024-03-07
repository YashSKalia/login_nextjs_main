'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { connectToDB } from '../../lib/connectToDB';
import React, { useEffect } from 'react';

const getData = async () => {
    try {
        connectToDB();
        const res = await fetch("http://localhost:3000/api/company", { cache: 'no-store' });

        if (!res.ok) {
            return { error: "Error in getting companies" };
        }
        return res.json();
    }
    catch (err) {
        console.log("error in getting companies: ", err);
        return null;
    }
}

const DashboardBD = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        // If session doesn't exist, redirect to login page
        if (!session) {
            router.push('/login');
        }
    }, [session, router]);

    const fetchData = async () => {
        const data = await getData();
        return data;
    };

    const renderData = (data) => {
        if (!data) return null;

        return (
            <div className="table w-4/5 h-full mt-24 flex flex-col items-center justify-center gap-8">
                {/* Render your data here */}
            </div>
        );
    };

    return (
        <div className="flex justify-center items-center">
            {session ? (
                <>
                    <h1>name: {session.user.username}</h1>
                    {renderData(fetchData())}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DashboardBD;
