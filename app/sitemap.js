import { TrendingAnilist, Top100Anilist, SeasonalAnilist } from '@/lib/Anilistfunction';

export default async function sitemap() {
  const [trendingData, top100Data, seasonalData] = await Promise.all([
    TrendingAnilist(),
    Top100Anilist(),
    SeasonalAnilist(),
  ]);

  const generateSitemapEntries = (data) => (data || []).map((anime) => ({
    url: `https://cmnty-anime.vercel.app/watch/${anime.id}`,
    lastModified: new Date(),
  }));

  const trending = generateSitemapEntries(trendingData);
  const top100 = generateSitemapEntries(top100Data);
  const seasonal = generateSitemapEntries(seasonalData);

  return [
    {
      url: 'https://cmnty-anime.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://cmnty-anime.vercel.app/catalog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://cmnty-anime.vercel.app/schedule',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    ...trending,
    ...top100,
    ...seasonal,
  ];
}
