"use client";
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function InvitationPage() {
    const { invitation_code } = useParams();
    
    return (
        <h1 style={{textAlign: "center", color:'white'}}>You are in the game</h1>
    );
}