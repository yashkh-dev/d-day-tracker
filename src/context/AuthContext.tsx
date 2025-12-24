"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: () => void;
    logout: () => void;
    savedExams: string[];
    toggleSaveExam: (examId: string) => void;
    isExamSaved: (examId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [savedExams, setSavedExams] = useState<string[]>([]);

    // Load state from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedSaved = localStorage.getItem('savedExams');
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedSaved) setSavedExams(JSON.parse(storedSaved));
    }, []);

    const login = () => {
        // Simulating a login
        const mockUser = { name: "Aspirant", email: "user@example.com" };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
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
        <AuthContext.Provider value={{ user, login, logout, savedExams, toggleSaveExam, isExamSaved }}>
            {children}
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
