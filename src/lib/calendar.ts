import { Exam } from "./types";

export function generateGoogleCalendarLink(exam: Exam): string {
    const baseUrl = "https://calendar.google.com/calendar/render";

    // Create start and end dates in YYYYMMDD format
    // Assuming full day events for now as exam times are often not specified in early notifications
    const startDate = new Date(exam.examDate).toISOString().replace(/-|:|\.\d\d\d/g, "").substring(0, 8);
    const endDate = new Date(exam.examDate);
    endDate.setDate(endDate.getDate() + 1); // Next day for full day event end
    const endDateStr = endDate.toISOString().replace(/-|:|\.\d\d\d/g, "").substring(0, 8);

    const dates = `${startDate}/${endDateStr}`;

    const details = `
Exam: ${exam.title}
Organization: ${exam.organization}
Category: ${exam.category}
Official Link: ${exam.officialNotificationUrl || 'N/A'}

Description: ${exam.description}
  `.trim();

    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: `Exam: ${exam.title}`,
        details: details,
        dates: dates,
        location: "India", // Default location
    });

    return `${baseUrl}?${params.toString()}`;
}
