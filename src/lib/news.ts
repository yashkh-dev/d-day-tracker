export interface NewsArticle {
    title: string;
    description: string;
    url: string;
    source: string;
    publishedAt: string;
    imageUrl?: string;
}

const MOCK_NEWS: Record<string, NewsArticle[]> = {
    default: [
        {
            title: "Government announces new exam guidelines for 2026",
            description: "The central government has released updated standard operating procedures for conducting large-scale recruitment exams safely...",
            url: "#",
            source: "India Today",
            publishedAt: new Date().toISOString(),
            imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300&h=200"
        },
        {
            title: "Admit Cards expected to be released next week",
            description: "Sources confirm that the commission is finalizing the exam centers and admit cards will be available for download starting Monday.",
            url: "#",
            source: "The Hindu",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            imageUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=300&h=200"
        }
    ]
};

export async function getExamNews(query: string): Promise<NewsArticle[]> {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        console.log("No NEWS_API_KEY found, returning mock data");
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_NEWS.default.map(article => ({
            ...article,
            title: `${query}: ${article.title}` // Customize title to make it look dynamic
        }));
    }

    try {
        const response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&country=in&language=en`);
        if (!response.ok) throw new Error('News API failed');
        const data = await response.json();

        // Transform NewsData.io response to our interface
        return data.results.map((item: any) => ({
            title: item.title,
            description: item.description?.substring(0, 150) + '...',
            url: item.link,
            source: item.source_id,
            publishedAt: item.pubDate,
            imageUrl: item.image_url
        }));
    } catch (error) {
        console.error("Error fetching news:", error);
        return MOCK_NEWS.default;
    }
}
