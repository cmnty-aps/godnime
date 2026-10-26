import { trending, animeinfo, advancedsearch, top100anime, seasonal, popular, schedule } from "./anilistqueries.js";

export const TrendingAnilist = async (page = 1) => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: trending,
        variables: {
          page: page,
          perPage: 50,
        },
      }),
    }, { next: { revalidate: 3600 } });

    const data = await response.json();
    return data?.data?.Page?.media || [];
  } catch (error) {
    console.error('Error fetching data from AniList:', error);
    return [];
  }
}

export const PopularAnilist = async (page = 1) => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: popular,
        variables: {
          page: page,
          perPage: 50,
        },
      }),
    }, { next: { revalidate: 3600 } });

    const data = await response.json();
    return data?.data?.Page?.media || [];
  } catch (error) {
    console.error('Error fetching popular data from AniList:', error);
    return [];
  }
}

export const Top100Anilist = async (page = 1) => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: top100anime,
        variables: {
          page: page,
          perPage: 50,
        },
      }),
    }, { next: { revalidate: 3600 } });

    const data = await response.json();
    return data?.data?.Page?.media || [];
  } catch (error) {
    console.error('Error fetching data from AniList:', error);
    return [];
  }
}

export const SeasonalAnilist = async (page = 1) => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: seasonal,
        variables: {
          page: page,
          perPage: 50,
        },
      }),
    }, { next: { revalidate: 3600 } });

    const data = await response.json();
    return data?.data?.Page?.media || [];
  } catch (error) {
    console.error('Error fetching data from AniList:', error);
    return [];
  }
}

export const AnimeInfoAnilist = async (animeid) => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: animeinfo,
        variables: {
          id: animeid,
        },
      }),
    }, { next: { revalidate: 3600 } });

    const data = await response.json();
    return data?.data?.Media || null;
  } catch (error) {
    console.error('Error fetching data from AniList:', error);
    return null;
  }
}

export const AdvancedSearch = async (
  searchvalue,
  seasonvalue = null,
  formatvalue = null,
  genrevalue = null,
  statusvalue = null,
  sortbyvalue = null,
  currentPage = 1,
  country = null,
  startYear = null,
  episodes = null,
  selectedYear = null
) => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: advancedsearch,
        variables: {
          ...(searchvalue && {
            search: searchvalue,
            ...(!sortbyvalue && { sort: "SEARCH_MATCH" }),
          }),
          type: "ANIME",
          isAdult: false,
          ...(selectedYear && { seasonYear: selectedYear }),
          ...(statusvalue && { status: statusvalue }),
          ...(seasonvalue && { season: seasonvalue }),
          ...(formatvalue && { format: formatvalue }),
          ...(sortbyvalue && { sort: sortbyvalue }),

          ...(country && { countryOfOrigin: country }),
          ...(startYear && { startDate: startYear }),
          ...(episodes && { episodes: parseInt(episodes) }),

          ...(genrevalue && { ...genrevalue }),
          ...(currentPage && { page: currentPage }),
        },

      }),
    });

    const data = await response.json();
    return data?.data?.Page || { media: [] };
  } catch (error) {
    console.error('Error fetching search data from AniList:', error);
    return { media: [] };
  }
};

export const ScheduleAnilist = async (airingAt_greater, airingAt_lesser, page = 1, perPage = 100) => {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: schedule,
        variables: {
          airingAt_greater,
          airingAt_lesser,
          page,
          perPage,
        },
      }),
      next: { revalidate: 300 },
    });

    const data = await response.json();
    const schedules = data?.data?.Page?.airingSchedules || [];

    // If has next page, fetch next chunk to guarantee complete list
    if (data?.data?.Page?.pageInfo?.hasNextPage) {
      try {
        const nextResponse = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: schedule,
            variables: {
              airingAt_greater,
              airingAt_lesser,
              page: 2,
              perPage,
            },
          }),
        });
        const nextData = await nextResponse.json();
        const nextSchedules = nextData?.data?.Page?.airingSchedules || [];
        return [...schedules, ...nextSchedules];
      } catch (e) {
        return schedules;
      }
    }

    return schedules;
  } catch (error) {
    console.error('Error fetching airing schedule from AniList:', error);
    return [];
  }
};