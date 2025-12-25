import { db } from './firebase';
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

export async function saveExamToUser(userId: string, examId: string) {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                savedExams: [examId],
                email: "", // Can be updated if we pass email
                name: "" // Can be updated if we pass name
            });
        } else {
            await updateDoc(userRef, {
                savedExams: arrayUnion(examId)
            });
        }
    } catch (error) {
        console.error("Error saving exam:", error);
        throw error;
    }
}

export async function removeExamFromUser(userId: string, examId: string) {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            savedExams: arrayRemove(examId)
        });
    } catch (error) {
        console.error("Error removing exam:", error);
        throw error;
    }
}

export async function getUserSavedExams(userId: string): Promise<string[]> {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data().savedExams || [];
        }
        return [];
    } catch (error) {
        console.error("Error fetching saved exams:", error);
        return [];
    }
}
