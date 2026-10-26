import RecommendationCard from "@/components/Cards/HorizontalCard/HorizontalCard"
import { Fragment } from "react"

const Recommendation = ({ info }) => {
  const nodes = info?.recommendations?.nodes || []
  // Show full recommendations list from AniList
  const recommendation = nodes.filter(item => item?.mediaRecommendation)

  if (!recommendation || recommendation.length === 0) return null

  return (
    <div className="w-full min-[1125px]:max-w-[24rem]">
      <div className="text-[#ffffffe0] text-[18px] font-medium font-['poppins'] mb-4 flex items-center justify-between">
        <span>Recommendation</span>
        <span className="text-xs text-[#8e95a5] font-normal">({recommendation.length})</span>
      </div>

      <div className="w-full flex flex-col gap-3 max-[1125px]:grid max-[1125px]:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {recommendation.map((item, index) => (
          <Fragment key={item?.mediaRecommendation?.id || index}>
            <RecommendationCard data={item?.mediaRecommendation} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default Recommendation