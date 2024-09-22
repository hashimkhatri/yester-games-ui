"use client";
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function InvitationPage() {
    const { invitation_code } = useParams();
    useEffect(() => {
        sessionStorage.setItem("invitation_code", invitation_code);
        window.location.href = "/";
    }, [])
    return (
        <></>
    );
}