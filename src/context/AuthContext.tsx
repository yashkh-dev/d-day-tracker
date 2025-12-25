"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface User {
    name: string;
    email: string;
    photoURL?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    savedExams: string[];
    toggleSaveExam: (examId: string) => void;
    isExamSaved: (examId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [savedExams, setSavedExams] = useState<string[]>([]);

    // 1. Listen for Firebase Auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    name: firebaseUser.displayName || 'User',
                    email: firebaseUser.email || '',
                    photoURL: firebaseUser.photoURL || ''
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        // Load saved exams from local storage safely
        const storedSaved = localStorage.getItem('savedExams');
        if (storedSaved) {
            try {
                setSavedExams(JSON.parse(storedSaved));
            } catch (e) {
                console.error("Failed to parse saved exams", e);
            }
        }

        return () => unsubscribe();
    }, []);

    const login = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const toggleSaveExam = (examId: string) => {
        setSavedExams(prev => {
            const newSaved = prev.includes(examId)
                ? prev.filter(id => id !== examId)
                : [...prev, examId];
            localStorage.setItem('savedExams', JSON.stringify(newSaved));
            return newSaved;
        });
    };

    const isExamSaved = (examId: string) => savedExams.includes(examId);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, savedExams, toggleSaveExam, isExamSaved }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
